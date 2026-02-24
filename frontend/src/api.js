// import axios from 'axios';

// const API_BASE_URL = "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // /**
// //  * REQUEST INTERCEPTOR
// //  * Ensures the latest token from localStorage is attached to every request.
// //  */
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");

// //     if (token) {
// //       // Use standard Bearer token format
// //       config.headers.Authorization = `Bearer ${token}`;
// //     } else {
// //       console.warn(`No token found for request to: ${config.url}`);
// //     }

// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // /**
// //  * RESPONSE INTERCEPTOR
// //  * Handles global error cases like 401 Unauthorized.
// //  */
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     const originalRequest = error.config;

// //     // Check if error is 401 and we aren't already on the login page
// //     // This prevents a loop if the login credentials themselves are wrong
// //     if (
// //       error.response?.status === 401 && 
// //       !originalRequest.url.includes('/auth/login')
// //     ) {
// //       console.error("Unauthorized! Clearing session and redirecting to login...");
      
// //       localStorage.removeItem("user");
// //       localStorage.removeItem("token");
      
// //       // Redirect to login only if not already there
// //       if (window.location.pathname !== '/login') {
// //         window.location.href = "/login";
// //       }
// //     }
    
// //     return Promise.reject(error);
// //   }
// // );

// // // --- API ENDPOINTS ---

// // // Auth endpoints
// // export const authAPI = {
// //   login: (email, password) => api.post('/auth/login', { email, password }),
// //   getCurrentUser: () => api.get('/auth/me'),
// //   changePassword: (oldPassword, newPassword) =>
// //     api.post('/auth/change-password', { old_password: oldPassword, new_password: newPassword }),
// // };

// // // Admin endpoints
// // export const adminAPI = {
// //   getUsers: () => api.get('/admin/users'),
// //   createUser: (data) => api.post('/admin/users', data),
// //   deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
// //   getStudents: () => api.get('/admin/students'),
// //   createStudent: (data) => api.post('/admin/students', data),
// //   updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  
// //   getTeachers: () => api.get('/admin/teachers'),
// //   createTeacher: (data) => api.post('/admin/teachers', data),
  
// //   getParents: () => api.get('/admin/parents'),
// //   createParent: (data) => api.post('/admin/parents', data),
  
// //   getClasses: () => api.get('/admin/classes'),
// //   createClass: (data) => api.post('/admin/classes', data),
  
// //   getSubjects: (classId) => api.get('/admin/subjects', { params: { class_id: classId } }),
// //   createSubject: (data) => api.post('/admin/subjects', data),
// // };

// // // Teacher endpoints
// // export const teacherAPI = {
// //   getMarks: (params) => api.get('/teacher/marks', { params }),
// //   addMarks: (data) => api.post('/teacher/marks', data),
// //   updateMarks: (id, data) => api.put(`/teacher/marks/${id}`, data),
// //   deleteMarks: (id) => api.delete(`/teacher/marks/${id}`),
  
// //   getAttendance: (params) => api.get('/teacher/attendance', { params }),
// //   markAttendance: (data) => api.post('/teacher/attendance', data),
// //   getAttendanceSummary: (studentId) => api.get(`/teacher/attendance/summary/${studentId}`),
  
// //   getClassPerformance: (classId) => api.get(`/teacher/performance/class/${classId}`),
// //   getSubjectPerformance: (subjectId) => api.get(`/teacher/performance/subject/${subjectId}`),
  
// //   sendNotification: (data) => api.post('/teacher/notifications/send', data),
// // };

// // // Student endpoints
// // export const studentAPI = {
// //   getMyMarks: () => api.get('/student/my-marks'),
// //   getMyAttendance: () => api.get('/student/my-attendance'),
// //   getMyPerformance: () => api.get('/student/my-performance'),
// //   getMyNotifications: () => api.get('/student/my-notifications'),
// //   markNotificationRead: (id) => api.put(`/student/notifications/${id}/read`),
// // };

