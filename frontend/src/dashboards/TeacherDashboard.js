// // frontend/src/dashboards/TeacherDashboard.js
// import React, { useState, useEffect } from "react";
// import { teacherAPI, adminAPI } from "../api"; // fixed import path
// import "./TeacherDashboard.css";

// // function TeacherDashboard({ user, onLogout }) {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [classes, setClasses] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState(null);
// //   const [performance, setPerformance] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setError("");
// //       const classesRes = await adminAPI.getClasses();
// //       const classesData = classesRes.data || [];
// //       setClasses(classesData);

// //       if (classesData.length > 0) {
// //         const classId = classesData[0].id;
// //         setSelectedClass(classId);
// //         const perfRes = await teacherAPI.getClassPerformance(classId);
// //         setPerformance(perfRes.data || []);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setError("Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  

// //   const loadClassPerformance = async (classId) => {
// //     try {
// //       setLoading(true);
// //       const perfRes = await teacherAPI.getClassPerformance(classId);
// //       setPerformance(perfRes.data || []);
// //     } catch (error) {
// //       console.error("Class performance error:", error);
// //       setError("Failed to load class performance");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleClassSelect = async (classId) => {
// //     setSelectedClass(classId);
// //     await loadClassPerformance(classId);
// //   };
  
// //   if (loading && activeTab === "overview") {
// //     return (
// //       <div className="dashboard">
// //         <div className="loading">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //   <div className="teacher-dashboard">
// //     {/* HERO HEADER */}
// //     <header className="dashboard-header">
// //       <div className="header-content">
// //         <div className="header-left">
// //           <h1> Teacher Dashboard</h1>
// //           <span className="quick-info">
// //             {classes.length} Classes • {totalStudents} Students
// //           </span>
// //         </div>
// //         <div className="user-info">
// //           <span>{user?.email}</span>
// //           <button onClick={onLogout} className="logout-btn">Logout</button>
// //         </div>
// //       </div>
// //     </header>

// //     {error && <div className="error-banner">{error}</div>}

// //     {/* TABS */}
// //     <nav className="dashboard-tabs">
// //       <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
// //          Overview
// //       </button>
// //       <button className={`tab ${activeTab === "marks" ? "active" : ""}`} onClick={() => setActiveTab("marks")}>
// //          Marks Entry
// //       </button>
// //       <button className={`tab ${activeTab === "attendance" ? "active" : ""}`} onClick={() => setActiveTab("attendance")}>
// //          Attendance
// //       </button>
// //     </nav>

// //     <main className="dashboard-content">
// //       {/* HERO STATS */}
// //       <section className="hero-stats">
// //         <div className="stats-grid">
// //           <div className="stat-card primary">
// //             <div className="stat-icon">📚</div>
// //             <h3>Total Classes</h3>
// //             <div className="stat-value">{classes.length}</div>
// //             <div className="stat-subtitle">Active classes this term</div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">👥</div>
// //             <h3>Class Size</h3>
// //             <div className="stat-value">
// //               {selectedClass ? performance.length : '—'}
// //             </div>
// //             <div className="stat-subtitle">{selectedClassName || 'Select a class'}</div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">📈</div>
// //             <h3>Avg Performance</h3>
// //             <div className="stat-value">{avgPerformance}%</div>
// //             <div className="stat-subtitle">Class average</div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* CLASS SELECTOR - FULL HERO */}
// //       {classes.length > 0 && (
// //         <section className="class-hero-selector">
// //           <h2 className="section-title">📖 Choose Class to Manage</h2>
// //           <div className="classes-hero-grid">
// //             {classes.map((cls) => (
// //               <div
// //                 key={cls.id}
// //                 className={`class-hero-card ${selectedClass === cls.id ? "selected" : ""}`}
// //                 onClick={() => handleClassSelect(cls.id)}
// //               >
// //                 <div className="class-icon">{cls.class_name.charAt(0)}</div>
// //                 <div className="class-details">
// //                   <h3>{cls.class_name} {cls.section}</h3>
// //                   <p className="students-count">{cls.student_count || 0} students</p>
// //                   {cls.teacher_name && <p className="teacher-name">{cls.teacher_name}</p>}
// //                 </div>
// //                 {selectedClass === cls.id && (
// //                   <div className="selected-indicator">
// //                     <span>✅ Selected</span>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       )}

