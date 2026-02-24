# API Testing Guide

## Testing with cURL

### 1. Login and Get Token

```bash
# Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "admin123"
  }'

# Response will include:
# {
#   "user": {...},
#   "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
# }

# Save the token for subsequent requests
TOKEN="your_token_here"
```

### 2. Admin Operations

```bash
# Get all students
curl -X GET http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer $TOKEN"

# Create a new student
curl -X POST http://localhost:5000/api/admin/students \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "student123",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2008-05-15",
    "gender": "Male",
    "phone": "1234567890",
    "address": "123 Main St",
    "admission_date": "2024-01-15",
    "class_id": 1,
    "roll_number": "001",
    "blood_group": "O+"
  }'

# Create a new teacher
curl -X POST http://localhost:5000/api/admin/teachers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "teacher123",
    "first_name": "Jane",
    "last_name": "Smith",
    "phone": "9876543210",
    "qualification": "M.Ed",
    "department": "Mathematics",
    "hire_date": "2023-06-01"
  }'

# Create a new class
curl -X POST http://localhost:5000/api/admin/classes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_name": "10th Grade",
    "section": "A",
    "academic_year": "2024-2025",
    "teacher_id": 1
  }'

# Create a new subject
curl -X POST http://localhost:5000/api/admin/subjects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject_name": "Mathematics",
    "subject_code": "MATH101",
    "class_id": 1,
    "teacher_id": 1,
    "max_marks": 100,
    "pass_marks": 40
  }'
```

### 3. Teacher Operations

```bash
# Login as teacher first
TEACHER_TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "teacher@example.com", "password": "teacher123"}' \
  | jq -r '.token')

# Add marks for a student
curl -X POST http://localhost:5000/api/teacher/marks \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "subject_id": 1,
    "exam_type": "Midterm",
    "marks_obtained": 85,
    "max_marks": 100,
    "exam_date": "2024-02-15",
    "remarks": "Good performance"
  }'

# Mark attendance
curl -X POST http://localhost:5000/api/teacher/attendance \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "records": [
      {
        "student_id": 1,
        "class_id": 1,
        "date": "2024-02-16",
        "status": "present",
        "remarks": ""
      }
    ]
  }'

# Get class performance
curl -X GET http://localhost:5000/api/teacher/performance/class/1 \
  -H "Authorization: Bearer $TEACHER_TOKEN"
```

### 4. Student Operations

```bash
# Login as student
STUDENT_TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@example.com", "password": "student123"}' \
  | jq -r '.token')

# Get my marks
curl -X GET http://localhost:5000/api/student/my-marks \
  -H "Authorization: Bearer $STUDENT_TOKEN"

# Get my attendance
curl -X GET http://localhost:5000/api/student/my-attendance \
  -H "Authorization: Bearer $STUDENT_TOKEN"

# Get my performance
curl -X GET http://localhost:5000/api/student/my-performance \
  -H "Authorization: Bearer $STUDENT_TOKEN"
```

### 5. ML Operations

```bash
# Train the ML model (requires sufficient data)
curl -X POST http://localhost:5000/api/ml/train \
  -H "Authorization: Bearer $TOKEN"

# Get prediction for a student
curl -X GET http://localhost:5000/api/ml/predict/1 \
  -H "Authorization: Bearer $TOKEN"

# Get all weak students
curl -X GET http://localhost:5000/api/ml/weak-students \
  -H "Authorization: Bearer $TOKEN"

# Get predictions for entire class
curl -X GET http://localhost:5000/api/ml/class-predictions/1 \
  -H "Authorization: Bearer $TOKEN"
```

## Testing with Postman

1. **Import Collection**:
   - Create a new collection named "Student Evaluation API"
   - Set base URL variable: `{{baseUrl}}` = `http://localhost:5000/api`

2. **Setup Authorization**:
   - Collection level: Set Authorization to Bearer Token
   - Use variable: `{{token}}`

3. **Create Login Request**:
   - POST `{{baseUrl}}/auth/login`
   - Body: `{"email": "admin@school.com", "password": "admin123"}`
   - Test Script:
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.token);
   ```

4. **Create Requests for Each Endpoint**:
   - Use the cURL examples above
   - Token will be automatically added from environment variable

## Sample Test Data

```sql
-- After setting up the system, add this test data

-- Add more subjects
INSERT INTO subjects (subject_name, subject_code, class_id, max_marks, pass_marks) VALUES
('Physics', 'PHY101', 1, 100, 40),
('Chemistry', 'CHEM101', 1, 100, 40),
('Biology', 'BIO101', 1, 100, 40),
('English', 'ENG101', 1, 100, 40),
('History', 'HIST101', 1, 100, 40);

-- You can add marks and attendance through the API as shown above
```

## Expected Responses

### Successful Login:
```json
{
  "user": {
    "id": 1,
    "email": "admin@school.com",
    "role": "admin",
    "is_active": true
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Student Performance:
```json
{
  "overall": {
    "subjects_taken": 5,
    "overall_percentage": 78.5,
    "highest_percentage": 95.0,
    "lowest_percentage": 65.0
  },
  "subject_wise": [
    {
      "subject_name": "Mathematics",
      "average_percentage": 85.5,
      "exams_taken": 3
    }
  ],
  "attendance": {
    "present_days": 45,
    "absent_days": 5,
    "total_days": 50,
    "attendance_percentage": 90.0
  }
}
```

### ML Prediction:
```json
{
  "student_id": 1,
  "current_average": 78.5,
  "predicted_final_score": 79.2,
  "is_weak_student": false,
  "weak_probability": 0.15,
  "attendance_rate": 90.0,
  "improvement_trend": 2.5,
  "recommendation": [
    "Good progress, work on improving weak areas",
    "Good attendance, try to maintain above 90%",
    "Showing positive improvement - keep up the good work"
  ]
}
```

## Error Responses

### 401 Unauthorized:
```json
{
  "error": "Authorization token is missing"
}
```

### 403 Forbidden:
```json
{
  "error": "Unauthorized access"
}
```

### 404 Not Found:
```json
{
  "error": "Student profile not found"
}
```

### 500 Internal Server Error:
```json
{
  "error": "Internal server error"
}
```
