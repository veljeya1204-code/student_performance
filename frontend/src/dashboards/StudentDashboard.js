// // frontend/src/dashboards/StudentDashboard.js
// import React, { useEffect, useState } from "react";
// import { studentAPI } from "../api"; // fixed import path
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import "./StudentDashboard.css";

// function StudentDashboard({ user, onLogout }) {
//   const [marks, setMarks] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [performance, setPerformance] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const formatNumber = (value, decimals = 1) => {
//   const num = Number(value);
//   return isNaN(num) ? "0.0" : num.toFixed(decimals);
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setError("");
//       const [marksRes, attendanceRes, performanceRes, notificationsRes] =
//         await Promise.all([
//           studentAPI.getMyMarks(),
//           studentAPI.getMyAttendance(),
//           studentAPI.getMyPerformance(),
//           studentAPI.getMyNotifications(),
//         ]);

//       setMarks(marksRes.data || []);
//       setAttendance(attendanceRes.data || []);
//       setPerformance(performanceRes.data || null);
//       setNotifications(notificationsRes.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markNotificationAsRead = async (id) => {
//     try {
//       await studentAPI.markNotificationRead(id);
//       setNotifications(
//         notifications.map((n) =>
//           n.id === id ? { ...n, is_read: true } : n
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="dashboard">
//         <div className="loading">Loading dashboard...</div>
//       </div>
//     );
//   }

//   const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

//   // Prepare chart data
//   const subjectPerformanceData =
//     performance?.subject_wise?.map((s) => ({
//       subject: s.subject_name,
//       // average: parseFloat(s.average_percentage || 0).toFixed(1),
//       average: Number(s.average_percentage || 0),
//     })) || [];

//   const examTypeData =
//     performance?.exam_wise?.map((e) => ({
//       type: e.exam_type,
//       average: parseFloat(e.average_percentage || 0).toFixed(1),
//     })) || [];

//   const attendanceData = [
//     { name: "Present", value: performance?.attendance?.present_days || 0 },
//     { name: "Absent", value: performance?.attendance?.absent_days || 0 },
//   ];

//   const renderOverview = () => (
//     <div className="overview-section">
//       <div className="stats-grid">
//         <div className="stat-card">
//           <h3>Overall Percentage</h3>
//           <div className="stat-value">
//             {/* {performance?.overall?.overall_percentage?.toFixed(1) || 0}% */}
//             {formatNumber(performance?.overall?.overall_percentage)}%
//           </div>
//         </div>
//         <div className="stat-card">
//           <h3>Subjects</h3>
//           <div className="stat-value">
//             {performance?.overall?.subjects_taken || 0}
//           </div>
//         </div>
//         <div className="stat-card">
//           <h3>Attendance</h3>
//           <div className="stat-value">
//             {/* {performance?.attendance?.attendance_percentage?.toFixed(1) || 0}% */}
//             {formatNumber(performance?.attendance?.attendance_percentage)}%
//           </div>
//         </div>
//         <div className="stat-card">
//           <h3>Total Exams</h3>
//           <div className="stat-value">{marks.length}</div>
//         </div>
//       </div>

//       <div className="charts-grid">
//         <div className="chart-container">
//           <h3>Performance by Subject</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={subjectPerformanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="average" fill="#6366f1" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <h3>Performance by Exam Type</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={examTypeData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="type" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="average" fill="#8b5cf6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <h3>Attendance Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={attendanceData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, value }) => `${name}: ${value}`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {attendanceData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );

//   const renderMarks = () => (
//     <div className="marks-section">
//       <h2>My Marks</h2>
//       <div className="table-container">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Exam Type</th>
//               <th>Marks</th>
//               <th>Percentage</th>
//               <th>Result</th>
//               <th>Date</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {marks.map((mark) => (
//               <tr key={mark.id}>
//                 <td>{mark.subject_name}</td>
//                 <td>{mark.exam_type}</td>
//                 <td>
//                   {mark.marks_obtained} / {mark.max_marks}
//                 </td>
//                 <td>
//                   <span
//                     className={`percentage ${
//                       mark.percentage >= 50 ? "pass" : "fail"
//                     }`}
//                   >
//                     {/* {mark.percentage?.toFixed(1)}% */}
//                     {formatNumber(mark.percentage)}%
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`result-badge ${
//                       mark.result === "Pass" ? "pass" : "fail"
//                     }`}
//                   >
//                     {mark.result}
//                   </span>
//                 </td>
//                 <td>
//                   {new Date(mark.exam_date).toLocaleDateString()}
//                 </td>
//                 <td>{mark.remarks || "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderAttendance = () => (
//     <div className="attendance-section">
//       <h2>My Attendance</h2>
//       <div className="attendance-summary">
//         <div className="summary-card present">
//           <h4>Present</h4>
//           <p>{performance?.attendance?.present_days || 0} days</p>
//         </div>
//         <div className="summary-card absent">
//           <h4>Absent</h4>
//           <p>{performance?.attendance?.absent_days || 0} days</p>
//         </div>
//         <div className="summary-card total">
//           <h4>Total</h4>
//           <p>{performance?.attendance?.total_days || 0} days</p>
//         </div>
//         <div className="summary-card percentage">
//           <h4>Percentage</h4>
//           <p>
//             {/* {performance?.attendance?.attendance_percentage?.toFixed(1) || 0}% */}
//             {formatNumber(performance?.attendance?.attendance_percentage)}%
//           </p>
//         </div>
//       </div>
//       <div className="table-container">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.map((record) => (
//               <tr key={record.id}>
//                 <td>{new Date(record.date).toLocaleDateString()}</td>
//                 <td>
//                   <span className={`status-badge ${record.status}`}>
//                     {record.status}
//                   </span>
//                 </td>
//                 <td>{record.remarks || "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderNotifications = () => (
//     <div className="notifications-section">
//       <h2>Notifications</h2>
//       <div className="notifications-list">
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className={`notification-item ${
//               notification.is_read ? "read" : "unread"
//             }`}
//             onClick={() =>
//               !notification.is_read && markNotificationAsRead(notification.id)
//             }
//           >
//             <div className="notification-header">
//               <h4>{notification.title}</h4>
//               <span className="notification-date">
//                 {new Date(notification.created_at).toLocaleDateString()}
//               </span>
//             </div>
//             <p className="notification-message">{notification.message}</p>
//             {!notification.is_read && <span className="unread-badge">New</span>}
//           </div>
//         ))}
//         {notifications.length === 0 && (
//           <p className="no-data">No notifications</p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <h1>Student Dashboard</h1>
//           <div className="user-info">
//             <span>{user?.email}</span>
//             <button onClick={onLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {error && <div className="error-banner">{error}</div>}

//       <div className="dashboard-tabs">
//         <button
//           className={`tab ${activeTab === "overview" ? "active" : ""}`}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </button>
//         <button
//           className={`tab ${activeTab === "marks" ? "active" : ""}`}
//           onClick={() => setActiveTab("marks")}
//         >
//           Marks
//         </button>
//         <button
//           className={`tab ${activeTab === "attendance" ? "active" : ""}`}
//           onClick={() => setActiveTab("attendance")}
//         >
//           Attendance
//         </button>
//         <button
//           className={`tab ${activeTab === "notifications" ? "active" : ""}`}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications{" "}
//           {notifications.filter((n) => !n.is_read).length > 0 && (
//             <span className="badge">
//               {notifications.filter((n) => !n.is_read).length}
//             </span>
//           )}
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {activeTab === "overview" && renderOverview()}
//         {activeTab === "marks" && renderMarks()}
//         {activeTab === "attendance" && renderAttendance()}
//         {activeTab === "notifications" && renderNotifications()}
//       </div>
//     </div>
//   );
// }

// export default StudentDashboard;

// // // frontend/src/dashboards/StudentDashboard.js
// // import React, { useEffect, useState } from "react";
// // import { studentAPI } from "../api";
// // import {
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import "./StudentDashboard.css";

// // function StudentDashboard({ user, onLogout }) {
// //   const [marks, setMarks] = useState([]);
// //   const [attendance, setAttendance] = useState([]);
// //   const [performance, setPerformance] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // ✅ FIX: Added missing function
// //   const formatNumber = (value) => {
// //     if (value === null || value === undefined || isNaN(value)) return "0.0";
// //     return Number(value).toFixed(1);
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setError("");
// //       const [marksRes, attendanceRes, performanceRes, notificationsRes] =
// //         await Promise.all([
// //           studentAPI.getMyMarks(),
// //           studentAPI.getMyAttendance(),
// //           studentAPI.getMyPerformance(),
// //           studentAPI.getMyNotifications(),
// //         ]);

