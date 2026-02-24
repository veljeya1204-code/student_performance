// // frontend/src/dashboards/ParentDashboard.js
// import React, { useEffect, useState } from "react";
// import { parentAPI } from "../api"; // fixed import path
// import "./ParentDashboard.css"; // use your CSS file

// function ParentDashboard({ user, onLogout }) {
//   const [children, setChildren] = useState([]);
//   const [selectedChild, setSelectedChild] = useState(null);
//   const [marks, setMarks] = useState([]);
//   const [attendance, setAttendance] = useState({ records: [], summary: {} });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const formatNumber = (value) => {
//   if (value === null || value === undefined || isNaN(value)) return "0.0";
//   return Number(value).toFixed(1);
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setError("");
//       const childrenRes = await parentAPI.getMyChildren();
//       const childrenData = childrenRes.data || [];
//       setChildren(childrenData);

//       if (childrenData.length > 0) {
//         const childId = childrenData[0].id;
//         setSelectedChild(childId);
//         await loadChildData(childId);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadChildData = async (childId) => {
//     try {
//       const [marksRes, attendanceRes] = await Promise.all([
//         parentAPI.getChildMarks(childId),
//         parentAPI.getChildAttendance(childId),
//       ]);
//       setMarks(marksRes.data || []);
//       setAttendance(attendanceRes.data || { records: [], summary: {} });
//     } catch (error) {
//       console.error("Child data error:", error);
//     }
//   };

//   const handleChildSelect = async (childId) => {
//     setSelectedChild(childId);
//     await loadChildData(childId);
//   };

//   if (loading) {
//     return (
//       <div className="dashboard">
//         <div className="loading">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <h1>Parent Dashboard</h1>
//           <div className="user-info">
//             <span>{user?.email}</span>
//             <button onClick={onLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {error && <div className="error-banner">{error}</div>}

//       <div className="dashboard-content">
//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>My Children</h3>
//             <div className="stat-value">{children.length}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Attendance</h3>
//             <div className="stat-value">
//              {selectedChild
//               ? `${formatNumber(attendance?.summary?.attendance_percentage)}%`
//              : "—"}
//            </div>
//           </div>
//           <div className="stat-card">
//             <h3>Total Marks Entries</h3>
//             <div className="stat-value">{marks.length}</div>
//           </div>
//         </div>

//         {/* Children Selection */}
//         {children.length > 0 && (
//           <div className="child-selector">
//             <h2>Select Child</h2>
//             <div className="children-grid">
//               {children.map((child) => (
//                 <button
//                   key={child.id}
//                   className={`child-card ${
//                     selectedChild === child.id ? "selected" : ""
//                   }`}
//                   onClick={() => handleChildSelect(child.id)}
//                 >
//                   <h4>{`${child.first_name} ${child.last_name}`}</h4>
//                   <p>{`${child.class_name}${child.section ? ` - ${child.section}` : ""}`}</p>
//                   <p>{child.relationship || "Student"}</p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Children Table */}
//         <div className="marks-section">
//           <h2>My Children</h2>
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Class</th>
//                   <th>Relationship</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {children.map((child) => (
//                   <tr
//                     key={child.id}
//                     className={
//                       selectedChild === child.id ? "selected-child" : ""
//                     }
//                     onClick={() => handleChildSelect(child.id)}
//                   >
//                     <td>{`${child.first_name} ${child.last_name}`}</td>
//                     <td>{child.class_name} {child.section}</td>
//                     <td>{child.relationship}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Recent Marks */}
//         <div className="marks-section">
//           <h2>Recent Marks {selectedChild && " (Selected Child)"}</h2>
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Subject</th>
//                   <th>Exam Type</th>
//                   <th>Marks</th>
//                   <th>Percentage</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {marks.slice(0, 10).map((mark) => (
//                   <tr key={mark.id}>
//                     <td>{mark.subject_name}</td>
//                     <td>{mark.exam_type}</td>
//                     <td>
//                       {mark.marks_obtained} / {mark.max_marks}
//                     </td>
//                     <td>
//                       <span
//                         className={`percentage ${
//                           mark.percentage >= 50 ? "pass" : "fail"
//                         }`}
//                       >
//                         {formatNumber(mark.percentage)}%
//                       </span>
//                     </td>
//                     <td>
//                       {new Date(mark.exam_date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ParentDashboard;
// // function ParentDashboard({ user, onLogout }) {
// //   const [children, setChildren] = useState([]);
// //   const [selectedChild, setSelectedChild] = useState(null);
// //   const [marks, setMarks] = useState([]);
// //   const [attendance, setAttendance] = useState({ records: [], summary: {} });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // ✅ HELPER FUNCTIONS (Fix all ESLint errors)
// //   const getSelectedChildName = () => {
// //     const child = children.find(c => c.id === selectedChild);
// //     return child ? `${child.first_name} ${child.last_name}` : '';
// //   };