// // // Parent endpoints
// // export const parentAPI = {
// //   getMyChildren: () => api.get('/parent/my-children'),
// //   getChildMarks: (studentId) => api.get(`/parent/child-marks/${studentId}`),
// //   getChildAttendance: (studentId) => api.get(`/parent/child-attendance/${studentId}`),
// //   getChildPerformance: (studentId) => api.get(`/parent/child-performance/${studentId}`),
// //   getMyNotifications: () => api.get('/parent/my-notifications'),
// //   markNotificationRead: (id) => api.put(`/parent/notifications/${id}/read`),
// // };

// // // ML endpoints
// // export const mlAPI = {
// //   trainModel: () => api.post('/ml/train'),
// //   predictPerformance: (studentId) => api.get(`/ml/predict/${studentId}`),
// //   getWeakStudents: () => api.get('/ml/weak-students'),
// //   getClassPredictions: (classId) => api.get(`/ml/class-predictions/${classId}`),
// // };

// // export default api;
// // import axios from 'axios';

// // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

// // // Create axios instance
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Add token to requests
// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");

// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// // // Handle response errors
// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     if (error.response?.status === 401) {
// // //       localStorage.removeItem('token');
// // //       localStorage.removeItem('user');
// // //       // window.location.href = '/login';
// // //       window.location.href = '/';

// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );
// //   api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     const isUnauthorized = error.response?.status === 401;
// //     const isLoginRequest = error.config?.url?.includes('/auth/login');

// //     if (isUnauthorized && !isLoginRequest) {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');

// //       if (window.location.pathname !== '/') {
// //         window.location.href = '/';
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );


// // // Auth endpoints
// // export const authAPI = {
// //   login: (email, password) => api.post('/auth/login', { email, password }),
// //   getCurrentUser: () => api.get('/auth/me'),
// //   changePassword: (oldPassword, newPassword) =>
// //     api.post('/auth/change-password', { old_password: oldPassword, new_password: newPassword }),
// // };

// // // Admin endpoints
// // export const adminAPI = {
// //   getUsers: () => api.get('/admin/users'),
// //   createUser: (data) => api.post('/admin/users', data),
// //   deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
// //   getStudents: () => api.get('/admin/students'),
// //   createStudent: (data) => api.post('/admin/students', data),
// //   updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  
// //   getTeachers: () => api.get('/admin/teachers'),
// //   createTeacher: (data) => api.post('/admin/teachers', data),
  
// //   getParents: () => api.get('/admin/parents'),
// //   createParent: (data) => api.post('/admin/parents', data),
  
// //   getClasses: () => api.get('/admin/classes'),
// //   createClass: (data) => api.post('/admin/classes', data),
  
// //   getSubjects: (classId) => api.get('/admin/subjects', { params: { class_id: classId } }),
// //   createSubject: (data) => api.post('/admin/subjects', data),
// // };

// // // Teacher endpoints
// // export const teacherAPI = {
// //   getMarks: (params) => api.get('/teacher/marks', { params }),
// //   addMarks: (data) => api.post('/teacher/marks', data),
// //   updateMarks: (id, data) => api.put(`/teacher/marks/${id}`, data),
// //   deleteMarks: (id) => api.delete(`/teacher/marks/${id}`),
  
// //   getAttendance: (params) => api.get('/teacher/attendance', { params }),
// //   markAttendance: (data) => api.post('/teacher/attendance', data),
// //   getAttendanceSummary: (studentId) => api.get(`/teacher/attendance/summary/${studentId}`),
  
// //   getClassPerformance: (classId) => api.get(`/teacher/performance/class/${classId}`),
// //   getSubjectPerformance: (subjectId) => api.get(`/teacher/performance/subject/${subjectId}`),
  
// //   sendNotification: (data) => api.post('/teacher/notifications/send', data),
// // };

// // // Student endpoints
// // export const studentAPI = {
// //   getMyMarks: () => api.get('/student/my-marks'),
// //   getMyAttendance: () => api.get('/student/my-attendance'),
// //   getMyPerformance: () => api.get('/student/my-performance'),
// //   getMyNotifications: () => api.get('/student/my-notifications'),
// //   markNotificationRead: (id) => api.put(`/student/notifications/${id}/read`),
// // };

