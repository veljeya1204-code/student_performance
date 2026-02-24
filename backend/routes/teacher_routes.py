from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from auth import role_required
from database import db

teacher_bp = Blueprint('teacher', __name__)

# ============= MARKS MANAGEMENT =============

@teacher_bp.route('/marks', methods=['GET'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def get_marks():
    """Get marks records"""
    student_id = request.args.get('student_id')
    subject_id = request.args.get('subject_id')
    class_id = request.args.get('class_id')
    
    query = """
        SELECT m.*, 
               s.first_name || ' ' || s.last_name as student_name,
               sub.subject_name,
               t.first_name || ' ' || t.last_name as teacher_name,
               (m.marks_obtained / m.max_marks * 100) as percentage
        FROM marks m
        JOIN students s ON m.student_id = s.id
        JOIN subjects sub ON m.subject_id = sub.id
        LEFT JOIN teachers t ON m.teacher_id = t.id
        WHERE 1=1
    """
    
    params = []
    if student_id:
        query += " AND m.student_id = %s"
        params.append(student_id)
    if subject_id:
        query += " AND m.subject_id = %s"
        params.append(subject_id)
    if class_id:
        query += " AND s.class_id = %s"
        params.append(class_id)
    
    query += " ORDER BY m.exam_date DESC, s.first_name"
    marks = db.execute_query(query, tuple(params) if params else None)
    return jsonify([dict(m) for m in marks]), 200

@teacher_bp.route('/marks', methods=['POST'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def add_marks():
    """Add marks for a student"""
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Get teacher_id from user
    query = "SELECT id FROM teachers WHERE user_id = %s"
    teacher = db.execute_one(query, (current_user['id'],))
    teacher_id = teacher['id'] if teacher else None
    
    query = """
        INSERT INTO marks (
            student_id, subject_id, exam_type, marks_obtained, 
            max_marks, exam_date, remarks, teacher_id
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (student_id, subject_id, exam_type, exam_date)
        DO UPDATE SET 
            marks_obtained = EXCLUDED.marks_obtained,
            max_marks = EXCLUDED.max_marks,
            remarks = EXCLUDED.remarks
    """
    
    result = db.execute_query(query, (
        data.get('student_id'), data.get('subject_id'), data.get('exam_type'),
        data.get('marks_obtained'), data.get('max_marks'), data.get('exam_date'),
        data.get('remarks'), teacher_id
    ), fetch=False)
    
    if result:
        # Send notification to parents
        send_marks_notification(data.get('student_id'), data.get('subject_id'), 
                               data.get('marks_obtained'), data.get('max_marks'))
        return jsonify({'message': 'Marks added successfully'}), 201
    return jsonify({'error': 'Failed to add marks'}), 500

@teacher_bp.route('/marks/<int:mark_id>', methods=['PUT'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def update_marks(mark_id):
    """Update marks"""
    data = request.get_json()
    
    query = """
        UPDATE marks SET
            marks_obtained = %s,
            max_marks = %s,
            remarks = %s
        WHERE id = %s
    """
    result = db.execute_query(query, (
        data.get('marks_obtained'), data.get('max_marks'),
        data.get('remarks'), mark_id
    ), fetch=False)
    
    if result:
        return jsonify({'message': 'Marks updated'}), 200
    return jsonify({'error': 'Failed to update marks'}), 500

@teacher_bp.route('/marks/<int:mark_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def delete_marks(mark_id):
    """Delete marks"""
    query = "DELETE FROM marks WHERE id = %s"
    result = db.execute_query(query, (mark_id,), fetch=False)
    
    if result:
        return jsonify({'message': 'Marks deleted'}), 200
    return jsonify({'error': 'Failed to delete marks'}), 500

# ============= ATTENDANCE MANAGEMENT =============

@teacher_bp.route('/attendance', methods=['GET'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def get_attendance():
    """Get attendance records"""
    student_id = request.args.get('student_id')
    class_id = request.args.get('class_id')
    date = request.args.get('date')
    
    query = """
        SELECT a.*, 
               s.first_name || ' ' || s.last_name as student_name,
               s.roll_number,
               c.class_name, c.section
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        JOIN classes c ON a.class_id = c.id
        WHERE 1=1
    """
    
    params = []
    if student_id:
        query += " AND a.student_id = %s"
        params.append(student_id)
    if class_id:
        query += " AND a.class_id = %s"
        params.append(class_id)
    if date:
        query += " AND a.date = %s"
        params.append(date)
    
    query += " ORDER BY a.date DESC, s.roll_number"
    attendance = db.execute_query(query, tuple(params) if params else None)
    return jsonify([dict(a) for a in attendance]), 200

@teacher_bp.route('/attendance', methods=['POST'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def mark_attendance():
    """Mark attendance for students"""
    current_user = get_jwt_identity()
    data = request.get_json()
    
    # Get teacher_id
    query = "SELECT id FROM teachers WHERE user_id = %s"
    teacher = db.execute_one(query, (current_user['id'],))
    teacher_id = teacher['id'] if teacher else None
    
    # data should contain list of attendance records
    attendance_records = data.get('records', [])
    
    for record in attendance_records:
        query = """
            INSERT INTO attendance (
                student_id, class_id, date, status, remarks, marked_by
            ) VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (student_id, date)
            DO UPDATE SET 
                status = EXCLUDED.status,
                remarks = EXCLUDED.remarks
        """
        db.execute_query(query, (
            record.get('student_id'), record.get('class_id'),
            record.get('date'), record.get('status'),
            record.get('remarks'), teacher_id
        ), fetch=False)
    
    return jsonify({'message': 'Attendance marked successfully'}), 201

@teacher_bp.route('/attendance/summary/<int:student_id>', methods=['GET'])
@jwt_required()
# @role_required(['teacher', 'admin', 'parent'])
def get_attendance_summary(student_id):
    """Get attendance summary for a student"""
    query = """
        SELECT 
            COUNT(*) FILTER (WHERE status = 'present') as present_days,
            COUNT(*) FILTER (WHERE status = 'absent') as absent_days,
            COUNT(*) FILTER (WHERE status = 'late') as late_days,
            COUNT(*) FILTER (WHERE status = 'excused') as excused_days,
            COUNT(*) as total_days,
            ROUND(COUNT(*) FILTER (WHERE status = 'present')::numeric / 
                  NULLIF(COUNT(*), 0) * 100, 2) as attendance_percentage
        FROM attendance
        WHERE student_id = %s
    """
    summary = db.execute_one(query, (student_id,))
    return jsonify(dict(summary) if summary else {}), 200

# ============= PERFORMANCE MONITORING =============

@teacher_bp.route('/performance/class/<int:class_id>', methods=['GET'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def get_class_performance(class_id):
    """Get overall performance of a class"""
    query = """
        SELECT 
            s.id,
            s.first_name || ' ' || s.last_name as student_name,
            s.roll_number,
            AVG(m.marks_obtained / m.max_marks * 100) as average_percentage,
            COUNT(DISTINCT m.subject_id) as subjects_taken,
            COUNT(m.id) as total_exams,
            (SELECT COUNT(*) FROM attendance a 
             WHERE a.student_id = s.id AND a.status = 'present') as present_days,
            (SELECT COUNT(*) FROM attendance a 
             WHERE a.student_id = s.id) as total_days
        FROM students s
        LEFT JOIN marks m ON s.id = m.student_id
        WHERE s.class_id = %s
        GROUP BY s.id, s.first_name, s.last_name, s.roll_number
        ORDER BY s.roll_number
    """
    # performance = db.execute_query(query, (class_id,))
    # return jsonify([dict(p) for p in performance]), 200
    performance = db.execute_query(query, (class_id,))

    if not performance:
        return jsonify([]), 200

    return jsonify([dict(p) for p in performance]), 200
@teacher_bp.route('/performance/subject/<int:subject_id>', methods=['GET'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def get_subject_performance(subject_id):
    """Get performance statistics for a subject"""
    query = """
        SELECT 
            sub.subject_name,
            sub.subject_code,
            COUNT(DISTINCT m.student_id) as total_students,
            AVG(m.marks_obtained / m.max_marks * 100) as average_percentage,
            MAX(m.marks_obtained / m.max_marks * 100) as highest_percentage,
            MIN(m.marks_obtained / m.max_marks * 100) as lowest_percentage,
            COUNT(*) FILTER (WHERE m.marks_obtained >= sub.pass_marks) as passed_students,
            COUNT(*) FILTER (WHERE m.marks_obtained < sub.pass_marks) as failed_students
        FROM subjects sub
        LEFT JOIN marks m ON sub.id = m.subject_id
        WHERE sub.id = %s
        GROUP BY sub.id, sub.subject_name, sub.subject_code
    """
    stats = db.execute_one(query, (subject_id,))
    return jsonify(dict(stats) if stats else {}), 200

# ============= NOTIFICATIONS =============

@teacher_bp.route('/notifications/send', methods=['POST'])
@jwt_required()
# @role_required(['teacher', 'admin'])
def send_notification():
    """Send notification to parent"""
    current_user = get_jwt_identity()
    data = request.get_json()
    
    query = """
        INSERT INTO notifications (
            sender_id, recipient_id, title, message, type
        ) VALUES (%s, %s, %s, %s, %s)
    """
    
    result = db.execute_query(query, (
        current_user['id'], data.get('recipient_id'),
        data.get('title'), data.get('message'), data.get('type', 'general')
    ), fetch=False)
    
    if result:
        return jsonify({'message': 'Notification sent'}), 201
    return jsonify({'error': 'Failed to send notification'}), 500

def send_marks_notification(student_id, subject_id, marks_obtained, max_marks):
    """Helper function to send marks notification to parents"""
    # Get student and subject info
    query = """
        SELECT s.first_name || ' ' || s.last_name as student_name,
               sub.subject_name
        FROM students s, subjects sub
        WHERE s.id = %s AND sub.id = %s
    """
    info = db.execute_one(query, (student_id, subject_id))
    
    if not info:
        return
    
    # Get parent user IDs
    query = """
        SELECT p.user_id
        FROM parents p
        JOIN parent_student ps ON p.id = ps.parent_id
        WHERE ps.student_id = %s
    """
    parents = db.execute_query(query, (student_id,))
    
    percentage = (marks_obtained / max_marks * 100) if max_marks > 0 else 0
    
    for parent in parents:
        query = """
            INSERT INTO notifications (
                sender_id, recipient_id, title, message, type
            ) VALUES (1, %s, %s, %s, 'marks')
        """
        db.execute_query(query, (
            parent['user_id'],
            f"New Marks: {info['subject_name']}",
            f"{info['student_name']} scored {marks_obtained}/{max_marks} ({percentage:.1f}%) in {info['subject_name']}"
        ), fetch=False)
