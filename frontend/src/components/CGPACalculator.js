// // frontend/src/components/CGPACalculator.js
// import React, { useState, useEffect } from "react";
// import { cgpaAPI } from "../api";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import "./CGPACalculator.css";

// const GRADE_POINTS = {
//   'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'P': 4, 'F': 0
// };

// function CGPACalculator({ className = "" }) {
//   const [studentId, setStudentId] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [currentSubject, setCurrentSubject] = useState({ code: "", grade: "", credits: "" });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("input");

//   useEffect(() => {
//     const saved = localStorage.getItem("cgpaResult");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setResult(parsed);
//       if (parsed.subjects) {
//         setSubjects(parsed.subjects || []);
//       }
//     }
//   }, []);

//   const addSubject = () => {
//     if (!currentSubject.code || !currentSubject.grade || !currentSubject.credits) return;
    
//     const gradePoint = GRADE_POINTS[currentSubject.grade.toUpperCase()] || 0;
//     const newSubject = { 
//       ...currentSubject, 
//       gradePoint,
//       sgpa: (gradePoint * parseFloat(currentSubject.credits)).toFixed(2)
//     };
    
//     setSubjects([...subjects, newSubject]);
//     setCurrentSubject({ code: "", grade: "", credits: "" });
//   };

//   const removeSubject = (index) => {
//     setSubjects(subjects.filter((_, i) => i !== index));
//   };

//   const calculateLocal = () => {
//     if (subjects.length === 0) return;
    
//     const totalGradePoints = subjects.reduce((sum, s) => sum + (s.gradePoint * parseFloat(s.credits)), 0);
//     const totalCredits = subjects.reduce((sum, s) => sum + parseFloat(s.credits), 0);
//     const sgpa = (totalGradePoints / totalCredits).toFixed(2);
    
//     return {
//       current_gpa: sgpa,
//       cgpa: sgpa, // For single semester
//       total_credits: totalCredits,
//       subjects
//     };
//   };

//   const handleSubmit = async () => {
//     if (subjects.length === 0) return;
    
//     setLoading(true);
//     try {
//       const payload = {
//         student_id: parseInt(studentId) || 1,
//         marks: subjects.reduce((acc, s) => {
//           acc[s.code] = s.grade;
//           return acc;
//         }, {})
//       };
      
//       const res = await cgpaAPI.calculate(payload);
//       const finalResult = { ...res.data, subjects };
//       setResult(finalResult);
//       localStorage.setItem("cgpaResult", JSON.stringify(finalResult));
//     } catch (err) {
//       // Fallback to local calculation
//       const localResult = calculateLocal();
//       setResult(localResult);
//       localStorage.setItem("cgpaResult", JSON.stringify(localResult));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const chartData = subjects.map((s, i) => ({
//     subject: s.code.substring(0, 8),
//     grade: s.gradePoint,
//     credits: parseFloat(s.credits)
//   }));

//   return (
//     <div className={`cgpa-calculator ${className}`}>
//       <div className="cgpa-header">
//         <h2>🧮 CGPA Calculator</h2>
//         <p>Track your academic performance with real-time calculations</p>
//       </div>

//       <div className="cgpa-tabs">
//         <button 
//           className={`tab ${activeTab === "input" ? "active" : ""}`}
//           onClick={() => setActiveTab("input")}
//         >
//           📝 Input Grades
//         </button>
//         <button 
//           className={`tab ${activeTab === "results" ? "active" : ""}`}
//           onClick={() => setActiveTab("results")}
//         >
//           📊 Results & Charts
//         </button>
//       </div>

//       <div className="cgpa-content">
//         {activeTab === "input" && (
//           <div className="input-section">
//             <div className="student-id-section">
//               <label>Student ID</label>
//               <input
//                 type="number"
//                 placeholder="Enter Student ID"
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//                 className="cyber-input"
//               />
//             </div>

