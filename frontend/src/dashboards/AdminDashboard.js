// // frontend/src/dashboards/AdminDashboard.js - COMPLETE FIXED VERSION
// import React, { useEffect, useState } from "react";
// import { adminAPI } from "../api";
// import "./AdminDashboard.css";

// function AdminDashboard({ user, onLogout }) {
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalTeachers: 0,
//     totalParents: 0,
//     totalClasses: 0,
//   });
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [parents, setParents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("overview");
//   const [error, setError] = useState("");

//   // ✅ FIXED: loadData extracted for Refresh button
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [studentsRes, teachersRes, parentsRes, classesRes] =
//         await Promise.all([
//           adminAPI.getStudents(),
//           adminAPI.getTeachers(),
//           adminAPI.getParents(),
//           adminAPI.getClasses(),
//         ]);

//       const studentsData = studentsRes.data || [];
//       const teachersData = teachersRes.data || [];
//       const parentsData = parentsRes.data || [];
//       const classesData = classesRes.data || [];

//       setStudents(studentsData);
//       setTeachers(teachersData);
//       setParents(parentsData);
//       setClasses(classesData);
//       console.log(studentsData)
//       console.log(teachersData)
//       console.log(parentsData)
//       console.log(classesData)
//       setStats({
//         totalStudents: studentsData.length,
//         totalTeachers: teachersData.length,
//         totalParents: parentsData.length,
//         totalClasses: classesData.length,
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load admin data");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // ✅ Simplified useEffect
//   useEffect(() => {
//     loadData();
//   }, []);

//   const renderOverview = () => (
//     <div className="admin-overview-grid">
//       <div className="stat-card">
//         <h3>Total Students</h3>
//         <p>{stats.totalStudents}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Teachers</h3>
//         <p>{stats.totalTeachers}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Parents</h3>
//         <p>{stats.totalParents}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Classes</h3>
//         <p>{stats.totalClasses}</p>
//       </div>
//       {/* ✅ REFRESH BUTTON - Works now! */}
//       <div className="stat-card full-width">
//         <button onClick={loadData} className="btn btn-primary">
//           🔄 Refresh Data
//         </button>
//       </div>
//     </div>
//   );

//   const renderStudents = () => (
//     <div className="table-wrapper">
//       <h3>Students</h3>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Roll</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 && (
//             <tr>
//               <td colSpan={4}>No students found</td>
//             </tr>
//           )}
//           {students.map((s) => (
//             <tr key={s.id}>
//               <td>{`${s.first_name || ""} ${s.last_name || ""}`.trim()}</td>
//               <td>
//                 {s.class_name}
//                 {s.section ? ` - ${s.section}` : ""}
//               </td>
//               <td>{s.roll_number}</td>
//               <td>{s.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderTeachers = () => (
//     <div className="table-wrapper">
//       <h3>Teachers</h3>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Department</th>
//             <th>Phone</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.length === 0 && (
//             <tr>
//               <td colSpan={4}>No teachers found</td>
//             </tr>
//           )}
//           {teachers.map((t) => (
//             <tr key={t.id}>
//               <td>{`${t.first_name || ""} ${t.last_name || ""}`.trim()}</td>
//               <td>{t.department}</td>
//               <td>{t.phone}</td>
//               <td>{t.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderParents = () => (
//     <div className="table-wrapper">
//       <h3>Parents</h3>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Children</th>
//             <th>Phone</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parents.length === 0 && (
//             <tr>
//               <td colSpan={4}>No parents found</td>
//             </tr>
//           )}
//           {parents.map((p) => (
//             <tr key={p.id}>
//               <td>{`${p.first_name || ""} ${p.last_name || ""}`.trim()}</td>
//               <td>
//                 {Array.isArray(p.children) && p.children.length > 0
//                   ? p.children.map((c) => c.name).join(", ")
//                   : "—"}
//               </td>
//               <td>{p.phone}</td>
//               <td>{p.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderClasses = () => (
//     <div className="table-wrapper">
//       <h3>Classes</h3>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Teacher</th>
//             <th>Students</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.length === 0 && (
//             <tr>
//               <td colSpan={4}>No classes found</td>
//             </tr>
//           )}
//           {classes.map((c) => (
//             <tr key={c.id}>
//               <td>{c.class_name}</td>
//               <td>{c.section}</td>
//               <td>{c.teacher_name || "Unassigned"}</td>
//               <td>{c.student_count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   // if (loading) {
//   //   return (
//   //     <div className="dashboard-container">
//   //       <div className="dashboard-header">
//   //         <h2>Admin Dashboard</h2>
//   //       </div>
//   //       <p>Loading...</p>
//   //     </div>
//   //   );
//   // }
//   if (loading) {
//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//       </div>
//       <div className="skeleton-loader">
//         <div className="admin-overview-grid">
//           <div className="skeleton-stat"></div>
//           <div className="skeleton-stat"></div>
//           <div className="skeleton-stat"></div>
//           <div className="skeleton-stat"></div>
//         </div>
//         <div className="skeleton-table">
//           <div className="skeleton-row"></div>
//           <div className="skeleton-row"></div>
//           <div className="skeleton-row"></div>
//         </div>
//       </div>
//     </div>
//   );
// }


//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <div className="dashboard-user-info">
//           <span>{user?.email}</span>
//           <button onClick={onLogout} className="btn btn-secondary">
//             Logout
//           </button>
//         </div>
//       </div>

//       {error && <div className="error-banner">{error}</div>}

//       <div className="dashboard-tabs">
//         <button
//           className={tab === "overview" ? "tab active" : "tab"}
//           onClick={() => setTab("overview")}
//         >
//           Overview
//         </button>
//         <button
//           className={tab === "students" ? "tab active" : "tab"}
//           onClick={() => setTab("students")}
//         >
//           Students
//         </button>
//         <button
//           className={tab === "teachers" ? "tab active" : "tab"}
//           onClick={() => setTab("teachers")}
//         >
//           Teachers
//         </button>
//         <button
//           className={tab === "parents" ? "tab active" : "tab"}
//           onClick={() => setTab("parents")}
//         >
//           Parents
//         </button>
//         <button
//           className={tab === "classes" ? "tab active" : "tab"}
//           onClick={() => setTab("classes")}
//         >
//           Classes
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {tab === "overview" && renderOverview()}
//         {tab === "students" && renderStudents()}
//         {tab === "teachers" && renderTeachers()}
//         {tab === "parents" && renderParents()}
//         {tab === "classes" && renderClasses()}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import { adminAPI } from "../api";
// import "./AdminDashboard.css";

// function AdminDashboard({ user, onLogout }) {
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalTeachers: 0,
//     totalParents: 0,
//     totalClasses: 0,
//   });
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [parents, setParents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("overview");
//   const [error, setError] = useState("");

//   // ✅ CRUD STATES
//   const [editingId, setEditingId] = useState(null);
//   const [editForms, setEditForms] = useState({});
//   const [showCreateModal, setShowCreateModal] = useState({ students: false, teachers: false, parents: false, classes: false });
//   const [createForms, setCreateForms] = useState({});

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const [studentsRes, teachersRes, parentsRes, classesRes] = await Promise.all([
//         adminAPI.getStudents(),
//         adminAPI.getTeachers(),
//         adminAPI.getParents(),
//         adminAPI.getClasses(),
//       ]);

//       const studentsData = studentsRes.data || [];
//       const teachersData = teachersRes.data || [];
//       const parentsData = parentsRes.data || [];
//       const classesData = classesRes.data || [];

//       setStudents(studentsData);
//       setTeachers(teachersData);
//       setParents(parentsData);
//       setClasses(classesData);

//       setStats({
//         totalStudents: studentsData.length,
//         totalTeachers: teachersData.length,
//         totalParents: parentsData.length,
//         totalClasses: classesData.length,
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load admin data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ✅ SHARED CRUD HANDLERS
//   const handleDelete = async (deleteFn, id, entityName) => {
//     if (!confirm(`Delete this ${entityName}?`)) return;
//     try {
//       await deleteFn(id);
//       loadData();
//     } catch (err) {
//       setError(`Failed to delete ${entityName}`);
//     }
//   };

//   const startEdit = (entity, id) => {
//     setEditingId(id);
//     setEditForms(prev => ({ ...prev, [id]: { ...entity } }));
//   };

//   const updateEditField = (id, field, value) => {
//     setEditForms(prev => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: value }
//     }));
//   };

//   const saveEdit = async (updateFn, id) => {
//     try {
//       await updateFn(id, editForms[id]);
//       setEditingId(null);
//       setEditForms({});
//       loadData();
//     } catch (err) {
//       setError('Update failed');
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditForms({});
//   };

//   const openCreateModal = (entity) => {
//     setShowCreateModal(prev => ({ ...prev, [entity]: true }));
//     setCreateForms(prev => ({ ...prev, [entity]: {} }));
//   };

//   const closeCreateModal = (entity) => {
//     setShowCreateModal(prev => ({ ...prev, [entity]: false }));
//     setCreateForms(prev => { const newForms = { ...prev }; delete newForms[entity]; return newForms; });
//   };

//   const updateCreateField = (entity, field, value) => {
//     setCreateForms(prev => ({
//       ...prev,
//       [entity]: { ...prev[entity], [field]: value }
//     }));
//   };

//   const handleCreate = async (createFn, entity) => {
//     try {
//       await createFn(createForms[entity]);
//       closeCreateModal(entity);
//       loadData();
//     } catch (err) {
//       setError(`Failed to create ${entity}`);
//     }
//   };

//   const renderOverview = () => (
//     <div className="admin-overview-grid">
//       <div className="stat-card">
//         <h3>Total Students</h3>
//         <p>{stats.totalStudents}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Teachers</h3>
//         <p>{stats.totalTeachers}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Parents</h3>
//         <p>{stats.totalParents}</p>
//       </div>
//       <div className="stat-card">
//         <h3>Total Classes</h3>
//         <p>{stats.totalClasses}</p>
//       </div>
//       <div className="stat-card full-width">
//         <button onClick={loadData} className="btn btn-primary">
//           🔄 Refresh Data
//         </button>
//       </div>
//     </div>
//   );

//   // ✅ STUDENTS TABLE WITH CRUD
//   const renderStudents = () => (
//     <div className="table-wrapper">
//       <div className="table-header">
//         <h3>Students</h3>
//         <button onClick={() => openCreateModal('students')} className="btn btn-primary">
//           ➕ Add New Student
//         </button>
//       </div>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Roll</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 && (
//             <tr><td colSpan={5}>No students found</td></tr>
//           )}
//           {students.map((s) => {
//             const isEditing = editingId === s.id;
//             const formData = editForms[s.id] || {};
//             return (
//               <tr key={s.id}>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.first_name || '' || s.first_name}
//                       onChange={(e) => updateEditField(s.id, 'first_name', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : (
//                     `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'N/A'
//                   )}
//                 </td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.class_name || s.class_name || ''}
//                       onChange={(e) => updateEditField(s.id, 'class_name', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : (
//                     `${s.class_name || ''}${s.section ? ` - ${s.section}` : ''}` || 'N/A'
//                   )}
//                 </td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.roll_number || s.roll_number || ''}
//                       onChange={(e) => updateEditField(s.id, 'roll_number', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : s.roll_number || 'N/A'}
//                 </td>
//                 <td>{s.email || 'N/A'}</td>
//                 <td>
//                   {isEditing ? (
//                     <>
//                       <button 
//                         onClick={() => saveEdit(adminAPI.updateStudent, s.id)}
//                         className="btn btn-success btn-sm"
//                       >
//                         💾 Save
//                       </button>
//                       <button 
//                         onClick={cancelEdit}
//                         className="btn btn-secondary btn-sm"
//                       >
//                         ❌ Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button 
//                         onClick={() => startEdit(s, s.id)}
//                         className="btn btn-warning btn-sm"
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(adminAPI.deleteStudent, s.id, 'student')}
//                         className="btn btn-danger btn-sm"
//                       >
//                         🗑️ Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   // ✅ TEACHERS TABLE WITH CRUD
//   const renderTeachers = () => (
//     <div className="table-wrapper">
//       <div className="table-header">
//         <h3>Teachers</h3>
//         <button onClick={() => openCreateModal('teachers')} className="btn btn-primary">
//           ➕ Add New Teacher
//         </button>
//       </div>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Department</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.length === 0 && (
//             <tr><td colSpan={5}>No teachers found</td></tr>
//           )}
//           {teachers.map((t) => {
//             const isEditing = editingId === t.id;
//             const formData = editForms[t.id] || {};
//             return (
//               <tr key={t.id}>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.first_name || '' || t.first_name}
//                       onChange={(e) => updateEditField(t.id, 'first_name', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : (
//                     `${t.first_name || ''} ${t.last_name || ''}`.trim() || 'N/A'
//                   )}
//                 </td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.department || t.department || ''}
//                       onChange={(e) => updateEditField(t.id, 'department', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : t.department || 'N/A'}
//                 </td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.phone || t.phone || ''}
//                       onChange={(e) => updateEditField(t.id, 'phone', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : t.phone || 'N/A'}
//                 </td>
//                 <td>{t.email || 'N/A'}</td>
//                 <td>
//                   {isEditing ? (
//                     <>
//                       <button onClick={() => saveEdit(adminAPI.updateTeacher, t.id)} className="btn btn-success btn-sm">💾 Save</button>
//                       <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => startEdit(t, t.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
//                       <button onClick={() => handleDelete(adminAPI.deleteTeacher, t.id, 'teacher')} className="btn btn-danger btn-sm">🗑️ Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   // ✅ PARENTS TABLE WITH CRUD
//   const renderParents = () => (
//     <div className="table-wrapper">
//       <div className="table-header">
//         <h3>Parents</h3>
//         <button onClick={() => openCreateModal('parents')} className="btn btn-primary">
//           ➕ Add New Parent
//         </button>
//       </div>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Children</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parents.length === 0 && (
//             <tr><td colSpan={5}>No parents found</td></tr>
//           )}
//           {parents.map((p) => {
//             const isEditing = editingId === p.id;
//             const formData = editForms[p.id] || {};
//             const childrenNames = Array.isArray(p.children) ? p.children.map(c => c.name).join(', ') : 'N/A';
//             return (
//               <tr key={p.id}>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.first_name || '' || p.first_name}
//                       onChange={(e) => updateEditField(p.id, 'first_name', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : (
//                     `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'N/A'
//                   )}
//                 </td>
//                 <td>{childrenNames}</td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.phone || p.phone || ''}
//                       onChange={(e) => updateEditField(p.id, 'phone', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : p.phone || 'N/A'}
//                 </td>
//                 <td>{p.email || 'N/A'}</td>
//                 <td>
//                   {isEditing ? (
//                     <>
//                       <button onClick={() => saveEdit(adminAPI.updateParent, p.id)} className="btn btn-success btn-sm">💾 Save</button>
//                       <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => startEdit(p, p.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
//                       <button onClick={() => handleDelete(adminAPI.deleteParent, p.id, 'parent')} className="btn btn-danger btn-sm">🗑️ Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   // ✅ CLASSES TABLE WITH CRUD
//   const renderClasses = () => (
//     <div className="table-wrapper">
//       <div className="table-header">
//         <h3>Classes</h3>
//         <button onClick={() => openCreateModal('classes')} className="btn btn-primary">
//           ➕ Add New Class
//         </button>
//       </div>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Teacher</th>
//             <th>Students</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.length === 0 && (
//             <tr><td colSpan={5}>No classes found</td></tr>
//           )}
//           {classes.map((c) => {
//             const isEditing = editingId === c.id;
//             const formData = editForms[c.id] || {};
//             return (
//               <tr key={c.id}>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.class_name || c.class_name || ''}
//                       onChange={(e) => updateEditField(c.id, 'class_name', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : c.class_name || 'N/A'}
//                 </td>
//                 <td>
//                   {isEditing ? (
//                     <input
//                       value={formData.section || c.section || ''}
//                       onChange={(e) => updateEditField(c.id, 'section', e.target.value)}
//                       className="edit-input"
//                     />
//                   ) : c.section || 'N/A'}
//                 </td>
//                 <td>{c.teacher_name || 'Unassigned'}</td>
//                 <td>{c.student_count || 0}</td>
//                 <td>
//                   {isEditing ? (
//                     <>
//                       <button onClick={() => saveEdit(adminAPI.updateClass, c.id)} className="btn btn-success btn-sm">💾 Save</button>
//                       <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => startEdit(c, c.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
//                       <button onClick={() => handleDelete(adminAPI.deleteClass, c.id, 'class')} className="btn btn-danger btn-sm">🗑️ Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );

//   // ✅ CREATE MODALS (Simple forms)
//   const renderCreateModal = () => {
//     const entity = Object.keys(showCreateModal).find(key => showCreateModal[key]);
//     if (!entity) return null;

//     const formData = createForms[entity] || {};
//     const fields = {
//       students: [
//         { key: 'first_name', label: 'First Name', type: 'text' },
//         { key: 'last_name', label: 'Last Name', type: 'text' },
//         { key: 'email', label: 'Email', type: 'email' },
//         { key: 'roll_number', label: 'Roll Number', type: 'text' },
//         { key: 'class_id', label: 'Class ID', type: 'number' }
//       ],
//       teachers: [
//         { key: 'first_name', label: 'First Name', type: 'text' },
//         { key: 'last_name', label: 'Last Name', type: 'text' },
//         { key: 'email', label: 'Email', type: 'email' },
//         { key: 'department', label: 'Department', type: 'text' },
//         { key: 'phone', label: 'Phone', type: 'tel' }
//       ],
//       parents: [
//         { key: 'first_name', label: 'First Name', type: 'text' },
//         { key: 'last_name', label: 'Last Name', type: 'text' },
//         { key: 'email', label: 'Email', type: 'email' },
//         { key: 'phone', label: 'Phone', type: 'tel' }
//       ],
//       classes: [
//         { key: 'class_name', label: 'Class Name', type: 'text' },
//         { key: 'section', label: 'Section', type: 'text' },
//         { key: 'teacher_id', label: 'Teacher ID', type: 'number' }
//       ]
//     };

//     const createFn = {
//       students: adminAPI.createStudent,
//       teachers: adminAPI.createTeacher,
//       parents: adminAPI.createParent,
//       classes: adminAPI.createClass
//     }[entity];

//     return (
//       <div className="modal-overlay">
//         <div className="modal">
//           <h3>Add New {entity.charAt(0).toUpperCase() + entity.slice(1)}</h3>
//           <div className="modal-form">
//             {fields[entity].map(field => (
//               <div key={field.key} className="form-group">
//                 <label>{field.label}</label>
//                 <input
//                   type={field.type}
//                   value={formData[field.key] || ''}
//                   onChange={(e) => updateCreateField(entity, field.key, e.target.value)}
//                   className="form-input"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="modal-actions">
//             <button onClick={() => handleCreate(createFn, entity)} className="btn btn-primary">
//               Create
//             </button>
//             <button onClick={() => closeCreateModal(entity)} className="btn btn-secondary">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="dashboard-container">
//         <div className="dashboard-header">
//           <h2>Admin Dashboard</h2>
//         </div>
//         <div className="skeleton-loader">
//           <div className="admin-overview-grid">
//             <div className="skeleton-stat"></div>
//             <div className="skeleton-stat"></div>
//             <div className="skeleton-stat"></div>
//             <div className="skeleton-stat"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h2>Admin Dashboard</h2>
//         <div className="dashboard-user-info">
//           <span>{user?.email}</span>
//           <button onClick={onLogout} className="btn btn-secondary">
//             Logout
//           </button>
//         </div>
//       </div>

//       {error && <div className="error-banner">{error}</div>}

//       <div className="dashboard-tabs">
//         <button className={tab === "overview" ? "tab active" : "tab"} onClick={() => setTab("overview")}>
//           Overview
//         </button>
//         <button className={tab === "students" ? "tab active" : "tab"} onClick={() => setTab("students")}>
//           Students
//         </button>
//         <button className={tab === "teachers" ? "tab active" : "tab"} onClick={() => setTab("teachers")}>
//           Teachers
//         </button>
//         <button className={tab === "parents" ? "tab active" : "tab"} onClick={() => setTab("parents")}>
//           Parents
//         </button>
//         <button className={tab === "classes" ? "tab active" : "tab"} onClick={() => setTab("classes")}>
//           Classes
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {tab === "overview" && renderOverview()}
//         {tab === "students" && renderStudents()}
//         {tab === "teachers" && renderTeachers()}
//         {tab === "parents" && renderParents()}
//         {tab === "classes" && renderClasses()}
//         {renderCreateModal()}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { adminAPI } from "../api";
import "./AdminDashboard.css";

function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    totalClasses: 0,
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [error, setError] = useState("");

  // ✅ CRUD STATES
  const [editingId, setEditingId] = useState(null);
  const [editForms, setEditForms] = useState({});
  const [showCreateModal, setShowCreateModal] = useState({ 
    students: false, 
    teachers: false, 
    parents: false, 
    classes: false 
  });
  const [createForms, setCreateForms] = useState({});

  // ✅ CONFIRMATION MODAL STATE (FIXES ESLint ERROR)
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    entityName: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [studentsRes, teachersRes, parentsRes, classesRes] = await Promise.all([
        adminAPI.getStudents(),
        adminAPI.getTeachers(),
        adminAPI.getParents(),
        adminAPI.getClasses(),
      ]);

      const studentsData = studentsRes.data || [];
      const teachersData = teachersRes.data || [];
      const parentsData = parentsRes.data || [];
      const classesData = classesRes.data || [];

      setStudents(studentsData);
      setTeachers(teachersData);
      setParents(parentsData);
      setClasses(classesData);

      setStats({
        totalStudents: studentsData.length,
        totalTeachers: teachersData.length,
        totalParents: parentsData.length,
        totalClasses: classesData.length,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ SHARED CRUD HANDLERS (REPLACED confirm() WITH CUSTOM MODAL)
  const showConfirm = (title, message, onConfirm, entityName) => {
    setConfirmDialog({
      show: true,
      title,
      message,
      onConfirm,
      entityName
    });
  };

  const handleConfirmDelete = async (deleteFn, id, entityName) => {
    try {
      await deleteFn(id);
      loadData();
    } catch (err) {
      setError(`Failed to delete ${entityName}`);
    } finally {
      setConfirmDialog({ show: false, title: '', message: '', onConfirm: null, entityName: '' });
    }
  };

  const confirmDelete = (deleteFn, id, entityName) => {
    showConfirm(
      'Confirm Delete',
      `Are you sure you want to delete this ${entityName}? This action cannot be undone.`,
      () => handleConfirmDelete(deleteFn, id, entityName),
      entityName
    );
  };

  const startEdit = (entity, id) => {
    setEditingId(id);
    setEditForms(prev => ({ ...prev, [id]: { ...entity } }));
  };

  const updateEditField = (id, field, value) => {
    setEditForms(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const saveEdit = async (updateFn, id) => {
    try {
      await updateFn(id, editForms[id]);
      setEditingId(null);
      setEditForms({});
      loadData();
    } catch (err) {
      setError('Update failed');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForms({});
  };

  const openCreateModal = (entity) => {
    setShowCreateModal(prev => ({ ...prev, [entity]: true }));
    setCreateForms(prev => ({ ...prev, [entity]: {} }));
  };

  const closeCreateModal = (entity) => {
    setShowCreateModal(prev => ({ ...prev, [entity]: false }));
    setCreateForms(prev => { 
      const newForms = { ...prev }; 
      delete newForms[entity]; 
      return newForms; 
    });
  };

  const updateCreateField = (entity, field, value) => {
    setCreateForms(prev => ({
      ...prev,
      [entity]: { ...prev[entity], [field]: value }
    }));
  };

  const handleCreate = async (createFn, entity) => {
    try {
      await createFn(createForms[entity]);
      closeCreateModal(entity);
      loadData();
    } catch (err) {
      setError(`Failed to create ${entity}`);
    }
  };

  const renderOverview = () => (
    <div className="admin-overview-grid">
      <div className="stat-card">
        <h3>Total Students</h3>
        <p>{stats.totalStudents}</p>
      </div>
      <div className="stat-card">
        <h3>Total Teachers</h3>
        <p>{stats.totalTeachers}</p>
      </div>
      <div className="stat-card">
        <h3>Total Parents</h3>
        <p>{stats.totalParents}</p>
      </div>
      <div className="stat-card">
        <h3>Total Classes</h3>
        <p>{stats.totalClasses}</p>
      </div>
      <div className="stat-card full-width">
        <button onClick={loadData} className="btn btn-primary">
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );

  // ✅ STUDENTS TABLE WITH CRUD
  const renderStudents = () => (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Students</h3>
        <button onClick={() => openCreateModal('students')} className="btn btn-primary">
          ➕ Add New Student
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr><td colSpan={5}>No students found</td></tr>
          )}
          {students.map((s) => {
            const isEditing = editingId === s.id;
            const formData = editForms[s.id] || {};
            return (
              <tr key={s.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.first_name || s.first_name || ''}
                      onChange={(e) => updateEditField(s.id, 'first_name', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.class_name || s.class_name || ''}
                      onChange={(e) => updateEditField(s.id, 'class_name', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    `${s.class_name || ''}${s.section ? ` - ${s.section}` : ''}` || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.roll_number || s.roll_number || ''}
                      onChange={(e) => updateEditField(s.id, 'roll_number', e.target.value)}
                      className="edit-input"
                    />
                  ) : s.roll_number || 'N/A'}
                </td>
                <td>{s.email || 'N/A'}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => saveEdit(adminAPI.updateStudent, s.id)}
                        className="btn btn-success btn-sm"
                      >
                        💾 Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="btn btn-secondary btn-sm"
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEdit(s, s.id)}
                        className="btn btn-warning btn-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => confirmDelete(adminAPI.deleteStudent, s.id, 'student')}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // ✅ TEACHERS TABLE WITH CRUD
  const renderTeachers = () => (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Teachers</h3>
        <button onClick={() => openCreateModal('teachers')} className="btn btn-primary">
          ➕ Add New Teacher
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 && (
            <tr><td colSpan={5}>No teachers found</td></tr>
          )}
          {teachers.map((t) => {
            const isEditing = editingId === t.id;
            const formData = editForms[t.id] || {};
            return (
              <tr key={t.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.first_name || t.first_name || ''}
                      onChange={(e) => updateEditField(t.id, 'first_name', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    `${t.first_name || ''} ${t.last_name || ''}`.trim() || 'N/A'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.department || t.department || ''}
                      onChange={(e) => updateEditField(t.id, 'department', e.target.value)}
                      className="edit-input"
                    />
                  ) : t.department || 'N/A'}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.phone || t.phone || ''}
                      onChange={(e) => updateEditField(t.id, 'phone', e.target.value)}
                      className="edit-input"
                    />
                  ) : t.phone || 'N/A'}
                </td>
                <td>{t.email || 'N/A'}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(adminAPI.updateTeacher, t.id)} className="btn btn-success btn-sm">💾 Save</button>
                      <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(t, t.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
                      <button onClick={() => confirmDelete(adminAPI.deleteTeacher, t.id, 'teacher')} className="btn btn-danger btn-sm">🗑️ Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // ✅ PARENTS TABLE WITH CRUD
  const renderParents = () => (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Parents</h3>
        <button onClick={() => openCreateModal('parents')} className="btn btn-primary">
          ➕ Add New Parent
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Children</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.length === 0 && (
            <tr><td colSpan={5}>No parents found</td></tr>
          )}
          {parents.map((p) => {
            const isEditing = editingId === p.id;
            const formData = editForms[p.id] || {};
            const childrenNames = Array.isArray(p.children) ? p.children.map(c => c.name).join(', ') : 'N/A';
            return (
              <tr key={p.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.first_name || p.first_name || ''}
                      onChange={(e) => updateEditField(p.id, 'first_name', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'N/A'
                  )}
                </td>
                <td>{childrenNames}</td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.phone || p.phone || ''}
                      onChange={(e) => updateEditField(p.id, 'phone', e.target.value)}
                      className="edit-input"
                    />
                  ) : p.phone || 'N/A'}
                </td>
                <td>{p.email || 'N/A'}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(adminAPI.updateParent, p.id)} className="btn btn-success btn-sm">💾 Save</button>
                      <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(p, p.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
                      <button onClick={() => confirmDelete(adminAPI.deleteParent, p.id, 'parent')} className="btn btn-danger btn-sm">🗑️ Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // ✅ CLASSES TABLE WITH CRUD
  const renderClasses = () => (
    <div className="table-wrapper">
      <div className="table-header">
        <h3>Classes</h3>
        <button onClick={() => openCreateModal('classes')} className="btn btn-primary">
          ➕ Add New Class
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Section</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 && (
            <tr><td colSpan={5}>No classes found</td></tr>
          )}
          {classes.map((c) => {
            const isEditing = editingId === c.id;
            const formData = editForms[c.id] || {};
            return (
              <tr key={c.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.class_name || c.class_name || ''}
                      onChange={(e) => updateEditField(c.id, 'class_name', e.target.value)}
                      className="edit-input"
                    />
                  ) : c.class_name || 'N/A'}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={formData.section || c.section || ''}
                      onChange={(e) => updateEditField(c.id, 'section', e.target.value)}
                      className="edit-input"
                    />
                  ) : c.section || 'N/A'}
                </td>
                <td>{c.teacher_name || 'Unassigned'}</td>
                <td>{c.student_count || 0}</td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(adminAPI.updateClass, c.id)} className="btn btn-success btn-sm">💾 Save</button>
                      <button onClick={cancelEdit} className="btn btn-secondary btn-sm">❌ Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(c, c.id)} className="btn btn-warning btn-sm">✏️ Edit</button>
                      <button onClick={() => confirmDelete(adminAPI.deleteClass, c.id, 'class')} className="btn btn-danger btn-sm">🗑️ Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // ✅ CREATE MODALS
  const renderCreateModal = () => {
    const entity = Object.keys(showCreateModal).find(key => showCreateModal[key]);
    if (!entity) return null;

    const formData = createForms[entity] || {};
    const fields = {
      students: [
        { key: 'first_name', label: 'First Name', type: 'text' },
        { key: 'last_name', label: 'Last Name', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'roll_number', label: 'Roll Number', type: 'text' },
        { key: 'class_id', label: 'Class ID', type: 'number' }
      ],
      // teachers: [
      //   { key: 'first_name', label: 'First Name', type: 'text' },
      //   { key: 'last_name', label: 'Last Name', type: 'text' },
      //   { key: 'email', label: 'Email', type: 'email' },
      //   { key: 'department', label: 'Department', type: 'text' },
      //   { key: 'phone', label: 'Phone', type: 'tel' }
      // ],
      teachers: [
     { key: 'first_name', label: 'First Name', type: 'text' },
     { key: 'last_name', label: 'Last Name', type: 'text' },
     { key: 'email', label: 'Email', type: 'email' },
     { key: 'department', label: 'Department', type: 'text' },
     { key: 'phone', label: 'Phone', type: 'tel' },

  // ✅ Added fields
     { key: 'qualification', label: 'Qualification', type: 'text' },
     { key: 'hire_date', label: 'Hire Date', type: 'date' }
     ],
      parents: [
        { key: 'first_name', label: 'First Name', type: 'text' },
        { key: 'last_name', label: 'Last Name', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'tel' }
      ],
      classes: [
        { key: 'class_name', label: 'Class Name', type: 'text' },
        { key: 'section', label: 'Section', type: 'text' },
        { key: 'teacher_id', label: 'Teacher ID', type: 'number' }
      ]
    };

    const createFn = {
      students: adminAPI.createStudent,
      teachers: adminAPI.createTeacher,
      parents: adminAPI.createParent,
      classes: adminAPI.createClass
    }[entity];

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Add New {entity.charAt(0).toUpperCase() + entity.slice(1)}</h3>
          <div className="modal-form">
            {fields[entity].map(field => (
              <div key={field.key} className="form-group">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  value={formData[field.key] || ''}
                  onChange={(e) => updateCreateField(entity, field.key, e.target.value)}
                  className="form-input"
                />
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button onClick={() => handleCreate(createFn, entity)} className="btn btn-primary">
              Create
            </button>
            <button onClick={() => closeCreateModal(entity)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ✅ CONFIRM DELETE MODAL (FIXES ESLint)
  const renderConfirmDialog = () => {
    if (!confirmDialog.show) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal confirm-modal">
          <h3>{confirmDialog.title}</h3>
          <p>{confirmDialog.message}</p>
          <div className="modal-actions">
            <button 
              onClick={confirmDialog.onConfirm} 
              className="btn btn-danger"
            >
              ✅ Yes, Delete
            </button>
            <button 
              onClick={() => setConfirmDialog({ show: false, title: '', message: '', onConfirm: null, entityName: '' })}
              className="btn btn-secondary"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="skeleton-loader">
          <div className="admin-overview-grid">
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
            <div className="skeleton-stat"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="dashboard-user-info">
          <span>{user?.email}</span>
          <button onClick={onLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-tabs">
        <button className={tab === "overview" ? "tab active" : "tab"} onClick={() => setTab("overview")}>
          Overview
        </button>
        <button className={tab === "students" ? "tab active" : "tab"} onClick={() => setTab("students")}>
          Students
        </button>
        <button className={tab === "teachers" ? "tab active" : "tab"} onClick={() => setTab("teachers")}>
          Teachers
        </button>
        <button className={tab === "parents" ? "tab active" : "tab"} onClick={() => setTab("parents")}>
          Parents
        </button>
        <button className={tab === "classes" ? "tab active" : "tab"} onClick={() => setTab("classes")}>
          Classes
        </button>
      </div>

      <div className="dashboard-content">
        {tab === "overview" && renderOverview()}
        {tab === "students" && renderStudents()}
        {tab === "teachers" && renderTeachers()}
        {tab === "parents" && renderParents()}
        {tab === "classes" && renderClasses()}
        {renderCreateModal()}
        {renderConfirmDialog()} {/* ✅ ADDED CONFIRM MODAL */}
      </div>
    </div>
  );
}

export default AdminDashboard;
