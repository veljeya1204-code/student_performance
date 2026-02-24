import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os
from database import db

class PerformancePredictor:
    def __init__(self):
        self.regressor = None
        self.classifier = None
        self.scaler = StandardScaler()
        self.model_path = os.path.join(os.path.dirname(__file__), 'models')
        os.makedirs(self.model_path, exist_ok=True)
    
    def prepare_student_data(self, student_id=None):
        """Fetch and prepare student performance data"""
        query = """
            SELECT 
                s.id as student_id,
                s.first_name || ' ' || s.last_name as student_name,
                sub.subject_name,
                sub.max_marks as subject_max_marks,
                m.exam_type,
                m.marks_obtained,
                m.max_marks,
                (m.marks_obtained / m.max_marks * 100) as percentage,
                EXTRACT(MONTH FROM m.exam_date) as exam_month,
                COUNT(a.id) FILTER (WHERE a.status = 'present') as attendance_present,
                COUNT(a.id) FILTER (WHERE a.status = 'absent') as attendance_absent
            FROM students s
            JOIN marks m ON s.id = m.student_id
            JOIN subjects sub ON m.subject_id = sub.id
            LEFT JOIN attendance a ON s.id = a.student_id 
                AND DATE_TRUNC('month', a.date) = DATE_TRUNC('month', m.exam_date)
            WHERE 1=1
        """
        
        params = []
        if student_id:
            query += " AND s.id = %s"
            params.append(student_id)
        
        query += " GROUP BY s.id, s.first_name, s.last_name, sub.subject_name, sub.max_marks, m.exam_type, m.marks_obtained, m.max_marks, m.exam_date"
        
        data = db.execute_query(query, tuple(params) if params else None)
        
        if not data:
            return None
        
        return pd.DataFrame(data)
    
    def calculate_features(self, df):
        """Calculate features for ML model"""
        # Group by student and calculate aggregate features
        student_features = df.groupby('student_id').agg({
            'percentage': ['mean', 'std', 'min', 'max'],
            'attendance_present': 'sum',
            'attendance_absent': 'sum'
        }).reset_index()
        
        student_features.columns = ['student_id', 'avg_percentage', 'std_percentage', 
                                     'min_percentage', 'max_percentage', 
                                     'total_present', 'total_absent']
        
        # Calculate attendance rate
        student_features['attendance_rate'] = (
            student_features['total_present'] / 
            (student_features['total_present'] + student_features['total_absent'])
        ).fillna(0) * 100
        
        # Calculate improvement trend
        df_sorted = df.sort_values(['student_id', 'exam_month'])
        first_half = df_sorted.groupby('student_id').head(3)['percentage'].groupby(df_sorted.groupby('student_id').head(3)['student_id']).mean()
        last_half = df_sorted.groupby('student_id').tail(3)['percentage'].groupby(df_sorted.groupby('student_id').tail(3)['student_id']).mean()
        student_features['improvement_trend'] = (last_half - first_half).fillna(0).values
        
        # Count of exams taken
        student_features['exam_count'] = df.groupby('student_id').size().values
        
        # Fill NaN values
        student_features = student_features.fillna(0)
        
        return student_features
    
    def train_models(self):
        """Train ML models on existing data"""
        df = self.prepare_student_data()
        
        if df is None or len(df) < 10:
            print("Insufficient data for training")
            return False
        
        student_features = self.calculate_features(df)
        
        # Prepare features and target
        feature_cols = ['avg_percentage', 'std_percentage', 'min_percentage', 
                        'max_percentage', 'attendance_rate', 'improvement_trend', 'exam_count']
        X = student_features[feature_cols]
        
        # Target: predict final average percentage (regression)
        y_reg = student_features['avg_percentage']
        
        # Target: classify weak students (classification) - below 50% is weak
        y_clf = (student_features['avg_percentage'] < 50).astype(int)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train regression model (predict final score)
        self.regressor = RandomForestRegressor(n_estimators=100, random_state=42)
        self.regressor.fit(X_scaled, y_reg)
        
        # Train classification model (detect weak students)
        self.classifier = GradientBoostingClassifier(n_estimators=100, random_state=42)
        self.classifier.fit(X_scaled, y_clf)
        
        # Save models
        joblib.dump(self.regressor, os.path.join(self.model_path, 'regressor.pkl'))
        joblib.dump(self.classifier, os.path.join(self.model_path, 'classifier.pkl'))
        joblib.dump(self.scaler, os.path.join(self.model_path, 'scaler.pkl'))
        
        print("Models trained and saved successfully")
        return True
    
    def load_models(self):
        """Load pre-trained models"""
        try:
            self.regressor = joblib.load(os.path.join(self.model_path, 'regressor.pkl'))
            self.classifier = joblib.load(os.path.join(self.model_path, 'classifier.pkl'))
            self.scaler = joblib.load(os.path.join(self.model_path, 'scaler.pkl'))
            return True
        except:
            return False
    
    def predict_performance(self, student_id):
        """Predict final performance for a student"""
        df = self.prepare_student_data(student_id)
        
        if df is None or len(df) == 0:
            return None
        
        student_features = self.calculate_features(df)
        
        feature_cols = ['avg_percentage', 'std_percentage', 'min_percentage', 
                        'max_percentage', 'attendance_rate', 'improvement_trend', 'exam_count']
        X = student_features[feature_cols]
        
        # Load models if not loaded
        if self.regressor is None:
            if not self.load_models():
                if not self.train_models():
                    return None
        
        X_scaled = self.scaler.transform(X)
        
        # Predict
        predicted_score = self.regressor.predict(X_scaled)[0]
        is_weak = self.classifier.predict(X_scaled)[0]
        weak_probability = self.classifier.predict_proba(X_scaled)[0][1]
        
        return {
            'student_id': student_id,
            'current_average': float(student_features['avg_percentage'].values[0]),
            'predicted_final_score': float(predicted_score),
            'is_weak_student': bool(is_weak),
            'weak_probability': float(weak_probability),
            'attendance_rate': float(student_features['attendance_rate'].values[0]),
            'improvement_trend': float(student_features['improvement_trend'].values[0]),
            'recommendation': self._generate_recommendation(
                student_features['avg_percentage'].values[0],
                student_features['attendance_rate'].values[0],
                student_features['improvement_trend'].values[0],
                is_weak
            )
        }
    
    def get_weak_students(self):
        """Identify all weak students"""
        df = self.prepare_student_data()
        
        if df is None:
            return []
        
        student_features = self.calculate_features(df)
        
        feature_cols = ['avg_percentage', 'std_percentage', 'min_percentage', 
                        'max_percentage', 'attendance_rate', 'improvement_trend', 'exam_count']
        X = student_features[feature_cols]
        
        if self.classifier is None:
            if not self.load_models():
                if not self.train_models():
                    return []
        
        X_scaled = self.scaler.transform(X)
        predictions = self.classifier.predict(X_scaled)
        probabilities = self.classifier.predict_proba(X_scaled)[:, 1]
        
        weak_students = []
        for idx, is_weak in enumerate(predictions):
            if is_weak:
                student_id = student_features.iloc[idx]['student_id']
                query = "SELECT first_name || ' ' || last_name as name FROM students WHERE id = %s"
                student = db.execute_one(query, (student_id,))
                
                weak_students.append({
                    'student_id': int(student_id),
                    'student_name': student['name'] if student else 'Unknown',
                    'current_average': float(student_features.iloc[idx]['avg_percentage']),
                    'weak_probability': float(probabilities[idx]),
                    'attendance_rate': float(student_features.iloc[idx]['attendance_rate'])
                })
        
        return weak_students
    
    def _generate_recommendation(self, avg_percentage, attendance_rate, improvement_trend, is_weak):
        """Generate personalized recommendations"""
        recommendations = []
        
        if is_weak:
            recommendations.append("Requires immediate attention and additional support")
        
        if avg_percentage < 50:
            recommendations.append("Focus on fundamental concepts and regular practice")
        elif avg_percentage < 70:
            recommendations.append("Good progress, work on improving weak areas")
        else:
            recommendations.append("Excellent performance, maintain consistency")
        
        if attendance_rate < 75:
            recommendations.append("Improve attendance - critical for better performance")
        elif attendance_rate < 90:
            recommendations.append("Good attendance, try to maintain above 90%")
        
        if improvement_trend < -5:
            recommendations.append("Declining trend detected - schedule counseling session")
        elif improvement_trend > 5:
            recommendations.append("Showing positive improvement - keep up the good work")
        
        return recommendations

# Create global predictor instance
predictor = PerformancePredictor()