//             <div className="add-subject-form">
//               <div className="input-group">
//                 <input
//                   placeholder="Subject Code (e.g., CS101)"
//                   value={currentSubject.code}
//                   onChange={(e) => setCurrentSubject({...currentSubject, code: e.target.value})}
//                   className="cyber-input"
//                 />
//                 <select
//                   value={currentSubject.grade}
//                   onChange={(e) => setCurrentSubject({...currentSubject, grade: e.target.value})}
//                   className="cyber-select"
//                 >
//                   <option value="">Select Grade</option>
//                   <option value="O">O (10)</option>
//                   <option value="A+">A+ (9)</option>
//                   <option value="A">A (8)</option>
//                   <option value="B+">B+ (7)</option>
//                   <option value="B">B (6)</option>
//                   <option value="C">C (5)</option>
//                   <option value="P">P (4)</option>
//                   <option value="F">F (0)</option>
//                 </select>
//                 <input
//                   type="number"
//                   step="0.5"
//                   placeholder="Credits (e.g., 4)"
//                   value={currentSubject.credits}
//                   onChange={(e) => setCurrentSubject({...currentSubject, credits: e.target.value})}
//                   className="cyber-input"
//                 />
//               </div>
//               <button onClick={addSubject} className="add-btn">
//                 ➕ Add Subject
//               </button>
//             </div>

//             <div className="subjects-list">
//               {subjects.map((subject, index) => (
//                 <div key={index} className="subject-item">
//                   <div className="subject-info">
//                     <span className="subject-code">{subject.code}</span>
//                     <span className={`grade-badge ${subject.grade}`}>{subject.grade}</span>
//                     <span className="credits">{subject.credits}cr</span>
//                   </div>
//                   <button 
//                     onClick={() => removeSubject(index)}
//                     className="remove-btn"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               ))}
//               {subjects.length === 0 && (
//                 <div className="empty-state">
//                   <p>No subjects added yet. Add your first subject! 🎯</p>
//                 </div>
//               )}
//             </div>

//             <button 
//               onClick={handleSubmit} 
//               disabled={subjects.length === 0 || loading}
//               className="calculate-btn"
//             >
//               {loading ? "🔄 Calculating..." : `🚀 Calculate CGPA (${subjects.length} subjects)`}
//             </button>
//           </div>
//         )}

//         {activeTab === "results" && (
//           <div className="results-section">
//             {result ? (
//               <>
//                 <div className="results-grid">
//                   <div className="result-card primary">
//                     <div className="result-label">Current SGPA</div>
//                     <div className="result-value">{result.current_gpa || 0}</div>
//                     <div className="result-grade">
//                       {result.current_gpa >= 9 ? "👑 Outstanding" : 
//                        result.current_gpa >= 8 ? "🥇 Excellent" :
//                        result.current_gpa >= 7 ? "🥈 Very Good" :
//                        result.current_gpa >= 6 ? "👍 Good" : "📈 Keep Going"}
//                     </div>
//                   </div>
//                   <div className="result-card secondary">
//                     <div className="result-label">Total Credits</div>
//                     <div className="result-value">{result.total_credits || 0}</div>
//                   </div>
//                   <div className="result-card secondary">
//                     <div className="result-label">Subjects</div>
//                     <div className="result-value">{subjects.length}</div>
//                   </div>
//                 </div>

//                 <div className="chart-container">
//                   <h4>Grade Distribution</h4>
//                   <ResponsiveContainer width="100%" height={400}>
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                       <XAxis dataKey="subject" stroke="#a78bfa" />
//                       <YAxis stroke="#a78bfa" />
//                       <Tooltip />
//                       <Bar dataKey="grade" fill="url(#gradeGradient)" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </>
//             ) : (
//               <div className="empty-results">
//                 <div className="empty-icon">📊</div>
//                 <h3>No Results Yet</h3>
//                 <p>Add subjects and calculate to see your CGPA analysis</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CGPACalculator;

// frontend/src/components/CGPACalculator.js - FIXED VERSION
// frontend/src/components/CGPACalculator.js - 100% FIXED
import React, { useState, useEffect, useCallback } from "react";
import { cgpaAPI } from "../api";
import "./CGPACalculator.css";