// //       setMarks(marksRes.data || []);
// //       setAttendance(attendanceRes.data || []);
// //       setPerformance(performanceRes.data || null);
// //       setNotifications(notificationsRes.data || []);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //       setError("Failed to load dashboard data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const markNotificationAsRead = async (id) => {
// //     try {
// //       await studentAPI.markNotificationRead(id);
// //       setNotifications(
// //         notifications.map((n) =>
// //           n.id === id ? { ...n, is_read: true } : n
// //         )
// //       );
// //     } catch (error) {
// //       console.error("Error marking notification as read:", error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="dashboard">
// //         <div className="loading">Loading dashboard...</div>
// //       </div>
// //     );
// //   }

// //   const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

// //   // Chart Data
// //   const subjectPerformanceData =
// //     performance?.subject_wise?.map((s) => ({
// //       subject: s.subject_name,
// //       average: Number(s.average_percentage || 0),
// //     })) || [];

// //   const examTypeData =
// //     performance?.exam_wise?.map((e) => ({
// //       type: e.exam_type,
// //       average: Number(e.average_percentage || 0),
// //     })) || [];

// //   const attendanceData = [
// //     { name: "Present", value: performance?.attendance?.present_days || 0 },
// //     { name: "Absent", value: performance?.attendance?.absent_days || 0 },
// //   ];

// //   return (
// //     <div className="dashboard">
// //       <header className="dashboard-header">
// //         <div className="header-content">
// //           <h1>Student Dashboard</h1>
// //           <div className="user-info">
// //             <span>{user?.email}</span>
// //             <button onClick={onLogout} className="logout-btn">
// //               Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {error && <div className="error-banner">{error}</div>}

// //       {/* Tabs */}
// //       <div className="dashboard-tabs">
// //         <button
// //           className={`tab ${activeTab === "overview" ? "active" : ""}`}
// //           onClick={() => setActiveTab("overview")}
// //         >
// //           Overview
// //         </button>
// //         <button
// //           className={`tab ${activeTab === "marks" ? "active" : ""}`}
// //           onClick={() => setActiveTab("marks")}
// //         >
// //           Marks
// //         </button>
// //         <button
// //           className={`tab ${activeTab === "attendance" ? "active" : ""}`}
// //           onClick={() => setActiveTab("attendance")}
// //         >
// //           Attendance
// //         </button>
// //         <button
// //           className={`tab ${activeTab === "notifications" ? "active" : ""}`}
// //           onClick={() => setActiveTab("notifications")}
// //         >
// //           Notifications{" "}
// //           {notifications.filter((n) => !n.is_read).length > 0 && (
// //             <span className="badge">
// //               {notifications.filter((n) => !n.is_read).length}
// //             </span>
// //           )}
// //         </button>
// //       </div>

// //       <div className="dashboard-content">

// //         {/* OVERVIEW */}
// //         {activeTab === "overview" && (
// //           <div className="overview-section">
// //             <div className="stats-grid">
// //               <div className="stat-card">
// //                 <h3>Overall Percentage</h3>
// //                 <div className="stat-value">
// //                   {formatNumber(performance?.overall?.overall_percentage)}%
// //                 </div>
// //               </div>

// //               <div className="stat-card">
// //                 <h3>Subjects</h3>
// //                 <div className="stat-value">
// //                   {performance?.overall?.subjects_taken || 0}
// //                 </div>
// //               </div>

// //               <div className="stat-card">
// //                 <h3>Attendance</h3>
// //                 <div className="stat-value">
// //                   {formatNumber(
// //                     performance?.attendance?.attendance_percentage
// //                   )}
// //                   %
// //                 </div>
// //               </div>

// //               <div className="stat-card">
// //                 <h3>Total Exams</h3>
// //                 <div className="stat-value">{marks.length}</div>
// //               </div>
// //             </div>

// //             <div className="charts-grid">