// // // Parent endpoints
// // export const parentAPI = {
// //   getMyChildren: () => api.get('/parent/my-children'),
// //   getChildMarks: (studentId) => api.get(`/parent/child-marks/${studentId}`),
// //   getChildAttendance: (studentId) => api.get(`/parent/child-attendance/${studentId}`),
// //   getChildPerformance: (studentId) => api.get(`/parent/child-performance/${studentId}`),
// //   getMyNotifications: () => api.get('/parent/my-notifications'),
// //   markNotificationRead: (id) => api.put(`/parent/notifications/${id}/read`),
// // };

// // // ML endpoints
// // export const mlAPI = {
// //   trainModel: () => api.post('/ml/train'),
// //   predictPerformance: (studentId) => api.get(`/ml/predict/${studentId}`),
// //   getWeakStudents: () => api.get('/ml/weak-students'),
// //   getClassPredictions: (classId) => api.get(`/ml/class-predictions/${classId}`),
// // };

// // export default api;
// // frontend/src/api.js
// // import axios from "axios";

// // const API_BASE_URL =
// //   process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

// // src/api.js - DEBUG VERSION (temporary)
// api.interceptors.response.use(
//   (response) => response,
//   // (error) => {
//   //   console.error('🔴 API ERROR:', {
//   //     status: error.response?.status,
//   //     url: error.config?.url,
//   //     message: error.response?.data?.error || error.message
//   //   });
    
//   //   const isUnauthorized = error.response?.status === 401;
//   //   const isLoginRequest = error.config?.url?.includes('/auth/login');
    
//   //   if (isUnauthorized && !isLoginRequest) {
//   //     console.error('🚫 401 DETECTED → Clearing session');
//   //     localStorage.removeItem('token');
//   //     localStorage.removeItem('user');
      
//   //     if (window.location.pathname !== '/login') {
//   //       window.location.href = '/login';
//   //     }
//   //   }
    
//   //   return Promise.reject(error);
//   // }
// );

// // Request interceptor DEBUG
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log('🚀 REQUEST:', config.url, 
//     token ? `Token OK (${token.slice(0,20)}...)` : '❌ NO TOKEN');
  
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// // // Create axios instance
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // Request interceptor – attach token
// // // api.interceptors.request.use((config) => {
// // //   const token = localStorage.getItem("token");
// // //   console.log(`🔍 ${config.url} Token:`, token ? "✅" : "❌");  // DEBUG
// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }
// // //   return config;
// // // });
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   console.log("🚀", config.url, token ? "✅ TOKEN" : "❌ NO TOKEN");
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });


// // // Response interceptor – handle 401
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     const isUnauthorized = error.response?.status === 401;
// //     const isLoginRequest = error.config?.url?.includes("/auth/login");

// //     if (isUnauthorized && !isLoginRequest) {
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //       if (window.location.pathname !== "/") {
// //         window.location.href = "/";
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // ===== Auth endpoints =====
// export const authAPI = {
//   login: (email, password) => api.post("/auth/login", { email, password }),
//   getCurrentUser: () => api.get("/auth/me"),
//   changePassword: (oldPassword, newPassword) =>
//     api.post("/auth/change-password", {
//       old_password: oldPassword,
//       new_password: newPassword,
//     }),
// };

// // ===== Admin endpoints =====
// // export const adminAPI = {
// //   getUsers: () => api.get("/admin/users"),
// //   createUser: (data) => api.post("/admin/users", data),
// //   deleteUser: (id) => api.delete(`/admin/users/${id}`),

// //   getStudents: () => api.get("/admin/students"),
// //   createStudent: (data) => api.post("/admin/students", data),
// //   updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),

// //   getTeachers: () => api.get("/admin/teachers"),
// //   createTeacher: (data) => api.post("/admin/teachers", data),

// //   getParents: () => api.get("/admin/parents"),
// //   createParent: (data) => api.post("/admin/parents", data),

// //   getClasses: () => api.get("/admin/classes"),
// //   createClass: (data) => api.post("/admin/classes", data),

// //   getSubjects: (classId) =>
// //     api.get("/admin/subjects", { params: { class_id: classId } }),
// //   createSubject: (data) => api.post("/admin/subjects", data),
// // };
// // Add these CRUD methods
// export const adminAPI = {
//   // ... existing GET methods
//   getUsers: () => api.get("/admin/users"),
//   createUser: (data) => api.post("/admin/users", data),
//   deleteUser: (id) => api.delete(`/admin/users/${id}`),