// //   const getOverallAttendance = () => {
// //     return children.reduce((avg, child) => {
// //       return avg + (child.attendance || 0);
// //     }, 0) / Math.max(children.length, 1);
// //   };

// //   const getAvgGrade = () => {
// //     if (!selectedChild || marks.length === 0) return 0;
// //     return marks.reduce((avg, mark) => avg + (mark.percentage || 0), 0) / marks.length;
// //   };

// //   const getRecentMarksCount = () => {
// //     return marks.filter(mark => 
// //       new Date(mark.exam_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
// //     ).length;
// //   };

// //   const getAttendanceClass = (attendance) => {
// //     if (!attendance) return 'average';
// //     if (attendance >= 90) return 'excellent';
// //     if (attendance >= 75) return 'good';
// //     if (attendance >= 50) return 'average';
// //     return 'poor';
// //   };

// //   // ✅ Your existing functions...
// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setError("");
// //       const childrenRes = await parentAPI.getMyChildren();
// //       const childrenData = childrenRes.data || [];
// //       setChildren(childrenData);

// //       if (childrenData.length > 0) {
// //         const childId = childrenData[0].id;
// //         setSelectedChild(childId);
// //         await loadChildData(childId);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setError("Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadChildData = async (childId) => {
// //     try {
// //       const [marksRes, attendanceRes] = await Promise.all([
// //         parentAPI.getChildMarks(childId),
// //         parentAPI.getChildAttendance(childId),
// //       ]);
// //       setMarks(marksRes.data || []);
// //       setAttendance(attendanceRes.data || { records: [], summary: {} });
// //     } catch (error) {
// //       console.error("Child data error:", error);
// //     }
// //   };

// //   const handleChildSelect = async (childId) => {
// //     setSelectedChild(childId);
// //     await loadChildData(childId);
// //   };

// //   // ✅ JSX RENDER (Your beautiful new structure)
// //   if (loading) {
// //     return (
// //       <div className="dashboard">
// //         <div className="loading">Loading family data...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="parent-dashboard">
// //       {/* HERO HEADER */}
// //       <header className="dashboard-header">
// //         <div className="header-content">
// //           <h1>👨‍👩‍👧‍👦 Family Dashboard</h1>
// //           <div className="user-info">
// //             <span className="user-name">{user?.email}</span>
// //             <button onClick={onLogout} className="logout-btn">
// //               🚪 Logout
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {error && <div className="error-banner">{error}</div>}

// //       <main className="dashboard-content">
// //         {/* HERO STATS */}
// //         <section className="hero-stats">
// //           <div className="stats-grid">
// //             <div className="stat-card primary">
// //               <div className="stat-icon">👨‍👩‍👧‍👦</div>
// //               <h3>My Children</h3>
// //               <div className="stat-value">{children.length}</div>
// //             </div>
// //             <div className="stat-card">
// //               <div className="stat-icon">📊</div>
// //               <h3>Average Attendance</h3>
// //               <div className="stat-value">
// //                 {getOverallAttendance().toFixed(1)}%
// //               </div>
// //             </div>
// //             <div className="stat-card">
// //               <div className="stat-icon">⭐</div>
// //               <h3>Total Marks</h3>
// //               <div className="stat-value">{marks.length}</div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* CHILD SELECTION */}
// //         {children.length > 0 && (
// //           <section className="child-hero-selector">
// //             <h2 className="section-title">❤️ Select Your Child</h2>
// //             <div className="children-hero-grid">
// //               {children.map((child) => (
// //                 <div
// //                   key={child.id}
// //                   className={`child-hero-card ${selectedChild === child.id ? "selected" : ""}`}
// //                   onClick={() => handleChildSelect(child.id)}
// //                 >
// //                   <div className="child-avatar">
// //                     {child.first_name.charAt(0)}{child.last_name.charAt(0)}
// //                   </div>
// //                   <div className="child-info">
// //                     <h3>{`${child.first_name} ${child.last_name}`}</h3>
// //                     <p className="child-class">{`${child.class_name}${child.section ? `-${child.section}` : ""}`}</p>
// //                     <p className="child-role">{child.relationship}</p>
// //                   </div>
// //                   {selectedChild === child.id && <div className="selected-glow"></div>}
// //                 </div>
// //               ))}
// //             </div>
// //           </section>
// //         )}

