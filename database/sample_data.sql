-- Sample Data for Testing
-- Run this after schema.sql to populate the database with test data

-- Note: Admin user is already created in schema.sql

-- Create sample teachers
INSERT INTO users (email, password_hash, role) VALUES 
('john.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher'),
('sarah.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher'),
('mike.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher');
INSERT INTO users (email, password_hash, role) VALUES 
('divya.student@school.com', '$2b$12$z0uSzcXpvIo7iq.Y42jD3uftqUkv5Grhk0sV2zi.mSAg1ZfToKWAG', 'student');
INSERT INTO teachers (user_id, first_name, last_name, phone, qualification, department, hire_date) VALUES
(3, 'John', 'Smith', '555-0101', 'M.Sc Mathematics', 'Mathematics', '2020-08-15'),
(4, 'Sarah', 'Johnson', '555-0102', 'M.Sc Physics', 'Science', '2019-07-01'),
(5, 'Mike', 'Williams', '555-0103', 'M.A English', 'English', '2021-06-10');

-- Create sample classes
INSERT INTO classes (class_name, section, academic_year, teacher_id) VALUES
('10th Grade', 'A', '2024-2025', 10),
('10th Grade', 'B', '2024-2025', 11),
('9th Grade', 'A', '2024-2025', 12);

-- Create sample subjects
INSERT INTO subjects (subject_name, subject_code, class_id, teacher_id, max_marks, pass_marks) VALUES
-- Class 1 (10th A)
('Tamil', 'TM101', 28, 11, 100, 40);
-- ('Mathematics', 'MATH101', 28, 10, 100, 40),
-- ('Physics', 'PHY101', 28, 12, 100, 40),
-- ('Chemistry', 'CHEM101', 28, 12, 100, 40),
-- ('English', 'ENG101', 28, 11, 100, 40),
-- ('Biology', 'BIO101', 28, 10, 100, 40);
-- -- Class 2 (10th B)
-- ,('Mathematics', 'MATH102', 2, 1, 100, 40),
-- ('Physics', 'PHY102', 2, 2, 100, 40),
-- ('English', 'ENG102', 2, 3, 100, 40),
-- -- Class 3 (9th A)
-- ('Mathematics', 'MATH201', 3, 1, 100, 40),
-- ('Science', 'SCI201', 3, 2, 100, 40),
-- ('English', 'ENG201', 3, 3, 100, 40);