function CGPACalculator({ isTeacher = false, className = "" }) {
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("S1");
  const [currentSubjectCode, setCurrentSubjectCode] = useState("");
  const [currentGrade, setCurrentGrade] = useState("");
  const [marks, setMarks] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // GRADE DISPLAY
  const GRADE_DISPLAY = {
    'O': 'Outstanding (10)', 'A+': 'Excellent (9)', 'A': 'Very Good (8)',
    'B+': 'Good (7)', 'B': 'Average (6)', 'C': 'Pass (5)',
    'F': 'Fail (0)', 'SA': 'Shortage (0)', 'W': 'Withdrawal (0)'
  };

  // Load saved data
  useEffect(() => {
    const savedKey = `cgpa_${studentId}_${semester}`;
    const saved = localStorage.getItem(savedKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setResult(parsed);
      setMarks(parsed.marks || {});
    }
  }, [studentId, semester]);

  // Add Mark
  const addMark = useCallback(() => {
    if (!currentSubjectCode || !currentGrade) {
      alert("Please enter both subject code and grade!");
      return;
    }

    const subjectCode = currentSubjectCode.toUpperCase().trim();
    const grade = currentGrade.toUpperCase().trim();

    if (marks[subjectCode]) {
      alert(`Subject ${subjectCode} already exists!`);
      return;
    }

    setMarks(prev => ({
      ...prev,
      [subjectCode]: grade
    }));

    // Clear inputs
    setCurrentSubjectCode("");
    setCurrentGrade("");
  }, [currentSubjectCode, currentGrade, marks]);

  const removeMark = (subjectCode) => {
    setMarks(prev => {
      const newMarks = { ...prev };
      delete newMarks[subjectCode];
      return newMarks;
    });
  };

  const handleCalculate = async () => {
    if (Object.keys(marks).length === 0) {
      alert("Add at least one subject first! 📚");
      return;
    }

    if (!studentId) {
      alert("Enter Student ID! 🆔");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        student_id: parseInt(studentId),
        marks: marks
      };

      console.log("🚀 Sending to Flask:", payload);

      const response = await cgpaAPI.calculateStudentCGPA(payload);
      
      console.log("✅ Flask Response:", response.data);

      if (response.data.error) {
        alert(`Error: ${response.data.error}`);
        return;
      }

      const fullResult = {
        ...response.data,
        marks,
        semester
      };

      setResult(fullResult);
      
      const savedKey = `cgpa_${studentId}_${semester}`;
      localStorage.setItem(savedKey, JSON.stringify(fullResult));
      
      alert(`✅ CGPA Calculated!\nCurrent GPA: ${fullResult.current_gpa}\nCGPA: ${fullResult.cgpa}`);
      
    } catch (error) {
      console.error("🔴 CGPA Error:", error.response?.data || error.message);
      alert(`Failed to calculate CGPA:\n${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED: ESLint Clean clearAll()
  const requestClearAll = () => {
    setConfirmAction(() => () => {
      setMarks({});
      setResult(null);
      setCurrentSubjectCode("");
      setCurrentGrade("");
      localStorage.removeItem(`cgpa_${studentId}_${semester}`);
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  // 🔥 CUSTOM CONFIRM MODAL COMPONENT
  const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
      <div className="confirm-overlay" onClick={onClose}>
        <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
          <h3>⚠️ {title}</h3>
          <p>{message}</p>
          <div className="confirm-actions">
            <button 
              onClick={onConfirm} 
              className="confirm-danger-btn"
            >
              ✅ Yes, Clear All
            </button>
            <button 
              onClick={onClose}
              className="confirm-cancel-btn"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const marksCount = Object.keys(marks).length;

  return (
    <div className={`cgpa-calculator ${className}`}>
      <div className="cgpa-header">
        <h2>🧮 CGPA Calculator</h2>
        <div className="input-row">
          <input
            type="number"
            placeholder="🆔 Student ID (e.g., 12345)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="student-id-input"
          />
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)}
            className="semester-select"
          >
            <option value="S1">Semester 1</option>
            <option value="S2">Semester 2</option>
            <option value="S3">Semester 3</option>
            <option value="S4">Semester 4</option>
            <option value="S5">Semester 5</option>
            <option value="S6">Semester 6</option>
            <option value="S7">Semester 7</option>
            <option value="S8">Semester 8</option>
          </select>
        </div>
        <div className="marks-counter">
          📚 {marksCount} subjects added
        </div>
      </div>

      <div className="marks-input-section">
        <h3>➕ Add Subject Mark</h3>
        <div className="input-pair">
          <input
            type="text"
            placeholder="Subject Code (e.g., HS3152, CS3351)"
            value={currentSubjectCode}
            onChange={(e) => setCurrentSubjectCode(e.target.value)}
            className="subject-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentGrade) {
                addMark();
              }
            }}
          />
          <select 
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            className="grade-select"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentSubjectCode) {
                addMark();
              }
            }}
          >
            <option value="">Select Grade</option>
            {Object.entries(GRADE_DISPLAY).map(([grade, display]) => (
              <option key={grade} value={grade}>{display}</option>
            ))}
          </select>
        </div>
        
        <div className="marks-actions">
          <button 
            onClick={addMark} 
            disabled={!currentSubjectCode.trim() || !currentGrade}
            className="add-btn"
          >
            ➕ Add Subject ({marksCount + 1})
          </button>
          <button 
            onClick={handleCalculate} 
            disabled={loading || marksCount === 0 || !studentId}
            className="calculate-btn"
          >
            {loading ? "🔄 Calculating..." : `🚀 Calculate CGPA (${marksCount} subjects)`}
          </button>
          <button onClick={requestClearAll} className="clear-btn">
            🗑️ Clear All
          </button>
        </div>
      </div>

      {marksCount > 0 && (
        <div className="marks-list">
          <h3>📋 Current Marks ({marksCount} subjects)</h3>
          {Object.entries(marks).map(([code, grade]) => (
            <div key={code} className="mark-item">
              <span className="mark-code">{code}</span>
              <span className={`grade-badge ${grade.toLowerCase().replace('+', 'plus')}`}>
                {grade}
              </span>
              <button 
                onClick={() => removeMark(code)}
                className="remove-mark"
                title="Remove subject"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="results-card">
          <h3>📊 Results for {semester}</h3>
          <div className="key-results">
            <div className="result-item">
              <span>Current GPA (This Semester):</span>
              <strong>{result.current_gpa?.toFixed(2) || 'N/A'}</strong>
            </div>
            <div className="result-item">
              <span>Overall CGPA:</span>
              <strong>{result.cgpa?.toFixed(2) || 'N/A'}</strong>
            </div>
            <div className="result-item">
              <span>Semester Credits:</span>
              <strong>{result.semester_credits || 0}</strong>
            </div>
          </div>
          
          {result.updated_gpa_list && result.updated_gpa_list.length > 1 && (
            <div className="gpa-history">
              <h4>📈 GPA History</h4>
              <div className="history-grid">
                {result.updated_gpa_list.map((gpa, idx) => (
                  <div key={idx} className="history-item">
                    <span>S{idx + 1}</span>
                    <span>{gpa.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 🔥 CONFIRM MODAL - ESLint SAFE */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setConfirmAction(null);
        }}
        onConfirm={confirmAction}
        title="Clear All Data"
        message="This will delete all marks, results, and local storage for this student/semester. Are you sure?"
      />
    </div>
  );
}

// 🔥 CONFIRM MODAL COMPONENT (ESLint SAFE)
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>⚠️ {title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button 
            onClick={onConfirm} 
            className="confirm-danger-btn"
          >
            ✅ Yes, Clear All
          </button>
          <button 
            onClick={onClose}
            className="confirm-cancel-btn"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;