// //         {/* SELECTED CHILD QUICK STATS */}
// //         {selectedChild && (
// //           <section className="quick-stats">
// //             <h2 className="section-title">{getSelectedChildName()}'s Performance</h2>
// //             <div className="quick-stats-grid">
// //               <div className="quick-stat-card">
// //                 <span className="stat-label">Attendance</span>
// //                 <span className="stat-number">{`${attendance.summary?.attendance_percentage?.toFixed(1) || 0}%`}</span>
// //               </div>
// //               <div className="quick-stat-card">
// //                 <span className="stat-label">Avg Grade</span>
// //                 <span className="stat-number">{getAvgGrade().toFixed(1)}%</span>
// //               </div>
// //               <div className="quick-stat-card">
// //                 <span className="stat-label">Recent Marks (30d)</span>
// //                 <span className="stat-number">{getRecentMarksCount()}</span>
// //               </div>
// //             </div>
// //           </section>
// //         )}

// //         {/* DUAL TABLES */}
// //         <div className="dual-tables">
// //           <section className="overview-table">
// //             <h2 className="section-title-small">👥 All Children Overview</h2>
// //             <div className="table-container">
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Class</th>
// //                     <th>Attendance</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {children.map((child) => (
// //                     <tr
// //                       key={child.id}
// //                       className={`table-row ${selectedChild === child.id ? "selected-child" : ""}`}
// //                       onClick={() => handleChildSelect(child.id)}
// //                     >
// //                       <td className="child-name">
// //                         <span className="name-initials">{child.first_name.charAt(0)}{child.last_name.charAt(0)}</span>
// //                         {`${child.first_name} ${child.last_name}`}
// //                       </td>
// //                       <td>{`${child.class_name}${child.section ? `-${child.section}` : ""}`}</td>
// //                       <td>
// //                         <span className={`attendance-badge ${getAttendanceClass(child.attendance || 0)}`}>
// //                           {(child.attendance || 0).toFixed(1)}%
// //                         </span>
// //                       </td>
// //                       <td><button className="view-btn">View →</button></td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </section>

// //           {/* RECENT MARKS */}
// //           {selectedChild && (
// //             <section className="marks-table">
// //               <h2 className="section-title-small">📚 Recent Marks</h2>
// //               <div className="table-container">
// //                 <table className="data-table">
// //                   <thead>
// //                     <tr>
// //                       <th>Subject</th>
// //                       <th>Exam</th>
// //                       <th>Marks</th>
// //                       <th>%</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {marks.slice(0, 8).map((mark) => (
// //                       <tr key={mark.id}>
// //                         <td>{mark.subject_name}</td>
// //                         <td>{mark.exam_type}</td>
// //                         <td>{mark.marks_obtained}/{mark.max_marks}</td>
// //                         <td>
// //                           <span className={`percentage-badge ${mark.percentage >= 50 ? "pass" : "fail"}`}>
// //                             {mark.percentage?.toFixed(1)}%
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </section>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // export default ParentDashboard;

// // // frontend/src/dashboards/ParentDashboard.js
// // // COMPLETE PRODUCTION-READY FAMILY DASHBOARD 2026 ✨👨‍👩‍👧‍👦
// // import React, { useEffect, useState } from "react";
// // import { parentAPI } from "../api";
// // import "./ParentDashboard.css";

// // function ParentDashboard({ user, onLogout }) {
// //   const [children, setChildren] = useState([]);
// //   const [selectedChild, setSelectedChild] = useState(null);
// //   const [marks, setMarks] = useState([]);
// //   const [attendance, setAttendance] = useState({ records: [], summary: {} });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // ✅ ALL HELPER FUNCTIONS (Zero ESLint errors)
// //   const getSelectedChildName = () => {
// //     const child = children.find(c => c.id === selectedChild);
// //     return child ? `${child.first_name} ${child.last_name}` : '';
// //   };

