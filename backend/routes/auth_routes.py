# backend/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from auth import authenticate_user, hash_password, verify_password, role_required  # ✅ Added verify_password
from database import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login - returns user + JWT token"""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    result = authenticate_user(data['email'], data['password'])
    
    if not result:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return jsonify(result), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user profile"""
    current_user = get_jwt_identity()
    user_id = current_user['id']
    
    query = """
        SELECT u.id, u.email, u.role, u.is_active 
        FROM users u WHERE u.id = %s AND u.is_active = TRUE
    """
    user = db.execute_one(query, (user_id,))
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_details = dict(user)
    role = user_details['role'].lower()
    
    # Role-specific profile (same as authenticate_user)
    try:
        if role == 'admin':
            user_details['profile'] = {"designation": "System Admin"}
        elif role == 'teacher':
            teacher = db.execute_one("SELECT * FROM teachers WHERE user_id = %s", (user_id,))
            user_details['profile'] = dict(teacher) if teacher else {}
        elif role == 'student':
            query = """
                SELECT s.*, c.class_name, c.section 
                FROM students s LEFT JOIN classes c ON s.class_id = c.id 
                WHERE s.user_id = %s
            """
            student = db.execute_one(query, (user_id,))
            user_details['profile'] = dict(student) if student else {}
        elif role == 'parent':
            query = """
                SELECT p.*, json_agg(json_build_object('id', s.id, 'name', 
                s.first_name || ' ' || s.last_name)) as children
                FROM parents p LEFT JOIN parent_student ps ON p.id = ps.parent_id
                LEFT JOIN students s ON ps.student_id = s.id 
                WHERE p.user_id = %s GROUP BY p.id
            """
            parent = db.execute_one(query, (user_id,))
            user_details['profile'] = dict(parent) if parent else {}
    except Exception as e:
        print(f"Profile error: {e}")
        user_details['profile'] = {}
    
    return jsonify({'user': user_details}), 200

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change current user password"""
    data = request.get_json()
    current_user = get_jwt_identity()
    
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    
    if not old_password or not new_password:
        return jsonify({'error': 'Passwords required'}), 400
    
    # Verify old password
    query = "SELECT password_hash FROM users WHERE id = %s"
    user = db.execute_one(query, (current_user['id'],))
    
    if not verify_password(old_password, user['password_hash']):
        return jsonify({'error': 'Current password wrong'}), 400
    
    # Hash and update
    new_hash = hash_password(new_password)
    db.execute_query("UPDATE users SET password_hash = %s WHERE id = %s", 
                    (new_hash, current_user['id']), fetch=False)
    
    return jsonify({'message': 'Password updated'}), 200