-- Create sample students
INSERT INTO users (email, password_hash, role) VALUES 
('alice.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('bob.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('charlie.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('diana.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('ethan.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('fiona.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('george.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('hannah.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('ian.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('julia.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student');

INSERT INTO students (user_id, first_name, last_name, date_of_birth, gender, phone, address, admission_date, class_id, roll_number, blood_group) VALUES
(5, 'Alice', 'Brown', '2008-03-15', 'Female', '555-1001', '123 Oak St', '2023-04-01', 28, '001', 'O+');
-- ,(6, 'Bob', 'Davis', '2008-07-22', 'Male', '555-1002', '456 Elm St', '2023-04-01', 1, '002', 'A+'),
-- (7, 'Charlie', 'Wilson', '2008-11-30', 'Male', '555-1003', '789 Pine St', '2023-04-01', 1, '003', 'B+'),
-- (8, 'Diana', 'Moore', '2008-05-18', 'Female', '555-1004', '321 Maple St', '2023-04-01', 1, '004', 'AB+'),
-- (9, 'Ethan', 'Taylor', '2008-09-25', 'Male', '555-1005', '654 Cedar St', '2023-04-01', 2, '001', 'O-'),
-- (10, 'Fiona', 'Anderson', '2008-02-14', 'Female', '555-1006', '987 Birch St', '2023-04-01', 2, '002', 'A-'),
-- (11, 'George', 'Thomas', '2008-12-03', 'Male', '555-1007', '147 Spruce St', '2023-04-01', 2, '003', 'B-'),
-- (12, 'Hannah', 'Jackson', '2008-08-19', 'Female', '555-1008', '258 Willow St', '2023-04-01', 3, '001', 'AB-'),
-- (13, 'Ian', 'White', '2009-04-27', 'Male', '555-1009', '369 Ash St', '2023-04-01', 3, '002', 'O+'),
-- (14, 'Julia', 'Harris', '2009-01-10', 'Female', '555-1010', '741 Redwood St', '2023-04-01', 3, '003', 'A+');

INSERT INTO students (user_id, first_name, last_name, date_of_birth, gender, phone, address, admission_date, class_id, roll_number, blood_group) VALUES
(31, 'Divya', 'S', '2007-10-15', 'Female', '9443881846', '71 east St', '2023-04-01', 29, '005', 'O+');
-- Create sample parents
INSERT INTO users (email, password_hash, role) VALUES 
('alice.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent'),
('bob.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent'),
('charlie.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent');

INSERT INTO parents (user_id, first_name, last_name, phone, address) VALUES
(15, 'Robert', 'Brown', '555-2001', '123 Oak St'),
(16, 'Susan', 'Davis', '555-2002', '456 Elm St'),
(17, 'Michael', 'Wilson', '555-2003', '789 Pine St');

-- Link parents to students
INSERT INTO parent_student (parent_id, student_id, relationship) VALUES
(1, 22, 'Father');

-- Add sample marks for students (multiple exams)
-- Alice (High performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
-- (22, 50, 'Unit Test 1', 92, 100, '2024-01-15', 'Excellent work', 10),
(22, 51, 'Unit Test 1', 88, 100, '2024-01-16', 'Very good', 11),
(22, 52, 'Unit Test 1', 90, 100, '2024-01-17', 'Outstanding', 12);
-- (1, 4, 'Unit Test 1', 85, 100, '2024-01-18', 'Good effort', 3),
-- (1, 5, 'Unit Test 1', 87, 100, '2024-01-19', 'Well done', 2),
-- (1, 1, 'Midterm', 95, 100, '2024-02-10', 'Excellent', 1),
-- (1, 2, 'Midterm', 91, 100, '2024-02-11', 'Great improvement', 2),
-- (1, 3, 'Midterm', 93, 100, '2024-02-12', 'Superb', 2);

-- Bob (Average performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(2, 1, 'Unit Test 1', 65, 100, '2024-01-15', 'Good', 1),
(2, 2, 'Unit Test 1', 70, 100, '2024-01-16', 'Satisfactory', 2),
(2, 3, 'Unit Test 1', 68, 100, '2024-01-17', 'Can improve', 2),
(2, 4, 'Unit Test 1', 72, 100, '2024-01-18', 'Good', 3),
(2, 5, 'Unit Test 1', 67, 100, '2024-01-19', 'Average', 2),
(2, 1, 'Midterm', 70, 100, '2024-02-10', 'Improving', 1),
(2, 2, 'Midterm', 73, 100, '2024-02-11', 'Better', 2);

-- Charlie (Weak performer - needs attention)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(3, 1, 'Unit Test 1', 35, 100, '2024-01-15', 'Needs improvement', 1),
(3, 2, 'Unit Test 1', 42, 100, '2024-01-16', 'Below expectations', 2),
(3, 3, 'Unit Test 1', 38, 100, '2024-01-17', 'Requires extra help', 2),
(3, 4, 'Unit Test 1', 45, 100, '2024-01-18', 'Struggling', 3),
(3, 5, 'Unit Test 1', 40, 100, '2024-01-19', 'Needs attention', 2),
(3, 1, 'Midterm', 38, 100, '2024-02-10', 'Still struggling', 1),
(3, 2, 'Midterm', 43, 100, '2024-02-11', 'Slight improvement', 2);

-- Diana (Good performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(4, 1, 'Unit Test 1', 78, 100, '2024-01-15', 'Good work', 1),
(4, 2, 'Unit Test 1', 82, 100, '2024-01-16', 'Very good', 2),
(4, 3, 'Unit Test 1', 80, 100, '2024-01-17', 'Well done', 2),
(4, 4, 'Unit Test 1', 85, 100, '2024-01-18', 'Excellent', 3),
(4, 1, 'Midterm', 81, 100, '2024-02-10', 'Consistent', 1);

-- Add more marks for other students (abbreviated)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, teacher_id) VALUES
(5, 6, 'Unit Test 1', 75, 100, '2024-01-15', 1),
(5, 7, 'Unit Test 1', 78, 100, '2024-01-16', 2),
(6, 6, 'Unit Test 1', 82, 100, '2024-01-15', 1),
(6, 8, 'Unit Test 1', 85, 100, '2024-01-18', 3),
(7, 6, 'Unit Test 1', 55, 100, '2024-01-15', 1),
(7, 7, 'Unit Test 1', 58, 100, '2024-01-16', 2),
(8, 9, 'Unit Test 1', 88, 100, '2024-01-15', 1),
(8, 10, 'Unit Test 1', 90, 100, '2024-01-16', 2),
(9, 9, 'Unit Test 1', 45, 100, '2024-01-15', 1),
(9, 11, 'Unit Test 1', 48, 100, '2024-01-18', 3);

-- Add sample attendance
INSERT INTO attendance (student_id, class_id, date, status, marked_by) VALUES
-- January 2024 (20 days)
(22, 28, '2024-01-08', 'present', 10),
-- (1, 1, '2024-01-09', 'present', 1),
-- (1, 1, '2024-01-10', 'present', 1),
-- (1, 1, '2024-01-11', 'present', 1),
-- (1, 1, '2024-01-12', 'present', 1),
-- (2, 1, '2024-01-08', 'present', 1),
(22, 28, '2024-01-09', 'absent', 10),
(22, 28, '2024-01-10', 'present', 10),
-- (2, 1, '2024-01-11', 'present', 1),
-- (3, 1, '2024-01-08', 'absent', 1),
-- (3, 1, '2024-01-09', 'absent', 1),
-- (3, 1, '2024-01-10', 'present', 1),
(22, 28, '2024-01-11', 'late', 12),
(22, 28, '2024-01-12', 'absent', 11);

-- Add sample notifications
INSERT INTO notifications (sender_id, recipient_id, title, message, type) VALUES
(2, 15, 'Good Performance - Alice', 'Alice scored 92/100 in Mathematics Unit Test 1. Excellent work!', 'marks'),
(2, 16, 'Average Performance - Bob', 'Bob scored 65/100 in Mathematics Unit Test 1. Encouraging improvement.', 'marks'),
(2, 17, 'Attention Required - Charlie', 'Charlie scored 35/100 in Mathematics Unit Test 1. Please schedule a meeting.', 'marks'),
(1, 17, 'Attendance Alert', 'Charlie has been absent for 3 days this week. Please ensure regular attendance.', 'attendance');

-- Summary
SELECT 'Sample data inserted successfully!' as message;
SELECT 'Total Users: ' || COUNT(*) as stats FROM users;
SELECT 'Total Students: ' || COUNT(*) as stats FROM students;
SELECT 'Total Teachers: ' || COUNT(*) as stats FROM teachers;
SELECT 'Total Classes: ' || COUNT(*) as stats FROM classes;
SELECT 'Total Subjects: ' || COUNT(*) as stats FROM subjects;
SELECT 'Total Marks Entries: ' || COUNT(*) as stats FROM marks;
SELECT 'Total Attendance Records: ' || COUNT(*) as stats FROM attendance;

-- All passwords are: admin123 / teacher123 / student123 / parent123
-- Sample Data for Testing
-- Run this after schema.sql to populate the database with test data

-- Note: Admin user is already created in schema.sql

-- Create sample teachers
INSERT INTO users (email, password_hash, role) VALUES 
('john.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher'),
('sarah.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher'),
('mike.teacher@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'teacher');

INSERT INTO teachers (user_id, first_name, last_name, phone, qualification, department, hire_date) VALUES
(2, 'John', 'Smith', '555-0101', 'M.Sc Mathematics', 'Mathematics', '2020-08-15'),
(3, 'Sarah', 'Johnson', '555-0102', 'M.Sc Physics', 'Science', '2019-07-01'),
(4, 'Mike', 'Williams', '555-0103', 'M.A English', 'English', '2021-06-10');

-- Create sample classes
INSERT INTO classes (class_name, section, academic_year, teacher_id) VALUES
('10th Grade', 'A', '2024-2025', 1),
('10th Grade', 'B', '2024-2025', 2),
('9th Grade', 'A', '2024-2025', 3);

-- Create sample subjects
INSERT INTO subjects (subject_name, subject_code, class_id, teacher_id, max_marks, pass_marks) VALUES
-- Class 1 (10th A)
('Mathematics', 'MATH101', 1, 1, 100, 40),
('Physics', 'PHY101', 1, 2, 100, 40),
('Chemistry', 'CHEM101', 1, 2, 100, 40),
('English', 'ENG101', 1, 3, 100, 40),
('Biology', 'BIO101', 1, 2, 100, 40),
-- Class 2 (10th B)
('Mathematics', 'MATH102', 2, 1, 100, 40),
('Physics', 'PHY102', 2, 2, 100, 40),
('English', 'ENG102', 2, 3, 100, 40),
-- Class 3 (9th A)
('Mathematics', 'MATH201', 3, 1, 100, 40),
('Science', 'SCI201', 3, 2, 100, 40),
('English', 'ENG201', 3, 3, 100, 40);

-- Create sample students
INSERT INTO users (email, password_hash, role) VALUES 
('alice.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('bob.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('charlie.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('diana.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('ethan.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('fiona.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('george.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('hannah.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('ian.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student'),
('julia.student@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'student');

INSERT INTO students (user_id, first_name, last_name, date_of_birth, gender, phone, address, admission_date, class_id, roll_number, blood_group) VALUES
(5, 'Alice', 'Brown', '2008-03-15', 'Female', '555-1001', '123 Oak St', '2023-04-01', 1, '001', 'O+'),
(6, 'Bob', 'Davis', '2008-07-22', 'Male', '555-1002', '456 Elm St', '2023-04-01', 1, '002', 'A+'),
(7, 'Charlie', 'Wilson', '2008-11-30', 'Male', '555-1003', '789 Pine St', '2023-04-01', 1, '003', 'B+'),
(8, 'Diana', 'Moore', '2008-05-18', 'Female', '555-1004', '321 Maple St', '2023-04-01', 1, '004', 'AB+'),
(9, 'Ethan', 'Taylor', '2008-09-25', 'Male', '555-1005', '654 Cedar St', '2023-04-01', 2, '001', 'O-'),
(10, 'Fiona', 'Anderson', '2008-02-14', 'Female', '555-1006', '987 Birch St', '2023-04-01', 2, '002', 'A-'),
(11, 'George', 'Thomas', '2008-12-03', 'Male', '555-1007', '147 Spruce St', '2023-04-01', 2, '003', 'B-'),
(12, 'Hannah', 'Jackson', '2008-08-19', 'Female', '555-1008', '258 Willow St', '2023-04-01', 3, '001', 'AB-'),
(13, 'Ian', 'White', '2009-04-27', 'Male', '555-1009', '369 Ash St', '2023-04-01', 3, '002', 'O+'),
(14, 'Julia', 'Harris', '2009-01-10', 'Female', '555-1010', '741 Redwood St', '2023-04-01', 3, '003', 'A+');

-- Create sample parents
INSERT INTO users (email, password_hash, role) VALUES 
('alice.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent'),
('bob.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent'),
('charlie.parent@school.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5idm6L4qnxqeK', 'parent');

INSERT INTO parents (user_id, first_name, last_name, phone, address) VALUES
(15, 'Robert', 'Brown', '555-2001', '123 Oak St'),
(16, 'Susan', 'Davis', '555-2002', '456 Elm St'),
(17, 'Michael', 'Wilson', '555-2003', '789 Pine St');

-- Link parents to students
INSERT INTO parent_student (parent_id, student_id, relationship) VALUES
(1, 1, 'Father'),
(2, 2, 'Mother'),
(3, 3, 'Father');

-- Add sample marks for students (multiple exams)
-- Alice (High performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(1, 1, 'Unit Test 1', 92, 100, '2024-01-15', 'Excellent work', 1),
(1, 2, 'Unit Test 1', 88, 100, '2024-01-16', 'Very good', 2),
(1, 3, 'Unit Test 1', 90, 100, '2024-01-17', 'Outstanding', 2),
(1, 4, 'Unit Test 1', 85, 100, '2024-01-18', 'Good effort', 3),
(1, 5, 'Unit Test 1', 87, 100, '2024-01-19', 'Well done', 2),
(1, 1, 'Midterm', 95, 100, '2024-02-10', 'Excellent', 1),
(1, 2, 'Midterm', 91, 100, '2024-02-11', 'Great improvement', 2),
(1, 3, 'Midterm', 93, 100, '2024-02-12', 'Superb', 2);

-- Bob (Average performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(2, 1, 'Unit Test 1', 65, 100, '2024-01-15', 'Good', 1),
(2, 2, 'Unit Test 1', 70, 100, '2024-01-16', 'Satisfactory', 2),
(2, 3, 'Unit Test 1', 68, 100, '2024-01-17', 'Can improve', 2),
(2, 4, 'Unit Test 1', 72, 100, '2024-01-18', 'Good', 3),
(2, 5, 'Unit Test 1', 67, 100, '2024-01-19', 'Average', 2),
(2, 1, 'Midterm', 70, 100, '2024-02-10', 'Improving', 1),
(2, 2, 'Midterm', 73, 100, '2024-02-11', 'Better', 2);

-- Charlie (Weak performer - needs attention)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(3, 1, 'Unit Test 1', 35, 100, '2024-01-15', 'Needs improvement', 1),
(3, 2, 'Unit Test 1', 42, 100, '2024-01-16', 'Below expectations', 2),
(3, 3, 'Unit Test 1', 38, 100, '2024-01-17', 'Requires extra help', 2),
(3, 4, 'Unit Test 1', 45, 100, '2024-01-18', 'Struggling', 3),
(3, 5, 'Unit Test 1', 40, 100, '2024-01-19', 'Needs attention', 2),
(3, 1, 'Midterm', 38, 100, '2024-02-10', 'Still struggling', 1),
(3, 2, 'Midterm', 43, 100, '2024-02-11', 'Slight improvement', 2);

-- Diana (Good performer)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, remarks, teacher_id) VALUES
(4, 1, 'Unit Test 1', 78, 100, '2024-01-15', 'Good work', 1),
(4, 2, 'Unit Test 1', 82, 100, '2024-01-16', 'Very good', 2),
(4, 3, 'Unit Test 1', 80, 100, '2024-01-17', 'Well done', 2),
(4, 4, 'Unit Test 1', 85, 100, '2024-01-18', 'Excellent', 3),
(4, 1, 'Midterm', 81, 100, '2024-02-10', 'Consistent', 1);

-- Add more marks for other students (abbreviated)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, max_marks, exam_date, teacher_id) VALUES
(5, 6, 'Unit Test 1', 75, 100, '2024-01-15', 1),
(5, 7, 'Unit Test 1', 78, 100, '2024-01-16', 2),
(6, 6, 'Unit Test 1', 82, 100, '2024-01-15', 1),
(6, 8, 'Unit Test 1', 85, 100, '2024-01-18', 3),
(7, 6, 'Unit Test 1', 55, 100, '2024-01-15', 1),
(7, 7, 'Unit Test 1', 58, 100, '2024-01-16', 2),
(8, 9, 'Unit Test 1', 88, 100, '2024-01-15', 1),
(8, 10, 'Unit Test 1', 90, 100, '2024-01-16', 2),
(9, 9, 'Unit Test 1', 45, 100, '2024-01-15', 1),
(9, 11, 'Unit Test 1', 48, 100, '2024-01-18', 3);

-- Add sample attendance
INSERT INTO attendance (student_id, class_id, date, status, marked_by) VALUES
-- January 2024 (20 days)
(1, 1, '2024-01-08', 'present', 1),
(1, 1, '2024-01-09', 'present', 1),
(1, 1, '2024-01-10', 'present', 1),
(1, 1, '2024-01-11', 'present', 1),
(1, 1, '2024-01-12', 'present', 1),
(2, 1, '2024-01-08', 'present', 1),
(2, 1, '2024-01-09', 'absent', 1),
(2, 1, '2024-01-10', 'present', 1),
(2, 1, '2024-01-11', 'present', 1),
(3, 1, '2024-01-08', 'absent', 1),
(3, 1, '2024-01-09', 'absent', 1),
(3, 1, '2024-01-10', 'present', 1),
(3, 1, '2024-01-11', 'late', 1),
(3, 1, '2024-01-12', 'absent', 1);

-- Add sample notifications
INSERT INTO notifications (sender_id, recipient_id, title, message, type) VALUES
(2, 15, 'Good Performance - Alice', 'Alice scored 92/100 in Mathematics Unit Test 1. Excellent work!', 'marks'),
(2, 16, 'Average Performance - Bob', 'Bob scored 65/100 in Mathematics Unit Test 1. Encouraging improvement.', 'marks'),
(2, 17, 'Attention Required - Charlie', 'Charlie scored 35/100 in Mathematics Unit Test 1. Please schedule a meeting.', 'marks'),
(1, 17, 'Attendance Alert', 'Charlie has been absent for 3 days this week. Please ensure regular attendance.', 'attendance');

-- Summary
SELECT 'Sample data inserted successfully!' as message;
SELECT 'Total Users: ' || COUNT(*) as stats FROM users;
SELECT 'Total Students: ' || COUNT(*) as stats FROM students;
SELECT 'Total Teachers: ' || COUNT(*) as stats FROM teachers;
SELECT 'Total Classes: ' || COUNT(*) as stats FROM classes;
SELECT 'Total Subjects: ' || COUNT(*) as stats FROM subjects;
SELECT 'Total Marks Entries: ' || COUNT(*) as stats FROM marks;
SELECT 'Total Attendance Records: ' || COUNT(*) as stats FROM attendance;

-- All passwords are: admin123 / teacher123 / student123 / parent123
