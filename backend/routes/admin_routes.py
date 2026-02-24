from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from auth import role_required, hash_password
from database import db
import json 
def safe_jsonify(rows):
    import json
    if rows is None:
        rows = []
    clean_rows = []
    for r in rows:
        if r is None:
            continue
        d = dict(r)
        clean_d = {}
        for k_orig, v in d.items():
            k = str(k_orig)
            if isinstance(v, dict):
                v = {str(kk): str(vv) if hasattr(vv, '__class__') and vv.__class__.__name__ == 'type' else vv for kk,vv in v.items()}
            elif isinstance(v, (list, tuple)):
                v = [str(item) if hasattr(item, '__class__') and item.__class__.__name__ == 'type' else item for item in v]
            clean_d[k] = str(v) if hasattr(v, '__class__') and v.__class__.__name__ == 'type' else v
        clean_rows.append(clean_d)
    return json.dumps(clean_rows, default=str), 200, {'Content-Type': 'application/json'}

admin_bp = Blueprint('admin', __name__)
 # Add at top if missing

def row_to_dict(row):
    def serialize_value(v):
        if v is None:
            return None
        if hasattr(v, '__dict__'):  # Objects
            return dict((k, serialize_value(getattr(v, k))) for k in dir(v) if not k.startswith('_'))
        if isinstance(v, (list, tuple)):
            return [serialize_value(i) for i in v]
        if isinstance(v, dict):
            return {k: serialize_value(val) for k, val in v.items()}
        return str(v)  # All else → string (safe for JSON)

    base_dict = dict(row) if hasattr(row, 'keys') else row._asdict() if hasattr(row, '_asdict') else dict(row)
    return {k: serialize_value(v) for k, v in base_dict.items()}


# ============= USER MANAGEMENT =============

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
# @role_required(['admin'])
def get_users():
    """Get all users"""
    query = """
        SELECT id, email, role, is_active, created_at 
        FROM users 
        ORDER BY created_at DESC
    """
    users = db.execute_query(query)
    print("hi")
    return safe_jsonify(users)

@admin_bp.route('/users', methods=['POST'])
@jwt_required()
# @role_required(['admin'])
def create_user():
    """Create new user"""
    data = request.get_json()
    
    required_fields = ['email', 'password', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email exists
    query = "SELECT id FROM users WHERE email = %s"
    existing = db.execute_one(query, (data['email'],))
    if existing:
        return jsonify({'error': 'Email already exists'}), 400
    
    # Create user
    password_hash = hash_password(data['password'])
    query = """
        INSERT INTO users (email, password_hash, role) 
        VALUES (%s, %s, %s)
    """
    user_id = db.execute_insert(query, (data['email'], password_hash, data['role']))
    
    if user_id:
        return jsonify({'message': 'User created', 'id': user_id}), 201
    return jsonify({'error': 'Failed to create user'}), 500

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['admin'])
def delete_user(user_id):
    """Delete user"""
    query = "DELETE FROM users WHERE id = %s"
    result = db.execute_query(query, (user_id,), fetch=False)
    
    if result:
        return jsonify({'message': 'User deleted'}), 200
    return jsonify({'error': 'Failed to delete user'}), 500

# ============= STUDENT MANAGEMENT =============

@admin_bp.route('/students', methods=['GET'])
@jwt_required()
# @role_required(['admin', 'teacher'])
def get_students():
    """Get all students"""
    query = """
        SELECT s.*, c.class_name, c.section, u.email
        FROM students s
        LEFT JOIN classes c ON s.class_id = c.id
        LEFT JOIN users u ON s.user_id = u.id
        ORDER BY s.first_name, s.last_name
    """
    students = db.execute_query(query)
    return safe_jsonify(students)