// //       {/* CONTENT BASED ON TAB */}
// //       <section className="main-content">
// //         {activeTab === "overview" && selectedClass && (
// //           <div className="overview-panel">
// //             <div className="panel-header">
// //               <h2>📊 {selectedClassName} Performance</h2>
// //               <div className="panel-actions">
// //                 <button className="export-btn">📥 Export</button>
// //                 <button className="print-btn">🖨️ Print</button>
// //               </div>
// //             </div>
// //             <div className="table-container">
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Roll No</th>
// //                     <th>Student</th>
// //                     <th>Avg %</th>
// //                     <th>Subjects</th>
// //                     <th>Exams</th>
// //                     <th>Attendance</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {performance.map((student) => (
// //                     <tr key={student.id}>
// //                       <td className="roll-number">{student.roll_number}</td>
// //                       <td className="student-name">{student.student_name}</td>
// //                       <td>
// //                         <span className={`grade-badge ${getGradeClass(student.average_percentage)}`}>
// //                           {parseFloat(student.average_percentage || 0).toFixed(1)}%
// //                         </span>
// //                       </td>
// //                       <td>{student.subjects_taken || 0}</td>
// //                       <td>{student.total_exams || 0}</td>
// //                       <td>
// //                         <span className="attendance-ratio">
// //                           {student.present_days}/{student.total_days}
// //                         </span>
// //                       </td>
// //                       <td>
// //                         <div className="row-actions">
// //                           <button className="view-btn">👁️</button>
// //                           <button className="marks-btn">✏️</button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* MARKS ENTRY TAB */}
// //         {activeTab === "marks" && (
// //           <div className="marks-entry-panel">
// //             <div className="panel-header">
// //               <h2>✏️ Marks Entry - {selectedClassName}</h2>
// //               <div className="entry-actions">
// //                 <select className="exam-type-select">
// //                   <option>Unit Test 1</option>
// //                   <option>Quarterly</option>
// //                 </select>
// //                 <button className="bulk-entry-btn">Bulk Entry</button>
// //               </div>
// //             </div>
// //             <p className="coming-soon">Marks entry form coming soon...</p>
// //           </div>
// //         )}

// //         {/* ATTENDANCE TAB */}
// //         {activeTab === "attendance" && (
// //           <div className="attendance-panel">
// //             <div className="panel-header">
// //               <h2>📋 Attendance - {selectedClassName}</h2>
// //               <div className="attendance-actions">
// //                 <button className="today-btn">📅 Today</button>
// //                 <button className="mark-all-btn">✅ Mark All Present</button>
// //               </div>
// //             </div>
// //             <p className="coming-soon">Attendance interface coming soon...</p>
// //           </div>
// //         )}
// //       </section>
// //     </main>
// //   </div>
// // );

// // }

// // export default TeacherDashboard;
// function TeacherDashboard({ user, onLogout }) {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [performance, setPerformance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setError("");
//       const classesRes = await adminAPI.getClasses();
//       const classesData = classesRes.data || [];
//       setClasses(classesData);

//       if (classesData.length > 0) {
//         const classId = classesData[0].id;
//         setSelectedClass(classId);
//         const perfRes = await teacherAPI.getClassPerformance(classId);
//         setPerformance(perfRes.data || []);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadClassPerformance = async (classId) => {
//     try {
//       setLoading(true);
//       const perfRes = await teacherAPI.getClassPerformance(classId);
//       setPerformance(perfRes.data || []);
//     } catch (error) {
//       console.error("Class performance error:", error);
//       setError("Failed to load class performance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClassSelect = async (classId) => {
//     setSelectedClass(classId);
//     await loadClassPerformance(classId);
//   };

//   // ✅ HELPER FUNCTIONS (All included)
//   const getSelectedClassName = () => {
//     const cls = classes.find(c => c.id === selectedClass);
//     return cls ? `${cls.class_name} ${cls.section}` : '';
//   };

//   const getTotalStudents = () => {
//     return classes.reduce((total, cls) => total + (cls.student_count || 0), 0);
//   };

//   const getAvgPerformance = () => {
//     if (!selectedClass || performance.length === 0) return 0;
//     return performance.reduce((avg, student) => {
//       return avg + parseFloat(student.average_percentage || 0);
//     }, 0) / performance.length;
//   };

//   const getGradeClass = (percentage) => {
//     const p = parseFloat(percentage || 0);
//     if (p >= 90) return 'excellent';
//     if (p >= 75) return 'good';
//     if (p >= 50) return 'average';
//     return 'poor';
//   };

