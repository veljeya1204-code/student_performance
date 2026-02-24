# Project Structure

```
student-evaluation-system/
│
├── backend/                          # Flask Backend
│   ├── app.py                       # Main Flask application
│   ├── database.py                  # Database connection manager
│   ├── auth.py                      # Authentication utilities
│   ├── ml_predictor.py             # Machine Learning module
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment variables template
│   ├── models/                      # ML models directory (auto-created)
│   │   ├── regressor.pkl
│   │   ├── classifier.pkl
│   │   └── scaler.pkl
│   └── routes/                      # API route modules
│       ├── auth_routes.py           # Authentication endpoints
│       ├── admin_routes.py          # Admin operations
│       ├── teacher_routes.py        # Teacher operations
│       ├── student_parent_routes.py # Student & Parent operations
│       └── ml_routes.py             # ML prediction endpoints
│
├── frontend/                         # React Frontend
│   ├── package.json                 # Node dependencies
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js                 # React entry point
│       ├── index.css                # Global styles
│       ├── App.js                   # Main App component
│       ├── App.css                  # App styles
│       ├── services/
│       │   └── api.js               # API service layer
│       └── components/
│           ├── Login.js             # Login component
│           ├── Login.css            # Login styles
│           └── dashboards/
│               ├── AdminDashboard.js
│               ├── TeacherDashboard.js
│               ├── StudentDashboard.js
│               ├── StudentDashboard.css
│               └── ParentDashboard.js
│
├── database/                         # Database files
│   └── schema.sql                   # PostgreSQL schema
│
├── docs/                            # Documentation
│   └── API_TESTING.md              # API testing guide
│
└── README.md                        # Main documentation
```

## Backend Architecture

### Core Files

**app.py**
- Flask application initialization
- CORS configuration
- JWT setup
- Blueprint registration
- Error handlers

**database.py**
- PostgreSQL connection management
- Query execution methods
- Connection pooling
- Error handling

**auth.py**
- Password hashing (bcrypt)
- Token generation (JWT)
- User authentication
- Role-based decorators

**ml_predictor.py**
- Data preparation
- Feature engineering
- Model training (Random Forest, Gradient Boosting)
- Performance prediction
- At-risk student detection

### API Routes Structure

**Authentication Routes** (`/api/auth`)
- POST `/login` - User authentication
- GET `/me` - Get current user info
- POST `/change-password` - Update password

**Admin Routes** (`/api/admin`)
- User Management: GET, POST, DELETE `/users`
- Student Management: GET, POST, PUT `/students`
- Teacher Management: GET, POST `/teachers`
- Parent Management: GET, POST `/parents`
- Class Management: GET, POST `/classes`
- Subject Management: GET, POST `/subjects`

**Teacher Routes** (`/api/teacher`)
- Marks: GET, POST, PUT, DELETE `/marks`
- Attendance: GET, POST `/attendance`
- Performance: GET `/performance/class/:id`, `/performance/subject/:id`
- Notifications: POST `/notifications/send`

**Student Routes** (`/api/student`)
- GET `/my-marks` - Personal marks
- GET `/my-attendance` - Personal attendance
- GET `/my-performance` - Performance statistics
- GET `/my-notifications` - Notifications

**Parent Routes** (`/api/parent`)
- GET `/my-children` - Children list
- GET `/child-marks/:id` - Child's marks
- GET `/child-attendance/:id` - Child's attendance
- GET `/child-performance/:id` - Child's performance

**ML Routes** (`/api/ml`)
- POST `/train` - Train ML models
- GET `/predict/:studentId` - Predict performance
- GET `/weak-students` - Get at-risk students
- GET `/class-predictions/:classId` - Class predictions

## Frontend Architecture

### Component Hierarchy

```
App
├── Login
└── Dashboards (Role-based)
    ├── AdminDashboard
    │   ├── Overview (Stats + ML Insights)
    │   ├── Students Management
    │   ├── Teachers Management
    │   └── Classes Management
    │
    ├── TeacherDashboard
    │   ├── Overview (Class Performance)
    │   ├── Marks Entry
    │   └── Attendance
    │
    ├── StudentDashboard
    │   ├── Overview (Charts)
    │   ├── Marks List
    │   ├── Attendance Records
    │   └── Notifications
    │
    └── ParentDashboard
        ├── Children Overview
        ├── Child Marks
        └── Child Attendance
```

### State Management

- **Local State**: useState for component-level state
- **Authentication**: localStorage for token persistence
- **API Calls**: Axios with interceptors
- **Route Protection**: Conditional rendering based on user role