// //   const getOverallAttendance = () => {
// //     return children.reduce((avg, child) => {
// //       return avg + (child.attendance || 0);
// //     }, 0) / Math.max(children.length, 1);
// //   };

// //   const getAvgGrade = () => {
// //     if (!selectedChild || marks.length === 0) return 0;
// //     return marks.reduce((avg, mark) => avg + (mark.percentage || 0), 0) / marks.length;
// //   };

// //   const getRecentMarksCount = () => {
// //     const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
// //     return marks.filter(mark => 
// //       new Date(mark.exam_date) > new Date(thirtyDaysAgo)
// //     ).length;
// //   };

// //   const getAttendanceClass = (percentage) => {
// //     const p = parseFloat(percentage || 0);
// //     if (p >= 90) return 'excellent';
// //     if (p >= 75) return 'good';
// //     if (p >= 50) return 'average';
// //     return 'poor';
// //   };

// //   useEffect(() => {
// //     if (!localStorage.getItem('token')) {
// //       onLogout();
// //       return;
// //     }
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setError("");
// //       setLoading(true);
// //       const childrenRes = await parentAPI.getMyChildren();
// //       const childrenData = childrenRes.data || [];
// //       setChildren(childrenData);

// //       if (childrenData.length > 0) {
// //         const childId = childrenData[0].id;
// //         setSelectedChild(childId);
// //         await loadChildData(childId);
// //       }
// //     } catch (error) {
// //       console.error("Family data error:", error);
// //       if (error.response?.status === 401) {
// //         localStorage.removeItem('token');
// //         onLogout();
// //       } else {
// //         setError("Failed to load family data");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadChildData = async (childId) => {
// //     try {
// //       const [marksRes, attendanceRes] = await Promise.all([
// //         parentAPI.getChildMarks(childId),
// //         parentAPI.getChildAttendance(childId),
// //       ]);
// //       setMarks(marksRes.data || []);
// //       setAttendance(attendanceRes.data || { records: [], summary: {} });
// //     } catch (error) {
// //       console.error("Child data error:", error);
// //     }
// //   };

// //   const handleChildSelect = async (childId) => {
// //     setSelectedChild(childId);
// //     await loadChildData(childId);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="parent-dashboard">
// //         <header className="dashboard-header">
// //           <div className="header-content">
// //             <h1>👨‍👩‍👧‍👦 Loading Family...</h1>
// //           </div>
// //         </header>
// //         <div className="loading-spinner">🔄</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="parent-dashboard">
// //       {/* HERO HEADER */}
// //       <header className="dashboard-header">
// //         <div className="header-content">
// //           <div className="header-left">
// //             <h1>👨‍👩‍👧‍👦 Family Dashboard</h1>
// //             <span className="quick-info">
// //               {children.length} Children • {marks.length} Marks
// //             </span>
// //           </div>
// //           <div className="user-info">
// //             <span>{user?.email}</span>
// //             <button onClick={onLogout} className="logout-btn">🚪 Logout</button>
// //           </div>
// //         </div>
// //       </header>

// //       {error && <div className="error-banner">{error}</div>}

// //       <main className="dashboard-content">
// //         {/* HERO STATS */}
// //         <section className="hero-stats">
// //           <div className="stats-grid">
// //             <div className="stat-card primary">
// //               <div className="stat-icon">👨‍👩‍👧‍👦</div>
// //               <h3>My Children</h3>
// //               <div className="stat-value">{children.length}</div>
// //             </div>
// //             <div className="stat-card">
// //               <div className="stat-icon">📊</div>
// //               <h3>Avg Attendance</h3>
// //               <div className="stat-value">{getOverallAttendance().toFixed(1)}%</div>
// //             </div>
// //             <div className="stat-card">
// //               <div className="stat-icon">⭐</div>
// //               <h3>Avg Grade</h3>
// //               <div className="stat-value">{getAvgGrade().toFixed(1)}%</div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* CHILD HERO SELECTOR */}
// //         {children.length > 0 ? (
// //           <section className="child-hero-selector">
// //             <h2 className="section-title">❤️ Select Child</h2>
// //             <div className="children-hero-grid">
// //               {children.map((child) => (
// //                 <div
// //                   key={child.id}
// //                   className={`child-hero-card ${selectedChild === child.id ? "selected" : ""}`}
// //                   onClick={() => handleChildSelect(child.id)}
// //                 >
// //                   <div className="child-avatar">
// //                     {child.first_name?.charAt(0)}{child.last_name?.charAt(0)}
// //                   </div>
// //                   <div className="child-info">
// //                     <h3>{`${child.first_name || '?'} ${child.last_name || ''}`}</h3>
// //                     <p>{`${child.class_name || ''}${child.section ? `-${child.section}` : ''}`}</p>
// //                     <p>{child.relationship || 'Student'}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>
// //         ) : (
// //           <div className="no-data">No children found 😔</div>
// //         )}

// //         {/* DUAL TABLES */}
// //         <div className="dual-tables">
// //           {/* CHILDREN OVERVIEW */}
// //           <section className="overview-table">
// //             <h2>👥 All Children</h2>
// //             <div className="table-container">
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Name</th>
// //                     <th>Class</th>
// //                     <th>Relationship</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {children.map((child) => (
// //                     <tr
// //                       key={child.id}
// //                       className={selectedChild === child.id ? "selected-child" : ""}
// //                       onClick={() => handleChildSelect(child.id)}
// //                     >
// //                       <td>{`${child.first_name || '?'} ${child.last_name || ''}`}</td>
// //                       <td>{child.class_name} {child.section}</td>
// //                       <td>{child.relationship}</td>
// //                       <td><button className="view-btn">View</button></td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </section>

// //           {/* RECENT MARKS */}
// //           {selectedChild && (
// //             <section className="marks-table">
// //               <h2>📚 Recent Marks</h2>
// //               <div className="table-container">
// //                 <table className="data-table">
// //                   <thead>
// //                     <tr>
// //                       <th>Subject</th>
// //                       <th>Exam</th>
// //                       <th>Marks</th>
// //                       <th>%</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {marks.slice(0, 8).map((mark) => (
// //                       <tr key={mark.id}>
// //                         <td>{mark.subject_name}</td>
// //                         <td>{mark.exam_type}</td>
// //                         <td>{mark.marks_obtained}/{mark.max_marks}</td>
// //                         <td>
// //                           <span className={`percentage ${mark.percentage >= 50 ? "pass" : "fail"}`}>
// //                             {mark.percentage?.toFixed(1)}%
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </section>
// //           )}
// //         </div>

// //         <div className="refresh-section">
// //           <button onClick={fetchData} className="refresh-btn">🔄 Refresh Data</button>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default ParentDashboard;
// frontend/src/dashboards/ParentDashboard.js
import React, { useEffect, useState } from "react";
import { parentAPI } from "../api";
import "./ParentDashboard.css";

