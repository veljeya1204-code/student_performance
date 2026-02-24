# backend/auth.py - JWT + Bcrypt utilities only
import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity
from functools import wraps
from flask import jsonify
from database import db

def hash_password(password):
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed):
    """Verify password against bcrypt hash"""
    print(password.encode('utf-8'))
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def authenticate_user(email, password):
    """Authenticate + return user profile + JWT token"""
    query = "SELECT * FROM users WHERE email = %s AND is_active = TRUE"
    user = db.execute_one(query, (email,))
    
    if not user or not verify_password(password, user['password_hash']):
        return None
    
    user_details = dict(user)
    role = user['role'].lower()
    user_details['role'] = role
    
    # Role-specific profile
    try:
        if role == 'admin':
            user_details['profile'] = {"designation": "System Admin"}
        elif role == 'teacher':
            teacher = db.execute_one("SELECT * FROM teachers WHERE user_id = %s", (user['id'],))
            user_details['profile'] = dict(teacher) if teacher else {}
        elif role == 'student':
            query = "SELECT s.*, c.class_name, c.section FROM students s LEFT JOIN classes c ON s.class_id = c.id WHERE s.user_id = %s"
            student = db.execute_one(query, (user['id'],))
            user_details['profile'] = dict(student) if student else {}
        elif role == 'parent':
            query = """
                SELECT p.*, json_agg(json_build_object('id', s.id, 'name', s.first_name || ' ' || s.last_name)) as children
                FROM parents p LEFT JOIN parent_student ps ON p.id = ps.parent_id
                LEFT JOIN students s ON ps.student_id = s.id WHERE p.user_id = %s GROUP BY p.id
            """
            parent = db.execute_one(query, (user['id'],))
            user_details['profile'] = dict(parent) if parent else {}
    except Exception as e:
        print(f"Profile error: {e}")
        user_details['profile'] = {}
    
    # # JWT token
    # # In authenticate_user - ADD PRINT
    # print("LOGIN IDENTITY:", {'id': user['id'], 'email': user['email'], 'role

    token = create_access_token(
      identity={
        'id': user['id'],
        'email': user['email'],
        'role': role
    }
)
    print(token)
    user_details.pop('password_hash', None)
    return {'user': user_details, 'token': token}

def role_required(roles):
    """Decorator: check JWT role"""
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            identity = get_jwt_identity()
            if identity.get('role') not in roles:
                return jsonify({'error': 'Unauthorized'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper
