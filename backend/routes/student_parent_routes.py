from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from auth import role_required
from database import db

student_bp = Blueprint('student', __name__)
parent_bp = Blueprint('parent', __name__)

# ============= STUDENT ROUTES =============
# print("JWT IDENTITY:", get_jwt_identity())
# print("TYPE:", type(get_jwt_identity()))


# @student_bp.route('/my-marks', methods=['GET'])
# @jwt_required()
# # @role_required(['student'])
# def get_my_marks():
#     """Get marks for current student"""
#     current_user = get_jwt_identity()
#     # user_id = current_user['id']
#     # current_user = get_jwt_identity()
#     print(f"🔍 HEADERS: {dict(request.headers)}")
#     print(f"🔍 USER: {get_jwt_identity()}")
#     # Get student_id from user
#     query = "SELECT id FROM students WHERE user_id = %s"
#     # student = db.execute_one(query, user_id)
#     student = db.execute_one(query, (current_user['id'],))
#     # student = db.execute_one(query, (current_user,))
    
#     if not student:
#         return jsonify({'error': 'Student profile not found'}), 404
    
#     student_id = student['id']
    
#     query = """
#         SELECT m.*, 
#                sub.subject_name,
#                sub.max_marks as subject_max_marks,
#                (m.marks_obtained / m.max_marks * 100) as percentage,
#                CASE 
#                    WHEN m.marks_obtained >= sub.pass_marks THEN 'Pass'
#                    ELSE 'Fail'
#                END as result
#         FROM marks m
#         JOIN subjects sub ON m.subject_id = sub.id
#         WHERE m.student_id = %s
#         ORDER BY m.exam_date DESC, sub.subject_name
#     """
#     marks = db.execute_query(query, (student_id,))
#     return jsonify([dict(m) for m in marks]), 200

@student_bp.route('/my-marks', methods=['GET'])
@jwt_required()
def get_my_marks():
    current_user = get_jwt_identity()

    query = "SELECT id FROM students WHERE user_id = %s"
    student = db.execute_one(query, (current_user['id'],))
    print("Current user:", current_user)
    print("Student:", student)
    
    if not student:
        return jsonify({'error': 'Student profile not found'}), 404

    student_id = student['id']

    query = """
        SELECT m.*, 
               sub.subject_name,
               sub.max_marks as subject_max_marks,
               (m.marks_obtained / m.max_marks * 100) as percentage,
               CASE 
                   WHEN m.marks_obtained >= sub.pass_marks THEN 'Pass'
                   ELSE 'Fail'
               END as result
        FROM marks m
        JOIN subjects sub ON m.subject_id = sub.id
        WHERE m.student_id = %s
        ORDER BY m.exam_date DESC, sub.subject_name
    """

    marks = db.execute_query(query, (student_id,))
    print("Marks:", marks)
    return jsonify(marks), 200

@student_bp.route('/my-attendance', methods=['GET'])
@jwt_required()
# @role_required(['student'])
def get_my_attendance():
    """Get attendance for current student"""
    current_user = get_jwt_identity()
    
    query = "SELECT id FROM students WHERE user_id = %s"
    student = db.execute_one(query, (current_user['id'],))
    
    if not student:
        return jsonify({'error': 'Student profile not found'}), 404
    
    student_id = student['id']
    
    query = """
        SELECT a.*, c.class_name, c.section
        FROM attendance a
        JOIN classes c ON a.class_id = c.id
        WHERE a.student_id = %s
        ORDER BY a.date DESC
    """
    attendance = db.execute_query(query, (student_id,))
    if attendance is None:
        return jsonify([]), 200
    return jsonify([dict(a) for a in attendance]), 200

