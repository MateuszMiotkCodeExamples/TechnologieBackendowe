//controllers/employeeControler.js
const mongoose = require('mongoose');
const Employee = require('../models/employee');
const Department = require("../models/department");
const {Specialist} = require("../models/employee");

// Tworzenie nowego pracownika za pomocą metody `save()`
exports.createEmployee = async (req, res) => {
    const { name, email, dob, address, phone, department } = req.body;

    try {
        const employee = new Employee({ name, email, dob, address, phone, department });
        await employee.save();
        res.status(201).json({
            success: true,
            message: "Pracownik zapisany pomyślnie.",
            data: employee
        });
    } catch (err) {
        // Obsługa błędów walidacji
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas zapisywania pracownika." });
    }
};

// Wstawianie wielu pracowników za pomocą `insertMany()`
exports.insertManyEmployees = async (req, res) => {
    const employees = req.body.employees;

    try {
        const result = await Employee.insertMany(employees);
        res.status(201).json({
            message: "Pracownicy zapisani pomyślnie za pomocą metody insertMany().",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Wystąpił błąd podczas wstawiania pracowników." });
    }
};

// Tworzenie pracowników za pomocą `create()`
exports.createEmployees = async (req, res) => {
    const employees = Array.isArray(req.body) ? req.body : [req.body];

    try {
        const result = await Employee.create(employees);
        res.status(201).json({
            message: "Pracownicy zapisani pomyślnie za pomocą metody create().",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Wystąpił błąd podczas tworzenia pracowników." });
    }
};

// Odczyt wszystkich pracowników za pomocą `find()`
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania pracowników." });
    }
};

// Odczyt jednego pracownika za pomocą `findOne()`
exports.getOneEmployee = async (req, res) => {
    const query = req.query;

    try {
        const employee = await Employee.findOne(query);
        if (!employee) {
            return res.status(404).json({ error: "Pracownik nie znaleziony." });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Wystąpił błąd podczas pobierania pracownika." });
    }
};

// Odczyt pracownika po ID za pomocą `findById()`
exports.getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id).populate('department', 'name location');
        if (!employee) {
            return res.status(404).json({ success: false, data: "Pracownik o podanym ID nie istnieje." });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas pobierania pracownika." });
    }
};

// Aktualizacja pracownika za pomocą `findByIdAndUpdate()` z pełnymi danymi
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, dob, address, phone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, data: "Podaj poprawny klucz (ID)." });
    }

    if (!name || !dob || !address || !phone) {
        return res.status(400).json({ success: false, data: "Wszystkie pola są wymagane: name, dob, address, phone." });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: { name, dob, address, phone } },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, data: "Pracownik o podanym ID nie istnieje." });
        }

        res.status(200).json({ success: true, data: updatedEmployee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas aktualizacji pracownika." });
    }
};

// Aktualizacja wielu pracowników za pomocą `update()` z pełnymi danymi
exports.updateMultipleEmployees = async (req, res) => {
    const { filter, update } = req.body;

    if (!filter || !update) {
        return res.status(400).json({ success: false, data: "Wymagane są pola: filter, update." });
    }

    if (!update.name || !update.dob || !update.address || !update.phone) {
        return res.status(400).json({ success: false, data: "Wszystkie pola są wymagane do aktualizacji: name, dob, address, phone." });
    }

    try {
        const result = await Employee.update(
            filter,
            { $set: update },
            { multi: true, runValidators: true }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ success: false, data: "Nie znaleziono pracowników do aktualizacji." });
        }

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas aktualizacji pracowników." });
    }
};

// Usuwanie wielu pracowników za pomocą `remove()`
exports.deleteEmployees = async (req, res) => {
    const filter = req.query;

    try {
        const result = await Employee.deleteMany(filter);
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, data: "Nie znaleziono pracowników do usunięcia." });
        }
        res.status(200).json({ success: true, message: "Pracownicy usunięci pomyślnie." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas usuwania pracowników." });
    }
};

// Usuwanie pojedynczego pracownika za pomocą `findOneAndRemove()`
exports.deleteOneEmployee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, data: "Podaj poprawny klucz (ID)." });
    }

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ _id: id });
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, data: "Pracownik o podanym ID nie istnieje." });
        }
        res.status(200).json({ success: true, message: "Pracownik usunięty pomyślnie." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas usuwania pracownika." });
    }
};

// Tworzenie pracownika i działu w ramach transakcji
exports.createEmployeeWithDepartment = async (req, res) => {
    const { name, email, dob, address, phone, departmentName, departmentLocation } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Tworzenie działu
        const department = new Department({ name: departmentName, location: departmentLocation });
        await department.save({ session });

        // Tworzenie pracownika z referencją do działu
        const employee = new Employee({
            name,
            email,
            dob,
            address,
            phone,
            department: department._id
        });
        await employee.save({ session });

        // Zatwierdzenie transakcji
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Pracownik i dział zapisani pomyślnie.",
            data: { employee, department }
        });
    } catch (err) {
        // Wycofanie transakcji w przypadku błędu
        await session.abortTransaction();
        session.endSession();

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        if (err.code === 11000) { // Błąd unikalności
            return res.status(400).json({ success: false, error: "Dział lub email pracownika już istnieje." });
        }
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas tworzenia pracownika i działu." });
    }
};

// Agregacja: Liczba pracowników w każdym dziale
exports.getEmployeeCountByDepartment = async (req, res) => {
    try {
        const result = await Employee.aggregate([
            {
                $group: {
                    _id: "$department",
                    employeeCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "departmentInfo"
                }
            },
            {
                $unwind: "$departmentInfo"
            },
            {
                $project: {
                    _id: 0,
                    departmentId: "$_id",
                    departmentName: "$departmentInfo.name",
                    employeeCount: 1
                }
            }
        ]);

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas agregacji danych." });
    }
};

// Agregacja: Średni wiek pracowników w każdym dziale
exports.getAverageAgeByDepartment = async (req, res) => {
    try {
        const result = await Employee.aggregate([
            {
                $project: {
                    department: 1,
                    age: {
                        $divide: [
                            { $subtract: [new Date(), "$dob"] },
                            1000 * 60 * 60 * 24 * 365
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$department",
                    averageAge: { $avg: "$age" }
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "departmentInfo"
                }
            },
            {
                $unwind: "$departmentInfo"
            },
            {
                $project: {
                    _id: 0,
                    departmentId: "$_id",
                    departmentName: "$departmentInfo.name",
                    averageAge: { $round: ["$averageAge", 1] }
                }
            }
        ]);

        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas agregacji danych." });
    }
};

// Tworzenie specjalisty
exports.createSpecialist = async (req, res) => {
    const { name, email, dob, address, phone, department, specialty } = req.body;

    try {
        const specialist = new Specialist({ name, email, dob, address, phone, department, specialty });
        await specialist.save();
        res.status(201).json({
            success: true,
            message: "Specjalista zapisany pomyślnie.",
            data: specialist
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, errors: messages });
        }
        if (err.code === 11000) { // Błąd unikalności
            return res.status(400).json({ success: false, error: "Email pracownika już istnieje." });
        }
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas zapisywania specjalisty." });
    }
};

// Odczyt specjalisty po ID z populate
exports.getSpecialistById = async (req, res) => {
    const { id } = req.params;

    try {
        const specialist = await Specialist.findById(id).populate('department', 'name location');
        if (!specialist) {
            return res.status(404).json({ success: false, data: "Specjalista o podanym ID nie istnieje." });
        }
        res.status(200).json(specialist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Wystąpił błąd podczas pobierania specjalisty." });
    }
};