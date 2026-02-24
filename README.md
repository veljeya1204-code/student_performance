# Intelligent Student Evaluation and Performance Tracking System

A comprehensive full-stack web application for managing student evaluation and performance tracking with AI-powered predictions.

## 🎯 Features

- **4 Role-Based Dashboards**: Admin, Teacher, Student, Parent
- **JWT Authentication**: Secure login with password hashing (bcrypt)
- **Complete Student Management**: Students, teachers, parents, classes, subjects
- **Marks & Attendance Tracking**: Full CRUD operations with notifications
- **Performance Analytics**: Interactive charts and dashboards (Recharts)
- **ML Predictions**: Predict student performance and identify at-risk students
- **Real-time Notifications**: Automated parent notifications
- **Responsive Modern UI**: Beautiful gradient-based design

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python 3.8+)
- **Database**: PostgreSQL 12+
- **Authentication**: JWT (Flask-JWT-Extended)
- **Password Security**: bcrypt
- **ML Libraries**: scikit-learn, pandas, numpy
- **API**: RESTful architecture

### Frontend
- **Framework**: React.js 18+
- **Routing**: React Router v6
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Styling**: Modern CSS with gradients

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- PostgreSQL 12 or higher
- npm or yarn

## 🚀 Installation & Setup

### 1. Database Setup

```bash
# Install PostgreSQL (if not installed)
# On Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# On macOS with Homebrew:
brew install postgresql

# Start PostgreSQL service
# Ubuntu/Debian:
sudo systemctl start postgresql
sudo systemctl enable postgresql

# macOS:
brew services start postgresql

# Create database and user
sudo -u postgres psql
postgres=# CREATE DATABASE student_evaluation_db;
postgres=# CREATE USER your_username WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE student_evaluation_db TO your_username;
postgres=# \q

# Import schema
psql -U your_username -d student_evaluation_db -f database/schema.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from example
cp .env.example .env

# Edit .env file with your database credentials
nano .env  # or use any text editor
```

**Edit .env file:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_evaluation_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this
JWT_ACCESS_TOKEN_EXPIRES=3600
FLASK_ENV=development
SECRET_KEY=your-flask-secret-key
```

```bash
# Run the Flask application
python app.py

# Backend will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm start

# Frontend will run on http://localhost:3000
```

## 🔑 Default Login Credentials

**Admin Account:**
- Email: `admin@school.com`
- Password: `admin123`

After first login, change the password immediately!

## 📊 Database Schema

### Main Tables:
- **users**: Authentication and role management
- **students**: Student information and profiles
- **teachers**: Teacher details
- **parents**: Parent information
- **classes**: Class/grade management
- **subjects**: Subject definitions
- **marks**: Exam marks and grades
- **attendance**: Daily attendance records
- **notifications**: System notifications
- **parent_student**: Many-to-many relationship

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Admin Routes
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create student
- `GET /api/admin/teachers` - Get all teachers
- `GET /api/admin/classes` - Get all classes
- `GET /api/admin/subjects` - Get all subjects

### Teacher Routes
- `GET /api/teacher/marks` - Get marks
- `POST /api/teacher/marks` - Add marks
- `GET /api/teacher/attendance` - Get attendance
- `POST /api/teacher/attendance` - Mark attendance
- `GET /api/teacher/performance/class/:id` - Get class performance
- `POST /api/teacher/notifications/send` - Send notification

### Student Routes
- `GET /api/student/my-marks` - Get own marks
- `GET /api/student/my-attendance` - Get own attendance
- `GET /api/student/my-performance` - Get performance stats
- `GET /api/student/my-notifications` - Get notifications

### Parent Routes
- `GET /api/parent/my-children` - Get children list
- `GET /api/parent/child-marks/:id` - Get child's marks
- `GET /api/parent/child-attendance/:id` - Get child's attendance
- `GET /api/parent/child-performance/:id` - Get child's performance

### ML Routes
- `POST /api/ml/train` - Train ML models
- `GET /api/ml/predict/:studentId` - Predict student performance
- `GET /api/ml/weak-students` - Get at-risk students
- `GET /api/ml/class-predictions/:classId` - Get class predictions

## 🤖 Machine Learning Model

The system includes ML models to:
1. **Predict Final Scores**: Random Forest Regressor predicts student's final average
2. **Identify At-Risk Students**: Gradient Boosting Classifier detects weak students

### Features Used:
- Average percentage
- Standard deviation of marks
- Min/max percentages
- Attendance rate
- Improvement trend
- Number of exams taken

### Training the Model:
```bash
# From backend terminal (with sufficient data):
curl -X POST http://localhost:5000/api/ml/train \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📱 Frontend Components

### Dashboards:
1. **AdminDashboard**: Manage all entities, view ML predictions
2. **TeacherDashboard**: Enter marks, track attendance, view class performance
3. **StudentDashboard**: View marks, attendance, performance charts
4. **ParentDashboard**: Monitor children's progress

### Features:
- Interactive charts (Bar, Line, Pie)
- Real-time data updates
- Responsive design
- Role-based access control
- Modern gradient UI

## 🎨 UI Design

The UI features:
- Modern gradient backgrounds (dark theme)
- Glassmorphism effects
- Smooth animations
- Responsive layout
- Custom color scheme (purple/indigo gradients)
- Professional typography

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- SQL injection prevention (parameterized queries)
- CORS configuration
- Token expiration handling

## 🐛 Troubleshooting

### Backend Issues:

**Database connection errors:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check database exists
psql -U your_username -l

# Test connection
psql -U your_username -d student_evaluation_db -c "SELECT 1;"
```

**Module import errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Issues:

**Module not found errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
```bash
# Ensure backend is running
# Check FLASK_CORS is properly configured in app.py
```

**API connection errors:**
```bash
# Verify .env file has correct API URL
# Check backend is running on port 5000
```

## 📈 Adding Sample Data

```sql
-- After running schema.sql, you can add sample data:

-- Add a sample class
INSERT INTO classes (class_name, section, academic_year, teacher_id)
VALUES ('10th Grade', 'A', '2024-2025', NULL);

-- Add sample students (after creating user accounts via API)
-- Use the Admin dashboard or API endpoints

-- Add sample subjects
INSERT INTO subjects (subject_name, subject_code, class_id, max_marks, pass_marks)
VALUES 
  ('Mathematics', 'MATH101', 1, 100, 40),
  ('Science', 'SCI101', 1, 100, 40),
  ('English', 'ENG101', 1, 100, 40);
```

## 🚀 Production Deployment

### Backend:
1. Set `FLASK_ENV=production`
2. Use production-grade WSGI server (Gunicorn)
3. Set secure JWT_SECRET_KEY
4. Configure PostgreSQL for production
5. Enable HTTPS
6. Set up proper logging

### Frontend:
1. Build production bundle: `npm run build`
2. Deploy to web server (Nginx, Apache)
3. Update API URL to production backend
4. Enable HTTPS

## 📝 License

This project is for educational purposes.

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for frontend errors
4. Check backend logs for API errors

## 🎓 Educational Value

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database design and management
- Authentication & authorization
- Machine learning integration
- Modern React patterns
- Responsive UI design
- Production-ready code structure

## 🔄 Future Enhancements

- Email notifications
- SMS alerts
- Report card generation (PDF)
- Advanced analytics dashboards
- Mobile app (React Native)
- Video conferencing integration
- Assignment management
- Online exam module
- Student forum
- Fee management

---

**Built with ❤️ for educational excellence**