@student_bp.route('/my-performance', methods=['GET'])
@jwt_required()
# @role_required(['student'])
def get_my_performance():
    """Get performance statistics for current student"""
    current_user = get_jwt_identity()
    
    query = "SELECT id FROM students WHERE user_id = %s"
    student = db.execute_one(query, (current_user['id'],))
    
    if not student:
        return jsonify({'error': 'Student profile not found'}), 404
    
    student_id = student['id']
    
    # Overall statistics
    query = """
        SELECT 
            COUNT(DISTINCT subject_id) as subjects_taken,
            AVG(marks_obtained / max_marks * 100) as overall_percentage,
            MAX(marks_obtained / max_marks * 100) as highest_percentage,
            MIN(marks_obtained / max_marks * 100) as lowest_percentage
        FROM marks
        WHERE student_id = %s
    """
    overall = db.execute_one(query, (student_id,))
    
    # Subject-wise performance
    query = """
        SELECT 
            sub.subject_name,
            sub.subject_code,
            AVG(m.marks_obtained / m.max_marks * 100) as average_percentage,
            COUNT(m.id) as exams_taken,
            MAX(m.marks_obtained / m.max_marks * 100) as highest_score,
            MIN(m.marks_obtained / m.max_marks * 100) as lowest_score
        FROM marks m
        JOIN subjects sub ON m.subject_id = sub.id
        WHERE m.student_id = %s
        GROUP BY sub.id, sub.subject_name, sub.subject_code
        ORDER BY sub.subject_name
    """
    subject_wise = db.execute_query(query, (student_id,))
    
    # Attendance statistics
    query = """
        SELECT 
            COUNT(*) FILTER (WHERE status = 'present') as present_days,
            COUNT(*) FILTER (WHERE status = 'absent') as absent_days,
            COUNT(*) as total_days,
            ROUND(COUNT(*) FILTER (WHERE status = 'present')::numeric / 
                  NULLIF(COUNT(*), 0) * 100, 2) as attendance_percentage
        FROM attendance
        WHERE student_id = %s
    """
    attendance_stats = db.execute_one(query, (student_id,))
    
    # Exam-wise performance
    query = """
        SELECT 
            exam_type,
            AVG(marks_obtained / max_marks * 100) as average_percentage,
            COUNT(*) as exams_count
        FROM marks
        WHERE student_id = %s
        GROUP BY exam_type
        ORDER BY exam_type
    """
    exam_wise = db.execute_query(query, (student_id,))
    
    return jsonify({
        'overall': dict(overall) if overall else {},
        'subject_wise': [dict(s) for s in subject_wise],
        'attendance': dict(attendance_stats) if attendance_stats else {},
        'exam_wise': [dict(e) for e in exam_wise]
    }), 200

@student_bp.route('/my-notifications', methods=['GET'])
@jwt_required()
# @role_required(['student'])
def get_my_notifications():
    """Get notifications for current student"""
    current_user = get_jwt_identity()
    
    query = """
        SELECT n.*, u.email as sender_email
        FROM notifications n
        LEFT JOIN users u ON n.sender_id = u.id
        WHERE n.recipient_id = %s
        ORDER BY n.created_at DESC
        LIMIT 50
    """
    notifications = db.execute_query(query, (current_user['id'],))
    return jsonify([dict(n) for n in notifications]), 200

@student_bp.route('/notifications/<int:notification_id>/read', methods=['PUT'])
@jwt_required()
# @role_required(['student', 'parent'])
def mark_notification_read(notification_id):
    """Mark notification as read"""
    current_user = get_jwt_identity()
    
    query = """
        UPDATE notifications 
        SET is_read = TRUE 
        WHERE id = %s AND recipient_id = %s
    """
    result = db.execute_query(query, (notification_id, current_user['id']), fetch=False)
    
    if result:
        return jsonify({'message': 'Notification marked as read'}), 200
    return jsonify({'error': 'Failed to update notification'}), 500

# ============= PARENT ROUTES =============
@parent_bp.before_request
def log_parent_headers():
    if request.endpoint and 'parent' in request.endpoint:
        print(f"📥 PARENT REQ: {request.method} {request.path}")
        print(f"HEADERS: {dict(request.headers)}")  # Authorization???
        print(f"CONTENT-TYPE: {request.content_type}")