// //               {/* Subject Chart */}
// //               <div className="chart-container">
// //                 <h3>Performance by Subject</h3>
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={subjectPerformanceData}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="subject" />
// //                     <YAxis />
// //                     <Tooltip />
// //                     <Bar dataKey="average" fill="#6366f1" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               {/* Exam Type Chart */}
// //               <div className="chart-container">
// //                 <h3>Performance by Exam Type</h3>
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={examTypeData}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="type" />
// //                     <YAxis />
// //                     <Tooltip />
// //                     <Bar dataKey="average" fill="#8b5cf6" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               </div>

// //               {/* Attendance Pie */}
// //               <div className="chart-container">
// //                 <h3>Attendance Distribution</h3>
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <PieChart>
// //                     <Pie
// //                       data={attendanceData}
// //                       dataKey="value"
// //                       outerRadius={80}
// //                       label={({ name, value }) => `${name}: ${value}`}
// //                     >
// //                       {attendanceData.map((entry, index) => (
// //                         <Cell
// //                           key={index}
// //                           fill={COLORS[index % COLORS.length]}
// //                         />
// //                       ))}
// //                     </Pie>
// //                     <Tooltip />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //               </div>

// //             </div>
// //           </div>
// //         )}

// //         {/* MARKS */}
// //         {activeTab === "marks" && (
// //           <div className="marks-section">
// //             <h2>My Marks</h2>
// //             <div className="table-container">
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Subject</th>
// //                     <th>Exam Type</th>
// //                     <th>Marks</th>
// //                     <th>Percentage</th>
// //                     <th>Result</th>
// //                     <th>Date</th>
// //                     <th>Remarks</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {marks.map((mark) => (
// //                     <tr key={mark.id}>
// //                       <td>{mark.subject_name}</td>
// //                       <td>{mark.exam_type}</td>
// //                       <td>
// //                         {mark.marks_obtained} / {mark.max_marks}
// //                       </td>
// //                       <td>
// //                         <span
// //                           className={`percentage ${
// //                             mark.percentage >= 50 ? "pass" : "fail"
// //                           }`}
// //                         >
// //                           {formatNumber(mark.percentage)}%
// //                         </span>
// //                       </td>
// //                       <td>{mark.result}</td>
// //                       <td>
// //                         {new Date(mark.exam_date).toLocaleDateString()}
// //                       </td>
// //                       <td>{mark.remarks || "-"}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* ATTENDANCE */}
// //         {activeTab === "attendance" && (
// //           <div className="attendance-section">
// //             <h2>My Attendance</h2>
// //             <p>
// //               Attendance Percentage:{" "}
// //               {formatNumber(
// //                 performance?.attendance?.attendance_percentage
// //               )}
// //               %
// //             </p>
// //           </div>
// //         )}

// //         {/* NOTIFICATIONS */}
// //         {activeTab === "notifications" && (
// //           <div className="notifications-section">
// //             <h2>Notifications</h2>
// //             {notifications.length === 0 && <p>No notifications</p>}
// //             {notifications.map((notification) => (
// //               <div key={notification.id}>
// //                 <h4>{notification.title}</h4>
// //                 <p>{notification.message}</p>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }

// // export default StudentDashboard;
// frontend/src/dashboards/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { studentAPI } from "../api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CGPACalculator from "../components/CGPACalculator"; // 🔥 NEW IMPORT
import "./StudentDashboard.css";

