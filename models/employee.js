const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definicja schematu pracownika
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'aktywny'
    }
});

// Tworzenie modelu pracownika
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