@parent_bp.route('/my-children', methods=['GET'])
@jwt_required()
def get_my_children():
    current_user = get_jwt_identity()
    print(f"✅ JWT OK: user_id={current_user['id']}")
    user_id = current_user if isinstance(current_user, int) else current_user.get("id")
    parent = db.execute_one("SELECT id FROM parents WHERE user_id = %s", (user_id,))
    print(f"PARENT: {parent}")  # None? → DB issue
    
    if not parent:
        print("❌ No parent profile")
        return jsonify({'error': 'Parent profile not found'}), 404
    parent_id = parent['id']
    
    query = """
        SELECT s.*, c.class_name, c.section,
               ps.relationship
        FROM students s
        JOIN parent_student ps ON s.id = ps.student_id
        JOIN classes c ON s.class_id = c.id
        WHERE ps.parent_id = %s
        ORDER BY s.first_name
    """
    children = db.execute_query(query, (parent_id,))
    print(f"✅ Found {len(children)} children")
    return jsonify([dict(c) for c in children]), 200
    

# @parent_bp.route('/my-children', methods=['GET'])
# @jwt_required()
# # @role_required(['parent'])
# def get_my_children():
#     """Get children information for current parent"""
#     current_user = get_jwt_identity()
    
#     query = "SELECT id FROM parents WHERE user_id = %s"
#     parent = db.execute_one(query, (current_user['id'],))
    
#     if not parent:
#         return jsonify({'error': 'Parent profile not found'}), 404
    
#     parent_id = parent['id']
    
#     query = """
#         SELECT s.*, c.class_name, c.section,
#                ps.relationship
#         FROM students s
#         JOIN parent_student ps ON s.id = ps.student_id
#         JOIN classes c ON s.class_id = c.id
#         WHERE ps.parent_id = %s
#         ORDER BY s.first_name
#     """
#     children = db.execute_query(query, (parent_id,))
#     return jsonify([dict(c) for c in children]), 200

@parent_bp.route('/child-marks/<int:student_id>', methods=['GET'])
@jwt_required()
# @role_required(['parent'])
def get_child_marks(student_id):
    """Get marks for a specific child"""
    current_user = get_jwt_identity()
    
    # Verify parent-student relationship
    query = """
        SELECT 1 FROM parent_student ps
        JOIN parents p ON ps.parent_id = p.id
        WHERE p.user_id = %s AND ps.student_id = %s
    """
    relationship = db.execute_one(query, (current_user['id'], student_id))
    
    if not relationship:
        return jsonify({'error': 'Unauthorized access'}), 403
    
    query = """
        SELECT m.*, 
               sub.subject_name,
               (m.marks_obtained / m.max_marks * 100) as percentage,
               t.first_name || ' ' || t.last_name as teacher_name
        FROM marks m
        JOIN subjects sub ON m.subject_id = sub.id
        LEFT JOIN teachers t ON m.teacher_id = t.id
        WHERE m.student_id = %s
        ORDER BY m.exam_date DESC, sub.subject_name
    """
    marks = db.execute_query(query, (student_id,))
    return jsonify([dict(m) for m in marks]), 200

@parent_bp.route('/child-attendance/<int:student_id>', methods=['GET'])
@jwt_required()
# @role_required(['parent'])
def get_child_attendance(student_id):
    """Get attendance for a specific child"""
    current_user = get_jwt_identity()
    print("JWT USER:", current_user)
    # Verify parent-student relationship
    query = """
        SELECT 1 FROM parent_student ps
        JOIN parents p ON ps.parent_id = p.id
        WHERE p.user_id = %s AND ps.student_id = %s
    """
    # query="""SELECT 1 FROM parents WHERE user_id = %s AND student_id = %s"""
    relationship = db.execute_one(query, (current_user['id'], student_id))
    print("RELATIONSHIP RESULT:", relationship)
    if not relationship:
        return jsonify({'error': 'Unauthorized access'}), 403
    
    query = """
        SELECT a.*, c.class_name, c.section
        FROM attendance a
        JOIN classes c ON a.class_id = c.id
        WHERE a.student_id = %s
        ORDER BY a.date DESC
    """
    attendance = db.execute_query(query, (student_id,))
    
    # Get attendance summary
    query = """
        SELECT 
            COUNT(*) FILTER (WHERE status = 'present') as present_days,
            COUNT(*) FILTER (WHERE status = 'absent') as absent_days,
            COUNT(*) as total_days,
            ROUND(COUNT(*) FILTER (WHERE status = 'present')::numeric / 
                  NULLIF(COUNT(*), 0) * 100, 2) as attendance_percentage
        FROM attendance
        WHERE student_id = %s
    """
    summary = db.execute_one(query, (student_id,))
    
    return jsonify({
        'records': [dict(a) for a in attendance],
        'summary': dict(summary) if summary else {}
    }), 200

# @parent_bp.route('/child-attendance/<int:student_id>', methods=['GET'])
# @jwt_required()
# def get_child_attendance(student_id):

#     user_id = get_jwt_identity()  # ✅ string ID

#     # Verify parent-student relationship
#     query = """
#         SELECT 1 FROM parent_student ps
#         JOIN parents p ON ps.parent_id = p.id
#         WHERE p.user_id = %s AND ps.student_id = %s
#     """
#     relationship = db.execute_one(query, (user_id, student_id))

#     if not relationship:
#         return jsonify({'error': 'Unauthorized access'}), 403

#     # Attendance records
#     query = """
#         SELECT a.*, c.class_name, c.section
#         FROM attendance a
#         JOIN classes c ON a.class_id = c.id
#         WHERE a.student_id = %s
#         ORDER BY a.date DESC
#     """
#     attendance = db.execute_query(query, (student_id,))

#     # Attendance summary
#     query = """
#         SELECT 
#             COUNT(*) FILTER (WHERE status = 'present') as present_days,
#             COUNT(*) FILTER (WHERE status = 'absent') as absent_days,
#             COUNT(*) as total_days,
#             ROUND(
#                 COUNT(*) FILTER (WHERE status = 'present')::numeric / 
#                 NULLIF(COUNT(*), 0) * 100, 2
#             ) as attendance_percentage
#         FROM attendance
#         WHERE student_id = %s
#     """
#     summary = db.execute_one(query, (student_id,))

#     summary_dict = dict(summary) if summary else {}

#     # ✅ Convert Decimal/string to float
#     if summary_dict.get("attendance_percentage") is not None:
#         summary_dict["attendance_percentage"] = float(
#             summary_dict["attendance_percentage"]
#         )

#     return jsonify({
#         'records': [dict(a) for a in attendance],
#         'summary': summary_dict
#     }), 200

@parent_bp.route('/child-performance/<int:student_id>', methods=['GET'])
@jwt_required()
# @role_required(['parent'])
def get_child_performance(student_id):
    """Get performance statistics for a specific child"""
    current_user = get_jwt_identity()
    
    # Verify parent-student relationship
    query = """
        SELECT 1 FROM parent_student ps
        JOIN parents p ON ps.parent_id = p.id
        WHERE p.user_id = %s AND ps.student_id = %s
    """
    relationship = db.execute_one(query, (current_user['id'], student_id))
    
    if not relationship:
        return jsonify({'error': 'Unauthorized access'}), 403
    
    # Overall statistics
    query = """
        SELECT 
            COUNT(DISTINCT subject_id) as subjects_taken,
            AVG(marks_obtained / max_marks * 100) as overall_percentage,
            MAX(marks_obtained / max_marks * 100) as highest_percentage,
            MIN(marks_obtained / max_marks * 100) as lowest_percentage
        FROM marks
        WHERE student_id = %s
    """
    overall = db.execute_one(query, (student_id,))
    
    # Subject-wise performance
    query = """
        SELECT 
            sub.subject_name,
            AVG(m.marks_obtained / m.max_marks * 100) as average_percentage,
            COUNT(m.id) as exams_taken
        FROM marks m
        JOIN subjects sub ON m.subject_id = sub.id
        WHERE m.student_id = %s
        GROUP BY sub.id, sub.subject_name
        ORDER BY sub.subject_name
    """
    subject_wise = db.execute_query(query, (student_id,))
    
    return jsonify({
        'overall': dict(overall) if overall else {},
        'subject_wise': [dict(s) for s in subject_wise]
    }), 200

@parent_bp.route('/my-notifications', methods=['GET'])
@jwt_required()
# @role_required(['parent'])
def get_parent_notifications():
    """Get notifications for current parent"""
    current_user = get_jwt_identity()
    
    query = """
        SELECT n.*, u.email as sender_email
        FROM notifications n
        LEFT JOIN users u ON n.sender_id = u.id
        WHERE n.recipient_id = %s
        ORDER BY n.created_at DESC
        LIMIT 50
    """
    notifications = db.execute_query(query, (current_user['id'],))
    return jsonify([dict(n) for n in notifications]), 200