//   if (loading && activeTab === "overview") {
//     return (
//       <div className="dashboard">
//         <div className="loading">Loading classes...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="teacher-dashboard">
//       {/* HERO HEADER */}
//       <header className="dashboard-header">
//         <div className="header-content">
//           <div className="header-left">
//             <h1>👨‍🏫 Teacher Dashboard</h1>
//             <span className="quick-info">
//               {classes.length} Classes • {getTotalStudents()} Students
//             </span>
//           </div>
//           <div className="user-info">
//             <span>{user?.email}</span>
//             <button onClick={onLogout} className="logout-btn">Logout</button>
//           </div>
//         </div>
//       </header>

//       {error && <div className="error-banner">{error}</div>}

//       {/* TABS */}
//       <nav className="dashboard-tabs">
//         <button 
//           className={`tab ${activeTab === "overview" ? "active" : ""}`} 
//           onClick={() => setActiveTab("overview")}
//         >
//           📊 Overview
//         </button>
//         <button 
//           className={`tab ${activeTab === "marks" ? "active" : ""}`} 
//           onClick={() => setActiveTab("marks")}
//         >
//           ✏️ Marks Entry
//         </button>
//         <button 
//           className={`tab ${activeTab === "attendance" ? "active" : ""}`} 
//           onClick={() => setActiveTab("attendance")}
//         >
//           📋 Attendance
//         </button>
//       </nav>

//       <main className="dashboard-content">
//         {/* HERO STATS */}
//         <section className="hero-stats">
//           <div className="stats-grid">
//             <div className="stat-card primary">
//               <div className="stat-icon">📚</div>
//               <h3>Total Classes</h3>
//               <div className="stat-value">{classes.length}</div>
//               <div className="stat-subtitle">Active classes this term</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">👥</div>
//               <h3>Class Size</h3>
//               <div className="stat-value">
//                 {selectedClass ? performance.length : '—'}
//               </div>
//               <div className="stat-subtitle">{getSelectedClassName() || 'Select a class'}</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">📈</div>
//               <h3>Avg Performance</h3>
//               <div className="stat-value">{getAvgPerformance().toFixed(1)}%</div>
//               <div className="stat-subtitle">Class average</div>
//             </div>
//           </div>
//         </section>

//         {/* CLASS SELECTOR */}
//         {classes.length > 0 && (
//           <section className="class-hero-selector">
//             <h2 className="section-title">📖 Choose Class to Manage</h2>
//             <div className="classes-hero-grid">
//               {classes.map((cls) => (
//                 <div
//                   key={cls.id}
//                   className={`class-hero-card ${selectedClass === cls.id ? "selected" : ""}`}
//                   onClick={() => handleClassSelect(cls.id)}
//                 >
//                   <div className="class-icon">{cls.class_name.charAt(0)}</div>
//                   <div className="class-details">
//                     <h3>{cls.class_name} {cls.section}</h3>
//                     <p className="students-count">{cls.student_count || 0} students</p>
//                     {cls.teacher_name && <p className="teacher-name">{cls.teacher_name}</p>}
//                   </div>
//                   {selectedClass === cls.id && (
//                     <div className="selected-indicator">
//                       <span>✅ Selected</span>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* TAB CONTENT */}
//         <section className="main-content">
//           {activeTab === "overview" && selectedClass && (
//             <div className="overview-panel">
//               <div className="panel-header">
//                 <h2>📊 {getSelectedClassName()} Performance</h2>
//                 <div className="panel-actions">
//                   <button className="export-btn">📥 Export</button>
//                   <button className="print-btn">🖨️ Print</button>
//                 </div>
//               </div>
//               <div className="table-container">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Roll No</th>
//                       <th>Student</th>
//                       <th>Avg %</th>
//                       <th>Subjects</th>
//                       <th>Exams</th>
//                       <th>Attendance</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {performance.map((student) => (
//                       <tr key={student.id}>
//                         <td className="roll-number">{student.roll_number}</td>
//                         <td className="student-name">{student.student_name}</td>
//                         <td>
//                           <span className={`grade-badge ${getGradeClass(student.average_percentage)}`}>
//                             {parseFloat(student.average_percentage || 0).toFixed(1)}%
//                           </span>
//                         </td>
//                         <td>{student.subjects_taken || 0}</td>
//                         <td>{student.total_exams || 0}</td>
//                         <td>
//                           <span className="attendance-ratio">
//                             {student.present_days}/{student.total_days}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="row-actions">
//                             <button className="view-btn" title="View Profile">👁️</button>
//                             <button className="marks-btn" title="Edit Marks">✏️</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* MARKS TAB */}
//           {activeTab === "marks" && (
//             <div className="marks-entry-panel">
//               <div className="panel-header">
//                 <h2>✏️ Marks Entry - {getSelectedClassName()}</h2>
//                 <div className="entry-actions">
//                   <select className="exam-type-select">
//                     <option>Unit Test 1</option>
//                     <option>Quarterly Exam</option>
//                     <option>Half Yearly</option>
//                   </select>
//                   <button className="bulk-entry-btn">Bulk Entry</button>
//                 </div>
//               </div>
//               <div className="coming-soon-placeholder">
//                 <p>Marks entry form for selected class will go here</p>
//               </div>
//             </div>
//           )}

