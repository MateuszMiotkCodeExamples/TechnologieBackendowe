// models/department.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definicja schematu działu
const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nazwa działu jest wymagana'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'Lokalizacja działu jest wymagana']
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;