@admin_bp.route('/students', methods=['POST'])
@jwt_required()
# @role_required(['admin'])
def create_student():
    """Create new student"""
    data = request.get_json()
    
    # Create user account first
    email = data.get('email')
    password = data.get('password', 'student123')
    
    password_hash = hash_password(password)
    query = "INSERT INTO users (email, password_hash, role) VALUES (%s, %s, 'student')"
    user_id = db.execute_insert(query, (email, password_hash))
    
    if not user_id:
        return jsonify({'error': 'Failed to create user account'}), 500
    
    # Create student record
    query = """
        INSERT INTO students (
            user_id, first_name, last_name, date_of_birth, gender, 
            phone, address, admission_date, class_id, roll_number, blood_group
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    student_id = db.execute_insert(query, (
        user_id, data.get('first_name'), data.get('last_name'),
        data.get('date_of_birth'), data.get('gender'), data.get('phone'),
        data.get('address'), data.get('admission_date'), data.get('class_id'),
        data.get('roll_number'), data.get('blood_group')
    ))
    
    if student_id:
        return jsonify({'message': 'Student created', 'id': student_id}), 201
    return jsonify({'error': 'Failed to create student'}), 500

@admin_bp.route('/students/<int:student_id>', methods=['PUT'])
@jwt_required()
# @role_required(['admin'])
def update_student(student_id):
    """Update student details"""
    data = request.get_json()
    
    query = """
        UPDATE students SET
            first_name = %s, last_name = %s, date_of_birth = %s,
            gender = %s, phone = %s, address = %s,
            class_id = %s, roll_number = %s, blood_group = %s
        WHERE id = %s
    """
    result = db.execute_query(query, (
        data.get('first_name'), data.get('last_name'), data.get('date_of_birth'),
        data.get('gender'), data.get('phone'), data.get('address'),
        data.get('class_id'), data.get('roll_number'), data.get('blood_group'),
        student_id
    ), fetch=False)
    
    if result:
        return jsonify({'message': 'Student updated'}), 200
    return jsonify({'error': 'Failed to update student'}), 500

# ============= TEACHER MANAGEMENT =============

@admin_bp.route('/teachers', methods=['GET'])
@jwt_required()
# @role_required(['admin'])
def get_teachers():
    """Get all teachers"""
    query = """
        SELECT t.*, u.email
        FROM teachers t
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.first_name, t.last_name
    """
    teachers = db.execute_query(query)
    return safe_jsonify(teachers)


@admin_bp.route('/teachers/<int:teacher_id>', methods=['PUT'])
@jwt_required()
def update_teacher(teacher_id):
    data = request.get_json()

    query = """
        UPDATE teachers SET
            first_name = %s,
            last_name = %s,
            phone = %s,
            qualification = %s,
            department = %s,
            hire_date = %s
        WHERE id = %s
    """

    success = db.execute_query(query, (
        data.get('first_name'),
        data.get('last_name'),
        data.get('phone'),
        data.get('qualification'),
        data.get('department'),
        data.get('hire_date'),
        teacher_id
    ), fetch=False)

    if success:
        return jsonify({"message": "Teacher updated successfully"}), 200

    return jsonify({"error": "Update failed"}), 500
@admin_bp.route('/teachers', methods=['POST'])
@jwt_required()
# @role_required(['admin'])
def create_teacher():
    """Create new teacher"""
    data = request.get_json()
    
    # Create user account
    email = data.get('email')
    password = data.get('password', 'teacher123')
    
    password_hash = hash_password(password)
    query = "INSERT INTO users (email, password_hash, role) VALUES (%s, %s, 'teacher')"
    user_id = db.execute_insert(query, (email, password_hash))
    
    if not user_id:
        return jsonify({'error': 'Failed to create user account'}), 500
    
    # Create teacher record
    query = """
        INSERT INTO teachers (
            user_id, first_name, last_name, phone, 
            qualification, department, hire_date
        ) VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    teacher_id = db.execute_insert(query, (
        user_id, data.get('first_name'), data.get('last_name'),
        data.get('phone'), data.get('qualification'),
        data.get('department'), data.get('hire_date')
    ))
    
    if teacher_id:
        return jsonify({'message': 'Teacher created', 'id': teacher_id}), 201
    return jsonify({'error': 'Failed to create teacher'}), 500

# ============= PARENT MANAGEMENT =============

@admin_bp.route('/parents', methods=['GET'])
@jwt_required()
# @role_required(['admin'])
def get_parents():
    """Get all parents"""
    query = """
        SELECT p.*, u.email,
               json_agg(json_build_object(
                   'id', s.id,
                   'name', s.first_name || ' ' || s.last_name
               )) as children
        FROM parents p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN parent_student ps ON p.id = ps.parent_id
        LEFT JOIN students s ON ps.student_id = s.id
        GROUP BY p.id, u.email
        ORDER BY p.first_name, p.last_name
    """
    parents = db.execute_query(query)
    # clean_parents = []
    # for p in parents:
    #    pd = dict(p)
    #    if 'children' in pd:
    #       pd['children'] = [str(c) for c in pd['children']] if pd['children'] else []
    #    clean_parents.append({k: str(v) for k,v in pd.items()})
    # return json.dumps(clean_parents, default=str), 200, {'Content-Type': 'application/json'}
    # return json.dumps([dict((str(k), str(v)) for k,v in dict(p).items()) for p in parents], default=str), 200, {'Content-Type': 'application/json'}
    parents_json = []
    for p in parents or []:
        pd = {}
        for k, v in dict(p).items():
            pd[str(k)] = str(v) if hasattr(v, '__class__') and 'type' in str(v.__class__) else v
        parents_json.append(pd)
    return json.dumps(parents_json, default=str), 200, {'Content-Type': 'application/json'}

