const express = require("express");

const app = express();
app.use(express.json());

let students = [
  { id: 583, studentName: "Harshita", totalMarks: 450 },
  { id: 402, studentName: "Varun", totalMarks: 420 },
  { id: 503, studentName: "Sneha", totalMarks: 465 }
];

// GET: Retrieve all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET: Retrieve a student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST: Add a new student
app.post("/students", (req, res) => {
  const { id, studentName, totalMarks } = req.body;

  if (
    !Number.isInteger(id) ||
    typeof studentName !== "string" ||
    !studentName.trim() ||
    !Number.isInteger(totalMarks)
  ) {
    return res.status(400).json({
      message: "Provide a valid integer id, studentName and integer totalMarks"
    });
  }

  if (students.some(s => s.id === id)) {
    return res.status(409).json({ message: "Student ID already exists" });
  }

  const student = { id, studentName: studentName.trim(), totalMarks };
  students.push(student);

  res.status(201).json(student);
});

// PUT: Replace an existing student's data
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { studentName, totalMarks } = req.body;

  if (
    typeof studentName !== "string" ||
    !studentName.trim() ||
    !Number.isInteger(totalMarks)
  ) {
    return res.status(400).json({
      message: "Provide a valid studentName and integer totalMarks"
    });
  }

  student.studentName = studentName.trim();
  student.totalMarks = totalMarks;

  res.status(200).json(student);
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student microservice running on port ${PORT}`);
});