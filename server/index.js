const express = require('express')
const app = express()
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'student_database'
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const gpa = req.body.gpa

  const sqlInsert = "INSERT INTO students (name, email, gpa) VALUES (?,?,?)"
  db.query(sqlInsert, [name, email, gpa], (err, result) => {
    console.log(result)
  })


})

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM students WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, gpa } = req.body;
  const query = "UPDATE students SET name = ?, email = ?, gpa = ? WHERE id = ?"
  db.query(query, [name, email, gpa, id], (error, results) => {
    if (error) {
      console.error('Error updating student:', error);
      res.status(500).send('An error occurred while updating the student.');
    } else if (results.affectedRows === 0) {
      console.warn('No student found for the provided ID:', id);
      res.status(404).send('Student not found.');
    } else {
      console.log('Student updated successfully:', id);
      res.status(200).send('Student updated successfully.');
    }
  }
  );
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});