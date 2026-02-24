# Quick Start Guide

Get the system running in under 10 minutes!

## Prerequisites Check

```bash
# Check Python version (need 3.8+)
python3 --version

# Check Node.js version (need 14+)
node --version

# Check PostgreSQL
psql --version
```

## Fast Setup (Linux/Mac)

### 1. Database (2 minutes)

```bash
# Start PostgreSQL
sudo service postgresql start  # or: brew services start postgresql

# Create database
sudo -u postgres psql -c "CREATE DATABASE student_evaluation_db;"
sudo -u postgres psql -c "CREATE USER dbuser WITH PASSWORD 'dbpass123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE student_evaluation_db TO dbuser;"

# Import schema
cd student-evaluation-system
psql -U dbuser -d student_evaluation_db -f database/schema.sql
```

### 2. Backend (3 minutes)

```bash
cd backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_evaluation_db
DB_USER=dbuser
DB_PASSWORD=dbpass123
JWT_SECRET_KEY=$(openssl rand -hex 32)
JWT_ACCESS_TOKEN_EXPIRES=3600
FLASK_ENV=development
SECRET_KEY=$(openssl rand -hex 32)
EOF

# Run server
python app.py &
```

Backend is now running on http://localhost:5000

### 3. Frontend (3 minutes)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

Frontend will open automatically at http://localhost:3000

## First Login

1. Open http://localhost:3000
2. Login with:
   - **Email**: admin@school.com
   - **Password**: admin123

## Quick Test

### Add a Test Student

```bash
# Get admin token first
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"admin123"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Create a class
curl -X POST http://localhost:5000/api/admin/classes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_name": "10th Grade",
    "section": "A",
    "academic_year": "2024-2025"
  }'

# Create a student
curl -X POST http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student1@school.com",
    "password": "student123",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2008-05-15",
    "gender": "Male",
    "class_id": 1,
    "roll_number": "001"
  }'

# Create a subject
curl -X POST http://localhost:5000/api/admin/subjects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject_name": "Mathematics",
    "subject_code": "MATH101",
    "class_id": 1,
    "max_marks": 100,
    "pass_marks": 40
  }'
```

Now refresh the admin dashboard to see your data!

## Windows Setup

### Database
```cmd
# Start PostgreSQL service
net start postgresql

# Create database (using pgAdmin or command line)
psql -U postgres
CREATE DATABASE student_evaluation_db;
CREATE USER dbuser WITH PASSWORD 'dbpass123';
GRANT ALL PRIVILEGES ON DATABASE student_evaluation_db TO dbuser;
\q

# Import schema
psql -U dbuser -d student_evaluation_db -f database\schema.sql
```

### Backend
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Create .env file manually with these contents:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=student_evaluation_db
# DB_USER=dbuser
# DB_PASSWORD=dbpass123
# JWT_SECRET_KEY=your-random-secret-key
# JWT_ACCESS_TOKEN_EXPIRES=3600
# FLASK_ENV=development
# SECRET_KEY=your-flask-secret

python app.py
```

### Frontend
```cmd
cd frontend
npm install
echo REACT_APP_API_URL=http://localhost:5000/api > .env
npm start
```

## Troubleshooting

### "Database connection failed"
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Test connection
psql -U dbuser -d student_evaluation_db -c "SELECT 1;"
```

### "Module not found" (Python)
```bash
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall
pip install -r requirements.txt
```

### "Module not found" (React)
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env
- Clear browser cache

### Port already in use
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

## Next Steps

1. **Change Admin Password**: Use the dashboard or API
2. **Add Sample Data**: Create teachers, students, classes
3. **Enter Marks**: Teacher dashboard → Marks entry
4. **Mark Attendance**: Teacher dashboard → Attendance
5. **Train ML Model**: After adding sufficient data (10+ students with marks)
6. **View Analytics**: Check student/admin dashboards

## Project Structure

```
student-evaluation-system/
├── backend/           # Flask API
├── frontend/          # React UI
├── database/          # SQL schema
├── docs/             # Documentation
└── README.md         # Full documentation
```

## Key Features

✅ JWT Authentication
✅ 4 Role-Based Dashboards
✅ CRUD Operations for all entities
✅ Marks & Attendance Tracking
✅ Performance Charts (Recharts)
✅ ML Predictions (scikit-learn)
✅ Real-time Notifications
✅ Responsive Modern UI

## Support

- Check README.md for full documentation
- Check docs/API_TESTING.md for API examples
- Check docs/ARCHITECTURE.md for system design

## Common Commands

```bash
# Start backend
cd backend && source venv/bin/activate && python app.py

# Start frontend
cd frontend && npm start

# Check logs
# Backend: Terminal output
# Frontend: Browser console

# Stop services
# Ctrl+C in terminal
```

---

**Enjoy building your student evaluation system! 🎓**
