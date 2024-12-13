// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const departmentController = require('../controllers/departmentController');

// Tworzenie pracownika z referencją do działu
router.post('/save', employeeController.createEmployee);

// Wstawianie wielu pracowników
router.post('/insertMany', employeeController.insertManyEmployees);

// Tworzenie pracowników za pomocą `create()`
router.post('/create', employeeController.createEmployees);

// Tworzenie nowego działu
router.post('/departments', departmentController.createDepartment);

// Odczyt wszystkich działów
router.get('/departments', departmentController.getAllDepartments);

// Odczyt wszystkich pracowników
router.get('/employees', employeeController.getAllEmployees);

// Odczyt jednego pracownika
router.get('/employee', employeeController.getOneEmployee);

// Odczyt pracownika po ID z populate
router.get('/employees/:id', employeeController.getEmployeeById);

// Aktualizacja pracownika z pełnymi danymi
router.put('/employees/:id', employeeController.updateEmployee);

// Aktualizacja wielu pracowników
router.put('/employees/update-multiple', employeeController.updateMultipleEmployees);

// Usuwanie wielu pracowników
router.delete('/employees', employeeController.deleteEmployees);

// Usuwanie jednego pracownika
router.delete('/employees/remove-one/:id', employeeController.deleteOneEmployee);

router.post('/createWithDepartment', employeeController.createEmployeeWithDepartment);

// Agregacja: Liczba pracowników w każdym dziale
router.get('/aggregate/employee-count-by-department', employeeController.getEmployeeCountByDepartment);

// Agregacja: Średni wiek pracowników w każdym dziale
router.get('/aggregate/average-age-by-department', employeeController.getAverageAgeByDepartment);

// Tworzenie specjalisty
router.post('/createSpecialist', employeeController.createSpecialist);

// Odczyt specjalisty po ID z populate
router.get('/specialists/:id', employeeController.getSpecialistById);

module.exports = router;