//   getStudents: () => api.get("/admin/students"),
//   createStudent: (data) => api.post("/admin/students", data),
//   updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),

//   getTeachers: () => api.get("/admin/teachers"),
//   createTeacher: (data) => api.post("/admin/teachers", data),

//   getParents: () => api.get("/admin/parents"),
//   createParent: (data) => api.post("/admin/parents", data),

//   getClasses: () => api.get("/admin/classes"),
//   createClass: (data) => api.post("/admin/classes", data),

//   getSubjects: (classId) =>
//     api.get("/admin/subjects", { params: { class_id: classId } }),
//   createSubject: (data) => api.post("/admin/subjects", data),
  
//   // CREATE
//   createStudent: (data) => api.post('/admin/students', data),
//   createTeacher: (data) => api.post('/admin/teachers', data),
//   createParent: (data) => api.post('/admin/parents', data),
//   createClass: (data) => api.post('/admin/classes', data),
  
//   // UPDATE
//   updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
//   updateTeacher: (id, data) => api.put(`/admin/teachers/${id}`, data),
//   updateParent: (id, data) => api.put(`/admin/parents/${id}`, data),
//   updateClass: (id, data) => api.put(`/admin/classes/${id}`, data),
  
//   // DELETE
//   deleteStudent: (id) => api.delete(`/admin/students/${id}`),
//   deleteTeacher: (id) => api.delete(`/admin/teachers/${id}`),
//   deleteParent: (id) => api.delete(`/admin/parents/${id}`),
//   deleteClass: (id) => api.delete(`/admin/classes/${id}`),
// };


// // ===== Teacher endpoints =====
// export const teacherAPI = {
//   getMarks: (params) => api.get("/teacher/marks", { params }),
//   addMarks: (data) => api.post("/teacher/marks", data),
//   updateMarks: (id, data) => api.put(`/teacher/marks/${id}`, data),
//   deleteMarks: (id) => api.delete(`/teacher/marks/${id}`),

//   getAttendance: (params) => api.get("/teacher/attendance", { params }),
//   markAttendance: (data) => api.post("/teacher/attendance", data),
//   getAttendanceSummary: (studentId) =>
//     api.get(`/teacher/attendance/summary/${studentId}`),

//   getClassPerformance: (classId) =>
//     api.get(`/teacher/performance/class/${classId}`),
//   getSubjectPerformance: (subjectId) =>
//     api.get(`/teacher/performance/subject/${subjectId}`),

//   sendNotification: (data) => api.post("/teacher/notifications/send", data),
// };

// // ===== Student endpoints =====
// export const studentAPI = {
//   getMyMarks: () => api.get("/student/my-marks"),
//   getMyAttendance: () => api.get("/student/my-attendance"),
//   getMyPerformance: () => api.get("/student/my-performance"),
//   getMyNotifications: () => api.get("/student/my-notifications"),
//   markNotificationRead: (id) =>
//     api.put(`/student/notifications/${id}/read`),
// };

// // ===== Parent endpoints =====
// export const parentAPI = {
//   getMyChildren: () => api.get("/parent/my-children"),
//   getChildMarks: (studentId) =>
//     api.get(`/parent/child-marks/${studentId}`),
//   getChildAttendance: (studentId) =>
//     api.get(`/parent/child-attendance/${studentId}`),
//   getChildPerformance: (studentId) =>
//     api.get(`/parent/child-performance/${studentId}`),
//   getMyNotifications: () => api.get("/parent/my-notifications"),
//   markNotificationRead: (id) =>
//     api.put(`/parent/notifications/${id}/read`),
// };

// // ===== ML endpoints =====
// export const mlAPI = {
//   trainModel: () => api.post("/ml/train"),
//   predictPerformance: (studentId) =>
//     api.get(`/ml/predict/${studentId}`),
//   getWeakStudents: () => api.get("/ml/weak-students"),
//   getClassPredictions: (classId) =>
//     api.get(`/ml/class-predictions/${classId}`),
// };
// // api.js
// export const cgpaAPI = {
//   calculate: (data) => api.post("/student/calculate-cgpa", data),
// };

// export default api;

