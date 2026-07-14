
 CREATE DATABASE student_portal;


CREATE DATABASE IF NOT EXISTS student_portal;
USE student_portal;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    instructor VARCHAR(100)
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Sample courses
INSERT INTO courses (title, description, instructor) VALUES
('Introduction to JavaScript', 'Learn the fundamentals of JavaScript: variables, functions, loops, and the DOM.', 'Sarah Kimani'),
('MySQL for Beginners', 'Understand relational databases, SQL queries, joins, and data modeling.', 'David Otieno'),
('Node.js & Express', 'Build web servers and APIs with Node.js and the Express framework.', 'Grace Wanjiru'),
('HTML & CSS Foundations', 'Structure and style modern web pages from scratch.', 'James Mwangi'),
('Git & GitHub Essentials', 'Version control basics: commits, branches, merges, and collaboration.', 'Amina Hassan');