from dotenv import load_dotenv
import os
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta



# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# ================= CONFIG =================
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fc1117268ccf5a491fe0b90601767d9ff172b16f98e72760135fca150c478bc")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "310b99b63e8fba9e28470b8e9a35ecc4a8c65d1a39c96b8113c7854758333e5a")
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config['JWT_IDENTITY_CLAIM'] = 'id' 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600000)))
# Initialize extensions
jwt = JWTManager(app)
# CORS(app, origins=["http://localhost:3000"])  # Your React URL
CORS(app, origins=["https://student-performance-sigma.vercel.app"])
# CORS(
#     app,
#     supports_credentials=True,
#     resources={r"/api/*": {"origins": "*"}},
#     allow_headers=["Content-Type", "Authorization"]
# )



# ================= DATABASE =================
from database import db

@app.before_request
def before_request():
    """
    Ensure DB connection is alive before each request.
    """
    try:
        try:
        #   db.connect(reuse_if_open=True)
          db.connect()
        except Exception as e:
           print("DB reconnect failed:", e)
    except Exception:
        db.connect()

# ================= ROUTES =================
from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from routes.teacher_routes import teacher_bp
from routes.student_parent_routes import student_bp, parent_bp
from routes.ml_routes import ml_bp
from routes.gpa import cgpa_bp
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(admin_bp, url_prefix="/api/admin")
app.register_blueprint(teacher_bp, url_prefix="/api/teacher")
app.register_blueprint(student_bp, url_prefix="/api/student")
app.register_blueprint(parent_bp, url_prefix="/api/parent")
app.register_blueprint(ml_bp, url_prefix="/api/ml")
app.register_blueprint(cgpa_bp)

# ================= HEALTH =================
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "API is running"}), 200


# ================= ROOT =================
@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "message": "Student Evaluation and Performance Tracking System API",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth",
            "admin": "/api/admin",
            "teacher": "/api/teacher",
            "student": "/api/student",
            "parent": "/api/parent",
            "ml": "/api/ml"
        }
    }), 200


# ================= ERRORS =================
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


# ================= JWT ERRORS =================
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Token has expired"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"error": "Invalid token"}), 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"error": "Authorization token is missing"}), 401


# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