// frontend/src/api.js - COMPLETE FIXED VERSION
import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://student-performance-113j.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  changePassword: (oldPassword, newPassword) =>
    api.post('/auth/change-password', { old_password: oldPassword, new_password: newPassword }),
};

// ===== ADMIN API (FULL CRUD) =====
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
  getStudents: () => api.get('/admin/students'),
  createStudent: (data) => api.post('/admin/students', data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),
  
  getTeachers: () => api.get('/admin/teachers'),
  createTeacher: (data) => api.post('/admin/teachers', data),
  updateTeacher: (id, data) => api.put(`/admin/teachers/${id}`, data),
  deleteTeacher: (id) => api.delete(`/admin/teachers/${id}`),
  
  getParents: () => api.get('/admin/parents'),
  createParent: (data) => api.post('/admin/parents', data),
  updateParent: (id, data) => api.put(`/admin/parents/${id}`, data),
  deleteParent: (id) => api.delete(`/admin/parents/${id}`),
  
  getClasses: () => api.get('/admin/classes'),
  createClass: (data) => api.post('/admin/classes', data),
  updateClass: (id, data) => api.put(`/admin/classes/${id}`, data),
  deleteClass: (id) => api.delete(`/admin/classes/${id}`),
  
  getSubjects: (classId) => api.get('/admin/subjects', { params: { class_id: classId } }),
  createSubject: (data) => api.post('/admin/subjects', data),
};

// ===== TEACHER API =====
export const teacherAPI = {
  getMarks: (params) => api.get('/teacher/marks', { params }),
  addMarks: (data) => api.post('/teacher/marks', data),
  updateMarks: (id, data) => api.put(`/teacher/marks/${id}`, data),
  deleteMarks: (id) => api.delete(`/teacher/marks/${id}`),
  
  getAttendance: (params) => api.get('/teacher/attendance', { params }),
  markAttendance: (data) => api.post('/teacher/attendance', data),
  getAttendanceSummary: (studentId) => api.get(`/teacher/attendance/summary/${studentId}`),
  
  getClassPerformance: (classId) => api.get(`/teacher/performance/class/${classId}`),
  getSubjectPerformance: (subjectId) => api.get(`/teacher/performance/subject/${subjectId}`),
  
  sendNotification: (data) => api.post('/teacher/notifications/send', data),
};

// ===== STUDENT API =====
export const studentAPI = {
  getMyMarks: () => api.get('/student/my-marks'),
  getMyAttendance: () => api.get('/student/my-attendance'),
  getMyPerformance: () => api.get('/student/my-performance'),
  getMyNotifications: () => api.get('/student/my-notifications'),
  markNotificationRead: (id) => api.put(`/student/notifications/${id}/read`),
};

// ===== PARENT API =====
export const parentAPI = {
  getMyChildren: () => api.get('/parent/my-children'),
  getChildMarks: (studentId) => api.get(`/parent/child-marks/${studentId}`),
  getChildAttendance: (studentId) => api.get(`/parent/child-attendance/${studentId}`),
  getChildPerformance: (studentId) => api.get(`/parent/child-performance/${studentId}`),
  getMyNotifications: () => api.get('/parent/my-notifications'),
  markNotificationRead: (id) => api.put(`/parent/notifications/${id}/read`),
};

// ===== ML API =====
export const mlAPI = {
  trainModel: () => api.post('/ml/train'),
  predictPerformance: (studentId) => api.get(`/ml/predict/${studentId}`),
  getWeakStudents: () => api.get('/ml/weak-students'),
  getClassPredictions: (classId) => api.get(`/ml/class-predictions/${classId}`),
};

// 🔥 CGPA API - PERFECT MATCH FOR YOUR FLASK BACKEND
export const cgpaAPI = {
  calculateStudentCGPA: (data) => api.post('/student/calculate-cgpa', data),
  // data = { student_id: 123, marks: {"HS3152": "A"} }
};

// 🔥 DEFAULT EXPORT (for backward compatibility)
export default {
  ...authAPI,
  ...adminAPI,
  ...teacherAPI,
  ...studentAPI,
  ...parentAPI,
  ...mlAPI,
  ...cgpaAPI,
  api // Raw axios instance
};
