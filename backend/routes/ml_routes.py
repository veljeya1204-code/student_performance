from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from auth import role_required
from ml_predictor import predictor

ml_bp = Blueprint('ml', __name__)

@ml_bp.route('/train', methods=['POST'])
# @jwt_required()
# @role_required(['admin'])
def train_model():
    """Train ML models on existing data"""
    result = predictor.train_models()
    
    if result:
        return jsonify({'message': 'Models trained successfully'}), 200
    return jsonify({'error': 'Failed to train models - insufficient data'}), 400

@ml_bp.route('/predict/<int:student_id>', methods=['GET'])
# @jwt_required()
# @role_required(['admin', 'teacher'])
def predict_student_performance(student_id):
    """Predict performance for a specific student"""
    prediction = predictor.predict_performance(student_id)
    
    if prediction:
        return jsonify(prediction), 200
    return jsonify({'error': 'Unable to generate prediction - insufficient data'}), 400

@ml_bp.route('/weak-students', methods=['GET'])
# @jwt_required()
# @role_required(['admin', 'teacher'])
def get_weak_students():
    """Get list of weak students"""
    weak_students = predictor.get_weak_students()
    return jsonify(weak_students), 200

@ml_bp.route('/class-predictions/<int:class_id>', methods=['GET'])
# @jwt_required()
# @role_required(['admin', 'teacher'])
def get_class_predictions(class_id):
    """Get predictions for all students in a class"""
    from backend.database import db
    
    # Get all students in the class
    query = "SELECT id, first_name || ' ' || last_name as name FROM students WHERE class_id = %s"
    students = db.execute_query(query, (class_id,))
    
    predictions = []
    for student in students:
        prediction = predictor.predict_performance(student['id'])
        if prediction:
            prediction['student_name'] = student['name']
            predictions.append(prediction)
    
    return jsonify(predictions), 200