@admin_bp.route('/parents', methods=['POST'])
@jwt_required()
# @role_required(['admin'])
def create_parent():
    """Create new parent"""
    data = request.get_json()
    
    # Create user account
    email = data.get('email')
    password = data.get('password', 'parent123')
    
    password_hash = hash_password(password)
    query = "INSERT INTO users (email, password_hash, role) VALUES (%s, %s, 'parent')"
    user_id = db.execute_insert(query, (email, password_hash))
    
    if not user_id:
        return jsonify({'error': 'Failed to create user account'}), 500
    
    # Create parent record
    query = """
        INSERT INTO parents (user_id, first_name, last_name, phone, address)
        VALUES (%s, %s, %s, %s, %s)
    """
    parent_id = db.execute_insert(query, (
        user_id, data.get('first_name'), data.get('last_name'),
        data.get('phone'), data.get('address')
    ))
    
    if parent_id:
        # Link to students if provided
        student_ids = data.get('student_ids', [])
        for student_id in student_ids:
            query = "INSERT INTO parent_student (parent_id, student_id, relationship) VALUES (%s, %s, %s)"
            db.execute_query(query, (parent_id, student_id, data.get('relationship', 'Parent')), fetch=False)
        
        return jsonify({'message': 'Parent created', 'id': parent_id}), 201
    return jsonify({'error': 'Failed to create parent'}), 500

@admin_bp.route('/parents/<int:parent_id>', methods=['PUT'])
@jwt_required()
def update_parent(parent_id):
    data = request.get_json()

    query = """
        UPDATE parents SET
            first_name = %s,
            last_name = %s,
            phone = %s
        WHERE id = %s
    """

    success = db.execute_query(query, (
        data.get('first_name'),
        data.get('last_name'),
        data.get('phone'),
        parent_id
    ), fetch=False)

    if success:
        return jsonify({"message": "Parent updated successfully"}), 200

    return jsonify({"error": "Update failed"}), 500


# ============= CLASS MANAGEMENT =============

@admin_bp.route('/classes', methods=['GET'])
@jwt_required()
# @role_required(['admin', 'teacher'])
def get_classes():
    """Get all classes"""
    query = """
        SELECT c.*, t.first_name || ' ' || t.last_name as teacher_name,
               COUNT(s.id) as student_count
        FROM classes c
        LEFT JOIN teachers t ON c.teacher_id = t.id
        LEFT JOIN students s ON c.id = s.class_id
        GROUP BY c.id, t.first_name, t.last_name
        ORDER BY c.class_name, c.section
    """
    classes = db.execute_query(query)
    # def row_to_dict(row):
    #    """Works for RealDictRow, SQLAlchemy Row, or dict."""
    #    if hasattr(row, '_asdict'):
    #       return row._asdict()
    #    return dict(row)

    return safe_jsonify(classes)
    # return jsonify([dict(c) for c in classes]), 200


# @admin_bp.route('/classes', methods=['POST'])
# @jwt_required()
# # @role_required(['admin'])
# def create_class():
#     """Create new class"""
#     data = request.get_json()
    
#     query = """
#         INSERT INTO classes (class_name, section, academic_year, teacher_id)
#         VALUES (%s, %s, %s, %s)
#     """
#     class_id = db.execute_insert(query, (
#         data.get('class_name'), data.get('section'),
#         data.get('academic_year'), data.get('teacher_id')
#     ))
    
#     if class_id:
#         return jsonify({'message': 'Class created', 'id': class_id}), 201
#     return jsonify({'error': 'Failed to create class'}), 500
@admin_bp.route('/classes/<int:class_id>', methods=['PUT'])
@jwt_required()
def update_class(class_id):
    data = request.get_json()

    query = """
        UPDATE classes SET
            class_name = %s,
            section = %s
        WHERE id = %s
    """

    success = db.execute_query(query, (
        data.get('class_name'),
        data.get('section'),
        class_id
    ), fetch=False)

    if success:
        return jsonify({"message": "Class updated successfully"}), 200

    return jsonify({"error": "Update failed"}), 500
