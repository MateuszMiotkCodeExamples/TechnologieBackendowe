// controllers/departmentController.js
const Department = require('../models/department');

// Tworzenie nowego działu
exports.createDepartment = async (req, res) => {
    const { name, location } = req.body;

    try {
        const department = new Department({ name, location });
        await department.save();
        res.status(201).json({
            success: true,
            message: "Dział zapisany pomyślnie.",
            data: department
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        if (err.code === 11000) { // Błąd unikalności
            return res.status(400).json({ success: false, error: "Dział o tej nazwie już istnieje." });
        }
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas zapisywania działu." });
    }
};

// Odczyt wszystkich działów
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas pobierania działów." });
    }
};