function ParentDashboard({ user, onLogout }) {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState({ records: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatNumber = (value) => {
    if (value === null || value === undefined || isNaN(value)) return "0.0";
    return Number(value).toFixed(1);
  };

  const getAttendanceBadge = (percentage) => {
    if (!percentage) return 'average';
    if (percentage >= 90) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 60) return 'average';
    return 'poor';
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError("");
      const childrenRes = await parentAPI.getMyChildren();
      const childrenData = childrenRes.data || [];
      setChildren(childrenData);

      if (childrenData.length > 0) {
        const childId = childrenData[0].id;
        setSelectedChild(childId);
        await loadChildData(childId);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadChildData = async (childId) => {
    try {
      const [marksRes, attendanceRes] = await Promise.all([
        parentAPI.getChildMarks(childId),
        parentAPI.getChildAttendance(childId),
      ]);
      setMarks(marksRes.data || []);
      setAttendance(attendanceRes.data || { records: [], summary: {} });
    } catch (error) {
      console.error("Child data error:", error);
    }
  };

  const handleChildSelect = async (childId) => {
    setSelectedChild(childId);
    await loadChildData(childId);
  };

  const getChildInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="parent-dashboard">
        <div className="loading-spinner">👨‍👩‍👧‍👦 Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="parent-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>👨‍👩‍👧‍👦 Parent Dashboard</h1>
            <span className="quick-info">Welcome back, {user?.first_name || 'Parent'}</span>
          </div>
          <div className="user-info">
            <span>{user?.email}</span>
            <button onClick={onLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      <div className="dashboard-content">
        {/* Hero Stats */}
        <section className="hero-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍👩‍👧‍👦</div>
              <h3>My Children</h3>
              <div className="stat-value">{children.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <h3>Average Attendance</h3>
              <div className="stat-value">
                {selectedChild
                  ? `${formatNumber(attendance?.summary?.attendance_percentage || 0)}%`
                  : "—"}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <h3>Total Marks</h3>
              <div className="stat-value">{marks.length}</div>
            </div>
            <div className="stat-card primary">
              <div>
                <h3>Selected Child</h3>
                <div className="stat-value">
                  {selectedChild 
                    ? children.find(c => c.id === selectedChild)?.first_name || 'None'
                    : 'Select a child'}
                </div>
              </div>
              <div className="stat-icon" style={{ fontSize: '3.5rem' }}>⭐</div>
            </div>
          </div>
        </section>

        {/* Child Hero Selector */}
        {children.length > 0 && (
          <section className="child-hero-selector">
            <h2 className="section-title-small">👶 Select Your Child</h2>
            <div className="children-hero-grid">
              {children.map((child) => (
                <div
                  key={child.id}
                  className={`child-hero-card ${selectedChild === child.id ? 'selected' : ''}`}
                  onClick={() => handleChildSelect(child.id)}
                >
                  <div className="child-avatar">
                    {getChildInitials(`${child.first_name} ${child.last_name}`)}
                  </div>
                  <div className="child-info">
                    <h3>{`${child.first_name} ${child.last_name}`}</h3>
                    <p>{`${child.class_name}${child.section ? ` - ${child.section}` : ''}`}</p>
                    <p>{child.relationship || 'Student'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dual Tables Layout */}
        <div className="dual-tables">
          {/* Children Overview Table */}
          <section className="overview-table">
            <h2 className="section-title-small">📚 All Children</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Child</th>
                    <th>Class</th>
                    <th>Relationship</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {children.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="no-data">
                        No children found 😔
                      </td>
                    </tr>
                  ) : (
                    children.map((child) => {
                      const att = attendance.summary || {};
                      return (
                        <tr
                          key={child.id}
                          className={`table-row ${selectedChild === child.id ? 'selected-child' : ''}`}
                          onClick={() => handleChildSelect(child.id)}
                        >
                          <td className="child-name">
                            <div className="name-initials">
                              {getChildInitials(`${child.first_name} ${child.last_name}`)}
                            </div>
                            {`${child.first_name} ${child.last_name}`}
                          </td>
                          <td>{`${child.class_name}${child.section ? ` - ${child.section}` : ''}`}</td>
                          <td>{child.relationship || 'Student'}</td>
                          <td>
                            <span className={`attendance-badge ${getAttendanceBadge(att.attendance_percentage)}`}>
                              {formatNumber(att.attendance_percentage || 0)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Marks Table */}
          <section className="marks-table">
            <h2 className="section-title-small">
              📈 Recent Marks {selectedChild && "(Selected)"}
            </h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Exam</th>
                    <th>Marks</th>
                    <th>%</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No marks data yet 📝
                      </td>
                    </tr>
                  ) : (
                    marks.slice(0, 10).map((mark) => (
                      <tr key={mark.id}>
                        <td>{mark.subject_name}</td>
                        <td>{mark.exam_type}</td>
                        <td>{mark.marks_obtained}/{mark.max_marks}</td>
                        <td>
                          <span
                            className={`percentage-badge ${
                              mark.percentage >= 50 ? "pass" : "fail"
                            }`}
                          >
                            {formatNumber(mark.percentage)}%
                          </span>
                        </td>
                        <td>{new Date(mark.exam_date).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Refresh Section */}
        <section className="refresh-section">
          <button onClick={fetchData} className="refresh-btn">
            🔄 Refresh All Data
          </button>
        </section>
      </div>
    </div>
  );
}

export default ParentDashboard;
// import React, { useEffect, useState } from "react";
// import { parentAPI } from "../api";
// import "./ParentDashboard.css";

// function ParentDashboard({ user, onLogout }) {
//   const [children, setChildren] = useState([]);
//   const [selectedChild, setSelectedChild] = useState(null);
//   const [marks, setMarks] = useState([]);
//   const [childAttendances, setChildAttendances] = useState({});
//   const [activeNav, setActiveNav] = useState('profile'); // FIXED: Nav state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const formatNumber = (value) => {
//     if (value === null || value === undefined || isNaN(value)) return "0.0";
//     return Number(value).toFixed(1);
//   };

//   const getAttendanceBadge = (percentage) => {
//     if (!percentage) return 'average';
//     if (percentage >= 90) return 'excellent';
//     if (percentage >= 75) return 'good';
//     if (percentage >= 60) return 'average';
//     return 'poor';
//   };

//   // FIXED: Nav handlers
//   const handleNavClick = (navKey) => {
//     setActiveNav(navKey);
//     console.log(`Nav clicked: ${navKey}`);
//   };

//   const handleLogout = () => {
//     onLogout();
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setError("");
//       const childrenRes = await parentAPI.getMyChildren();
//       const childrenData = childrenRes.data || [];
//       setChildren(childrenData);

//       if (childrenData.length > 0) {
//         const childId = childrenData[0].id;
//         setSelectedChild(childId);
//         await loadChildData(childId);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadChildData = async (childId) => {
//     try {
//       const [marksRes, attendanceRes] = await Promise.all([
//         parentAPI.getChildMarks(childId),
//         parentAPI.getChildAttendance(childId),
//       ]);
      
//       setMarks(marksRes.data || []);
//       setChildAttendances(prev => ({
//         ...prev,
//         [childId]: attendanceRes.data || { records: [], summary: {} }
//       }));
//     } catch (error) {
//       console.error("Child data error:", error);
//     }
//   };

//   const handleChildSelect = async (childId) => {
//     setSelectedChild(childId);
//     await loadChildData(childId);
//   };

//   const getChildInitials = (name) => {
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   if (loading) {
//     return (
//       <div className="loading-overlay">
//         <div className="loading-spinner">👨‍👩‍👧‍👦 Loading your dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="parent-dashboard">
//       {/* FIXED: Working Sidebar */}
//       <aside className="pd-sidebar">
//         <h2 className="pd-sidebar-title">DASHBOARD</h2>
        
//         <nav className="pd-nav">
//           <button 
//             className={`pd-nav-item ${activeNav === 'profile' ? 'active' : ''}`}
//             onClick={() => handleNavClick('profile')}
//           >
//             👤 Profile
//           </button>
//           <button 
//             className={`pd-nav-item ${activeNav === 'student' ? 'active' : ''}`}
//             onClick={() => handleNavClick('student')}
//           >
//             📊 Student Data
//           </button>
//           <button 
//             className={`pd-nav-item ${activeNav === 'attendance' ? 'active' : ''}`}
//             onClick={() => handleNavClick('attendance')}
//           >
//             📈 Attendance Report
//           </button>
//           <button 
//             className={`pd-nav-item ${activeNav === 'marks' ? 'active' : ''}`}
//             onClick={() => handleNavClick('marks')}
//           >
//             📋 Marks Report
//           </button>
//         </nav>

//         <div className="pd-user-info">
//           <span>{user?.first_name || 'Parent'}</span>
//           <span className="pd-email">{user?.email}</span>
//         </div>

//         <button onClick={handleLogout} className="pd-logout">
//           🚪 Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="pd-main">
//         {error && (
//           <div className="error-banner">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Header */}
//         <header className="pd-main-header">
//           <h1 className="pd-title">PARENT DASHBOARD</h1>
//           <div className="pd-date">
//             <span>Date:</span> 
//             <strong>{new Date().toISOString().slice(0, 10)}</strong>
//           </div>
//         </header>

//         {/* Nav-based Content Sections */}
//         <div className="pd-content">
//           {activeNav === 'profile' && (
//             <section className="pd-section">
//               <h2 className="pd-section-title">👤 Profile Overview</h2>
//               <div className="pd-stats-grid">
//                 <div className="pd-stat-card">
//                   <div className="pd-stat-icon">👨‍👩‍👧‍👦</div>
//                   <h3>Total Children</h3>
//                   <div className="pd-stat-value">{children.length}</div>
//                 </div>
//                 <div className="pd-stat-card">
//                   <div className="pd-stat-icon">📊</div>
//                   <h3>Avg Attendance</h3>
//                   <div className="pd-stat-value">
//                     {children.length > 0 
//                       ? formatNumber(
//                           children.reduce((sum, child) => {
//                             const att = childAttendances[child.id]?.summary?.attendance_percentage || 0;
//                             return sum + att;
//                           }, 0) / children.length
//                         ) + '%'
//                       : '0%'
//                     }
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}

//           {activeNav === 'student' && (
//             <section className="pd-section">
//               <h2 className="pd-section-title">👶 Select Your Child</h2>
//               <div className="pd-children-grid">
//                 {children.map((child) => (
//                   <div
//                     key={child.id}
//                     className={`pd-child-card ${selectedChild === child.id ? 'active' : ''}`}
//                     onClick={() => handleChildSelect(child.id)}
//                   >
//                     <div className="pd-child-avatar">
//                       {getChildInitials(`${child.first_name} ${child.last_name}`)}
//                     </div>
//                     <div className="pd-child-info">
//                       <h3>{child.first_name}</h3>
//                       <p>{`${child.class_name}${child.section ? ` - ${child.section}` : ''}`}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {(activeNav === 'attendance' || activeNav === 'marks') && (
//             <div className="pd-tables-grid">
//               {/* Recent Marks Table */}
//               <section className="pd-table-card">
//                 <h2 className="pd-section-title-small">
//                   📈 Recent Marks {selectedChild && "(Selected)"}
//                 </h2>
//                 <div className="table-container">
//                   <table className="data-table">
//                     <thead>
//                       <tr>
//                         <th>Subject</th>
//                         <th>Exam</th>
//                         <th>Marks</th>
//                         <th>%</th>
//                         <th>Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {marks.length === 0 ? (
//                         <tr>
//                           <td colSpan="5" className="no-data">No marks data yet 📝</td>
//                         </tr>
//                       ) : (
//                         marks.slice(0, 10).map((mark) => (
//                           <tr key={mark.id}>
//                             <td>{mark.subject_name}</td>
//                             <td>{mark.exam_type}</td>
//                             <td>{mark.marks_obtained}/{mark.max_marks}</td>
//                             <td>
//                               <span className={`badge percentage-badge ${mark.percentage >= 50 ? "pass" : "fail"}`}>
//                                 {formatNumber(mark.percentage)}%
//                               </span>
//                             </td>
//                             <td>{new Date(mark.exam_date).toLocaleDateString('en-IN')}</td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>

//               {/* FIXED Attendance Table */}
//               <section className="pd-table-card">
//                 <h2 className="pd-section-title-small">📊 Attendance Summary</h2>
//                 <div className="table-container">
//                   <table className="data-table">
//                     <thead>
//                       <tr>
//                         <th>Child</th>
//                         <th>Class</th>
//                         <th>Attendance</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {children.length === 0 ? (
//                         <tr>
//                           <td colSpan="4" className="no-data">No children found 😔</td>
//                         </tr>
//                       ) : (
//                         children.map((child) => {
//                           const childAtt = childAttendances[child.id]?.summary || {};
//                           return (
//                             <tr
//                               key={child.id}
//                               className={selectedChild === child.id ? 'active-row' : ''}
//                               onClick={() => handleChildSelect(child.id)}
//                             >
//                               <td>
//                                 <div className="child-name">
//                                   <div className="name-initials">
//                                     {getChildInitials(`${child.first_name} ${child.last_name}`)}
//                                   </div>
//                                   {child.first_name}
//                                 </div>
//                               </td>
//                               <td>{`${child.class_name}${child.section ? ` - ${child.section}` : ''}`}</td>
//                               <td>
//                                 <span className={`badge attendance-badge ${getAttendanceBadge(childAtt.attendance_percentage)}`}>
//                                   {formatNumber(childAtt.attendance_percentage || 0)}%
//                                 </span>
//                               </td>
//                               <td>Active</td>
//                             </tr>
//                           );
//                         })
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </section>
//             </div>
//           )}
//         </div>

//         <section className="pd-actions">
//           <button onClick={fetchData} className="pd-refresh-btn">
//             🔄 Refresh All Data
//           </button>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default ParentDashboard;
