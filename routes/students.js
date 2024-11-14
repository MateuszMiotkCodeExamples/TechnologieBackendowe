// routes/students.js
const express = require('express');
const router = express.Router();

// Przykładowa baza danych w pamięci
let students = [
    { id: 1, name: 'Jan Kowalski', age: 20 },
    { id: 2, name: 'Anna Nowak', age: 22 }
];

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Pobierz listę wszystkich studentów
 *     responses:
 *       200:
 *         description: Lista studentów
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', (req, res) => {
    res.json(students);
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Pobierz studenta po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID studenta
 *     responses:
 *       200:
 *         description: Dane studenta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student nie znaleziony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Dodaj nowego studenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       201:
 *         description: Student dodany pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 */
router.post('/', (req, res) => {
    const newStudent = req.body;
    // Generowanie nowego unikalnego ID
    newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
    students.push(newStudent);
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Aktualizuj dane studenta po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID studenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       200:
 *         description: Student zaktualizowany pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student nie znaleziony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const updatedStudent = req.body;

    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
        // Upewnienie się, że ID pozostaje niezmienione
        updatedStudent.id = studentId;
        students[index] = updatedStudent;
        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     summary: Częściowo aktualizuj dane studenta po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID studenta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentUpdate'
 *     responses:
 *       200:
 *         description: Student zaktualizowany pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student nie znaleziony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.patch('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const updates = req.body;

    const student = students.find(s => s.id === studentId);
    if (student) {
        Object.assign(student, updates);
        res.json({ message: 'Student updated successfully', student });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Usuń studenta po ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID studenta
 *     responses:
 *       200:
 *         description: Student usunięty pomyślnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Student nie znaleziony
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);

    if (index !== -1) {
        students.splice(index, 1);
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

module.exports = router;
