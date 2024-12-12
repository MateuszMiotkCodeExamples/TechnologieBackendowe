// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Tworzenie pracownika za pomocą `save()`
router.post('/save', employeeController.createEmployee);

// Wstawianie wielu pracowników za pomocą `insertMany()`
router.post('/insertMany', employeeController.insertManyEmployees);

// Tworzenie pracowników za pomocą `create()`
router.post('/create', employeeController.createEmployees);

// Odczyt wszystkich pracowników
router.get('/employees', employeeController.getAllEmployees);

// Odczyt jednego pracownika za pomocą `findOne()`
router.get('/employee', employeeController.getOneEmployee);

// Odczyt pracownika po ID za pomocą `findById()`
router.get('/employees/:id', employeeController.getEmployeeById);

// Aktualizacja pracownika za pomocą `findByIdAndUpdate()`
router.put('/employees/:id', employeeController.updateEmployee);

// Aktualizacja wielu pracowników za pomocą `update()`
router.put('/employees/update-multiple', employeeController.updateMultipleEmployees);

// Usuwanie wielu pracowników za pomocą `remove()`
router.delete('/employees', employeeController.deleteEmployees);

// Usuwanie jednego pracownika za pomocą `findOneAndRemove()`
router.delete('/employees/remove-one/:id', employeeController.deleteOneEmployee);

module.exports = router;