### Styling Approach

- **CSS Architecture**: Component-level CSS files
- **Design System**: 
  - Dark theme with gradient backgrounds
  - Glassmorphism effects
  - Consistent color palette (indigo/purple)
  - Responsive grid layouts
  - Modern animations

## Database Schema

### Tables Overview

**users** - Authentication
- id, email, password_hash, role, is_active

**teachers** - Teacher profiles
- id, user_id, first_name, last_name, phone, qualification, department

**students** - Student profiles
- id, user_id, first_name, last_name, dob, class_id, roll_number

**parents** - Parent profiles
- id, user_id, first_name, last_name, phone, address

**classes** - Class information
- id, class_name, section, academic_year, teacher_id

**subjects** - Subject definitions
- id, subject_name, subject_code, class_id, teacher_id, max_marks

**marks** - Exam marks
- id, student_id, subject_id, exam_type, marks_obtained, exam_date

**attendance** - Attendance records
- id, student_id, class_id, date, status

**notifications** - System notifications
- id, sender_id, recipient_id, title, message, type, is_read

**parent_student** - Parent-student relationships
- parent_id, student_id, relationship

### Relationships

```
users (1) ----< (1) teachers
users (1) ----< (1) students
users (1) ----< (1) parents

classes (1) ----< (N) students
classes (1) ----< (N) subjects
classes (1) ----< (1) teachers [class teacher]

subjects (1) ----< (N) marks
subjects (1) ----< (1) teachers [subject teacher]

students (1) ----< (N) marks
students (1) ----< (N) attendance
students (N) ----< (N) parents [through parent_student]

teachers (1) ----< (N) marks [graded by]
teachers (1) ----< (N) attendance [marked by]
```

## Security Architecture

### Authentication Flow

1. User submits credentials → `/api/auth/login`
2. Backend validates password (bcrypt)
3. Generate JWT token with user info
4. Frontend stores token in localStorage
5. All subsequent requests include token in Authorization header
6. Backend validates token and role on each request

### Authorization

- **Role-based Access Control (RBAC)**
- Decorators: `@role_required(['admin', 'teacher'])`
- Frontend: Conditional rendering based on user role
- API: Middleware checks JWT claims

### Data Protection

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with expiration
- SQL injection prevention (parameterized queries)
- XSS prevention (React escapes by default)
- CORS configured for specific origins

## ML Architecture

### Pipeline

1. **Data Collection**: Fetch marks and attendance from database
2. **Feature Engineering**:
   - Average percentage
   - Standard deviation
   - Min/max scores
   - Attendance rate
   - Improvement trend
   - Exam count

3. **Model Training**:
   - Regression: Random Forest (predict final score)
   - Classification: Gradient Boosting (identify at-risk students)
   - Feature scaling: StandardScaler

4. **Prediction**:
   - Load trained models
   - Transform new data
   - Generate predictions
   - Provide recommendations

### Model Persistence

- Models saved as .pkl files in `backend/models/`
- Loaded on-demand for predictions
- Re-trainable with new data via API

## Deployment Considerations

### Development
- Flask debug mode
- React development server
- Local PostgreSQL

### Production
- Gunicorn WSGI server
- React production build
- PostgreSQL with connection pooling
- Nginx reverse proxy
- HTTPS/SSL
- Environment variable management
- Logging and monitoring
- Database backups

## API Response Formats

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

### List Response
```json
[
  {...},
  {...}
]
```

## Code Quality Standards

### Backend
- PEP 8 style guide
- Type hints where applicable
- Comprehensive error handling
- Input validation
- SQL parameterization

### Frontend
- Functional components with hooks
- Proper error boundaries
- Loading states
- Responsive design
- Accessibility considerations

## Performance Optimizations

### Backend
- Database connection pooling
- Indexed columns for frequent queries
- Batch operations for attendance
- Cached ML model loading

### Frontend
- Code splitting
- Lazy loading components
- Memoization for expensive calculations
- Optimized re-renders
- Image optimization

## Testing Strategy

### Backend
- Unit tests for utilities
- Integration tests for routes
- Database transaction tests
- ML model validation

### Frontend
- Component unit tests
- Integration tests
- E2E tests with Cypress/Playwright
- API mocking

## Monitoring & Logging

### Backend
- Flask logging
- Error tracking
- API request logging
- Database query logging

### Frontend
- Console error tracking
- User action analytics
- Performance monitoring