@admin_bp.route('/classes', methods=['POST'])
@jwt_required()
def create_class():
    """Create new class"""
    data = request.get_json()
    print("🔍 Full POST data:", data)  # CRITICAL: See exact payload
    
    required_fields = ['class_name', 'section', 'academic_year', 'teacher_id']
    missing = [f for f in required_fields if not data or not data.get(f)]
    if missing:
        print("❌ Missing:", missing)
        return jsonify({'error': f'Missing required fields: {missing}'}), 400
    
    print("✅ Values:", {
        'class_name': repr(data['class_name']),
        'section': repr(data['section']),
        'academic_year': repr(data['academic_year']),  # Will show None
        'teacher_id': data['teacher_id']
    })
    
    query = """
        INSERT INTO classes (class_name, section, academic_year, teacher_id)
        VALUES (%s, %s, %s, %s) RETURNING id
    """
    class_id = db.execute_insert(query, (
        data['class_name'], data['section'],
        data['academic_year'], data['teacher_id']
    ))
    
    if class_id:
        print("✅ Inserted ID:", class_id)
        return jsonify({'message': 'Class created', 'id': class_id}), 201
    print("❌ Insert failed")
    return jsonify({'error': 'Failed to create class'}), 500

# ============= SUBJECT MANAGEMENT =============

@admin_bp.route('/subjects', methods=['GET'])
@jwt_required()
# @role_required(['admin', 'teacher'])
def get_subjects():
    """Get all subjects"""
    class_id = request.args.get('class_id')
    
    query = """
        SELECT s.*, c.class_name, c.section,
               t.first_name || ' ' || t.last_name as teacher_name
        FROM subjects s
        LEFT JOIN classes c ON s.class_id = c.id
        LEFT JOIN teachers t ON s.teacher_id = t.id
    """
    
    params = None
    if class_id:
        query += " WHERE s.class_id = %s"
        params = (class_id,)
    
    query += " ORDER BY c.class_name, s.subject_name"
    subjects = db.execute_query(query, params)
    return safe_jsonify(subjects)

@admin_bp.route('/subjects', methods=['POST'])
@jwt_required()
# @role_required(['admin'])
def create_subject():
    """Create new subject"""
    data = request.get_json()
    
    query = """
        INSERT INTO subjects (
            subject_name, subject_code, class_id, 
            teacher_id, max_marks, pass_marks
        ) VALUES (%s, %s, %s, %s, %s, %s)
    """
    subject_id = db.execute_insert(query, (
        data.get('subject_name'), data.get('subject_code'),
        data.get('class_id'), data.get('teacher_id'),
        data.get('max_marks', 100), data.get('pass_marks', 40)
    ))
    
    if subject_id:
        return jsonify({'message': 'Subject created', 'id': subject_id}), 201
    return jsonify({'error': 'Failed to create subject'}), 500

# Add these DELETE routes (similar to your existing PUT patterns)
@admin_bp.route('/students/<int:student_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['admin'])
def delete_student(student_id):
    query = "DELETE FROM students WHERE id = %s"
    result = db.execute_query(query, (student_id,), fetch=False)
    return jsonify({'message': 'Student deleted'}), 200 if result.rowcount > 0 else 404

@admin_bp.route('/teachers/<int:teacher_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['admin'])
def delete_teacher(teacher_id):
    # query = "DELETE FROM teachers WHERE id = %s"
    # result = db.execute_query(query, (teacher_id,), fetch=False)
    # return jsonify({'message': 'Teacher deleted'}), 200 if result.rowcount > 0 else 404
    result = db.execute_query("DELETE FROM teachers WHERE id = %s", (teacher_id,))

    if result and result.rowcount == 0:
        return jsonify({"error": "Teacher not found"}), 404
    return jsonify({'message': 'Teacher deleted'}), 200
@admin_bp.route('/parents/<int:parent_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['admin'])
def delete_parent(parent_id):
    query = "DELETE FROM parents WHERE id = %s"
    # result = db.execute_query(query, (parent_id,), fetch=False)
    # return jsonify({'message': 'Parent deleted'}), 200 if result.rowcount > 0 else 404
    result = db.execute_query(query, (parent_id,))

    if result and result.rowcount == 0:
        return jsonify({"error": "Parent not found"}), 404
    return jsonify({'message': 'Parent deleted'}), 200

@admin_bp.route('/classes/<int:class_id>', methods=['DELETE'])
@jwt_required()
# @role_required(['admin'])
def delete_class(class_id):
    query = "DELETE FROM classes WHERE id = %s"
    result = db.execute_query(query, (class_id,))

    if result and result.rowcount == 0:
        return jsonify({"error": "Class not found"}), 404
    return jsonify({'message': 'Class deleted'}), 200 