function StudentDashboard({ user, onLogout }) {
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const formatNumber = (value, decimals = 1) => {
    const num = Number(value);
    return isNaN(num) ? "0.0" : num.toFixed(decimals);
  };

  // 🔥 CALCULATE UNREAD NOTIFICATIONS COUNT
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError("");
      const [marksRes, attendanceRes, performanceRes, notificationsRes] =
        await Promise.all([
          studentAPI.getMyMarks(),
          studentAPI.getMyAttendance(),
          studentAPI.getMyPerformance(),
          studentAPI.getMyNotifications(),
        ]);

      setMarks(marksRes.data || []);
      setAttendance(attendanceRes.data || []);
      setPerformance(performanceRes.data || null);
      setNotifications(notificationsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await studentAPI.markNotificationRead(id);
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  // Prepare chart data
  const subjectPerformanceData =
    performance?.subject_wise?.map((s) => ({
      subject: s.subject_name,
      average: Number(s.average_percentage || 0),
    })) || [];

  const examTypeData =
    performance?.exam_wise?.map((e) => ({
      type: e.exam_type,
      average: parseFloat(e.average_percentage || 0).toFixed(1),
    })) || [];

  const attendanceData = [
    { name: "Present", value: performance?.attendance?.present_days || 0 },
    { name: "Absent", value: performance?.attendance?.absent_days || 0 },
  ];

  // 🔥 ALL RENDER FUNCTIONS (UNCHANGED)
  const renderOverview = () => (
    <div className="overview-section">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Overall Percentage</h3>
          <div className="stat-value">
            {formatNumber(performance?.overall?.overall_percentage)}%
          </div>
        </div>
        <div className="stat-card">
          <h3>Subjects</h3>
          <div className="stat-value">
            {performance?.overall?.subjects_taken || 0}
          </div>
        </div>
        <div className="stat-card">
          <h3>Attendance</h3>
          <div className="stat-value">
            {formatNumber(performance?.attendance?.attendance_percentage)}%
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Exams</h3>
          <div className="stat-value">{marks.length}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Performance by Exam Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderMarks = () => (
    <div className="marks-section">
      <h2>My Marks</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Exam Type</th>
              <th>Marks</th>
              <th>Percentage</th>
              <th>Result</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.subject_name}</td>
                <td>{mark.exam_type}</td>
                <td>{mark.marks_obtained} / {mark.max_marks}</td>
                <td>
                  <span className={`percentage ${mark.percentage >= 50 ? "pass" : "fail"}`}>
                    {formatNumber(mark.percentage)}%
                  </span>
                </td>
                <td>
                  <span className={`result-badge ${mark.result === "Pass" ? "pass" : "fail"}`}>
                    {mark.result}
                  </span>
                </td>
                <td>{new Date(mark.exam_date).toLocaleDateString()}</td>
                <td>{mark.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="attendance-section">
      <h2>My Attendance</h2>
      <div className="attendance-summary">
        <div className="summary-card present">
          <h4>Present</h4>
          <p>{performance?.attendance?.present_days || 0} days</p>
        </div>
        <div className="summary-card absent">
          <h4>Absent</h4>
          <p>{performance?.attendance?.absent_days || 0} days</p>
        </div>
        <div className="summary-card total">
          <h4>Total</h4>
          <p>{performance?.attendance?.total_days || 0} days</p>
        </div>
        <div className="summary-card percentage">
          <h4>Percentage</h4>
          <p>{formatNumber(performance?.attendance?.attendance_percentage)}%</p>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${record.status}`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.is_read ? "read" : "unread"}`}
            onClick={() => !notification.is_read && markNotificationAsRead(notification.id)}
          >
            <div className="notification-header">
              <h4>{notification.title}</h4>
              <span className="notification-date">
                {new Date(notification.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="notification-message">{notification.message}</p>
            {!notification.is_read && <span className="unread-badge">New</span>}
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="no-data">No notifications</p>
        )}
      </div>
    </div>
  );

  // 🔥 NEW CGPA RENDER
  const renderCGPA = () => (
    <div className="cgpa-section">
      <CGPACalculator />
    </div>
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <div className="user-info">
            <span>{user?.email}</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* 🔥 UPDATED TABS WITH CGPA */}
      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === "marks" ? "active" : ""}`}
          onClick={() => setActiveTab("marks")}
        >
          📈 Marks
        </button>
        <button
          className={`tab ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          📋 Attendance
        </button>
        <button
          className={`tab ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          🔔 Notifications
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </button>
        {/* 🔥 NEW CGPA TAB */}
        <button
          className={`tab ${activeTab === "cgpa" ? "active" : ""}`}
          onClick={() => setActiveTab("cgpa")}
        >
          🧮 CGPA Calculator
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "marks" && renderMarks()}
        {activeTab === "attendance" && renderAttendance()}
        {activeTab === "notifications" && renderNotifications()}
        {/* 🔥 NEW CGPA TAB CONTENT */}
        {activeTab === "cgpa" && renderCGPA()}
      </div>
    </div>
  );
}

export default StudentDashboard;