//           {/* ATTENDANCE TAB */}
//           {activeTab === "attendance" && (
//             <div className="attendance-panel">
//               <div className="panel-header">
//                 <h2>📋 Attendance - {getSelectedClassName()}</h2>
//                 <div className="attendance-actions">
//                   <button className="today-btn">📅 Today</button>
//                   <button className="mark-all-btn">✅ Mark All Present</button>
//                 </div>
//               </div>
//               <div className="coming-soon-placeholder">
//                 <p>Attendance marking interface will go here</p>
//               </div>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }
// export default TeacherDashboard;
// frontend/src/dashboards/TeacherDashboard.js
import React, { useState, useEffect } from "react";
import { teacherAPI, adminAPI } from "../api";
import CGPACalculator from "../components/CGPACalculator"; // 🔥 NEW IMPORT
import "./TeacherDashboard.css";

function TeacherDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError("");
      const classesRes = await adminAPI.getClasses();
      const classesData = classesRes.data || [];
      setClasses(classesData);

      if (classesData.length > 0) {
        const classId = classesData[0].id;
        setSelectedClass(classId);
        const perfRes = await teacherAPI.getClassPerformance(classId);
        setPerformance(perfRes.data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadClassPerformance = async (classId) => {
    try {
      setLoading(true);
      const perfRes = await teacherAPI.getClassPerformance(classId);
      setPerformance(perfRes.data || []);
    } catch (error) {
      console.error("Class performance error:", error);
      setError("Failed to load class performance");
    } finally {
      setLoading(false);
    }
  };

  const handleClassSelect = async (classId) => {
    setSelectedClass(classId);
    await loadClassPerformance(classId);
  };

  // ✅ HELPER FUNCTIONS
  const getSelectedClassName = () => {
    const cls = classes.find(c => c.id === selectedClass);
    return cls ? `${cls.class_name} ${cls.section}` : '';
  };

  const getTotalStudents = () => {
    return classes.reduce((total, cls) => total + (cls.student_count || 0), 0);
  };

  const getAvgPerformance = () => {
    if (!selectedClass || performance.length === 0) return 0;
    return performance.reduce((avg, student) => {
      return avg + parseFloat(student.average_percentage || 0);
    }, 0) / performance.length;
  };

  const getGradeClass = (percentage) => {
    const p = parseFloat(percentage || 0);
    if (p >= 90) return 'excellent';
    if (p >= 75) return 'good';
    if (p >= 50) return 'average';
    return 'poor';
  };

  if (loading && activeTab === "overview") {
    return (
      <div className="dashboard">
        <div className="loading">Loading classes...</div>
      </div>
    );
  }

  // 🔥 NEW CGPA RENDER FOR TEACHERS (BULK MODE)
  const renderCGPA = () => (
    <div className="cgpa-section">
      <div className="cgpa-teacher-header">
        <h2>🧮 Bulk CGPA Calculator</h2>
        <p>Calculate CGPA for entire class or individual students</p>
      </div>
      <CGPACalculator isTeacher={true} />
    </div>
  );

  return (
    <div className="teacher-dashboard">
      {/* HERO HEADER */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>👨‍🏫 Teacher Dashboard</h1>
            <span className="quick-info">
              {classes.length} Classes • {getTotalStudents()} Students
            </span>
          </div>
          <div className="user-info">
            <span>{user?.email}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* 🔥 UPDATED TABS WITH CGPA */}
      <nav className="dashboard-tabs">
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
          ✏️ Marks Entry
        </button>
        <button 
          className={`tab ${activeTab === "attendance" ? "active" : ""}`} 
          onClick={() => setActiveTab("attendance")}
        >
          📋 Attendance
        </button>
        {/* 🔥 NEW CGPA TAB FOR TEACHERS */}
        <button 
          className={`tab ${activeTab === "cgpa" ? "active" : ""}`} 
          onClick={() => setActiveTab("cgpa")}
        >
          🧮 Bulk CGPA
        </button>
      </nav>

      <main className="dashboard-content">
        {/* HERO STATS */}
        <section className="hero-stats">
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">📚</div>
              <h3>Total Classes</h3>
              <div className="stat-value">{classes.length}</div>
              <div className="stat-subtitle">Active classes this term</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <h3>Class Size</h3>
              <div className="stat-value">
                {selectedClass ? performance.length : '—'}
              </div>
              <div className="stat-subtitle">{getSelectedClassName() || 'Select a class'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <h3>Avg Performance</h3>
              <div className="stat-value">{getAvgPerformance().toFixed(1)}%</div>
              <div className="stat-subtitle">Class average</div>
            </div>
          </div>
        </section>

        {/* CLASS SELECTOR */}
        {classes.length > 0 && (
          <section className="class-hero-selector">
            <h2 className="section-title">📖 Choose Class to Manage</h2>
            <div className="classes-hero-grid">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className={`class-hero-card ${selectedClass === cls.id ? "selected" : ""}`}
                  onClick={() => handleClassSelect(cls.id)}
                >
                  <div className="class-icon">{cls.class_name.charAt(0)}</div>
                  <div className="class-details">
                    <h3>{cls.class_name} {cls.section}</h3>
                    <p className="students-count">{cls.student_count || 0} students</p>
                    {cls.teacher_name && <p className="teacher-name">{cls.teacher_name}</p>}
                  </div>
                  {selectedClass === cls.id && (
                    <div className="selected-indicator">
                      <span>✅ Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB CONTENT */}
        <section className="main-content">
          {activeTab === "overview" && selectedClass && (
            <div className="overview-panel">
              <div className="panel-header">
                <h2>📊 {getSelectedClassName()} Performance</h2>
                <div className="panel-actions">
                  <button className="export-btn">📥 Export</button>
                  <button className="print-btn">🖨️ Print</button>
                </div>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student</th>
                      <th>Avg %</th>
                      <th>Subjects</th>
                      <th>Exams</th>
                      <th>Attendance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.map((student) => (
                      <tr key={student.id}>
                        <td className="roll-number">{student.roll_number}</td>
                        <td className="student-name">{student.student_name}</td>
                        <td>
                          <span className={`grade-badge ${getGradeClass(student.average_percentage)}`}>
                            {parseFloat(student.average_percentage || 0).toFixed(1)}%
                          </span>
                        </td>
                        <td>{student.subjects_taken || 0}</td>
                        <td>{student.total_exams || 0}</td>
                        <td>
                          <span className="attendance-ratio">
                            {student.present_days}/{student.total_days}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button className="view-btn" title="View Profile">👁️</button>
                            <button className="marks-btn" title="Edit Marks">✏️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MARKS TAB */}
          {activeTab === "marks" && (
            <div className="marks-entry-panel">
              <div className="panel-header">
                <h2>✏️ Marks Entry - {getSelectedClassName()}</h2>
                <div className="entry-actions">
                  <select className="exam-type-select">
                    <option>Unit Test 1</option>
                    <option>Quarterly Exam</option>
                    <option>Half Yearly</option>
                  </select>
                  <button className="bulk-entry-btn">Bulk Entry</button>
                </div>
              </div>
              <div className="coming-soon-placeholder">
                <p>Marks entry form for selected class will go here</p>
              </div>
            </div>
          )}

          {/* ATTENDANCE TAB */}
          {activeTab === "attendance" && (
            <div className="attendance-panel">
              <div className="panel-header">
                <h2>📋 Attendance - {getSelectedClassName()}</h2>
                <div className="attendance-actions">
                  <button className="today-btn">📅 Today</button>
                  <button className="mark-all-btn">✅ Mark All Present</button>
                </div>
              </div>
              <div className="coming-soon-placeholder">
                <p>Attendance marking interface will go here</p>
              </div>
            </div>
          )}

          {/* 🔥 NEW CGPA TAB CONTENT */}
          {activeTab === "cgpa" && renderCGPA()}
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
