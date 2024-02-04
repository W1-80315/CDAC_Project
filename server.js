const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'W1_80315_Parag',
  password: 'parag',
  database: 'EducationalManagementSystem',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET: Retrieve data from a table
app.get('/students', (req, res) => {
  db.query('SELECT * FROM Students', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// POST: Insert data into a table
app.post('/students', (req, res) => {
  const newStudent = req.body;
  db.query('INSERT INTO Students SET ?', newStudent, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student added successfully', result });
  });
});

// PUT: Update data in a table
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;
  db.query('UPDATE Students SET ? WHERE StudentID = ?', [updatedStudent, studentId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student updated successfully', result });
  });
});

// DELETE: Delete data from a table
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  db.query('DELETE FROM Students WHERE StudentID = ?', studentId, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student deleted successfully', result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
