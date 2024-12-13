// models/employee.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definicja schematu pracownika (bazowego)
const employeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Imię jest wymagane'],
        minlength: [3, 'Imię musi mieć co najmniej 3 znaki'],
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} nie jest poprawnym adresem email`
        }
    },
    dob: {
        type: Date,
        required: [true, 'Data urodzenia jest wymagana'],
        validate: {
            validator: function(v) {
                return v < Date.now();
            },
            message: 'Data urodzenia musi być przeszła'
        },
        index: true
    },
    address: {
        type: String,
        required: [true, 'Adres jest wymagany']
    },
    phone: {
        type: String,
        required: [true, 'Numer telefonu jest wymagany'],
        validate: {
            validator: function(v) {
                return /^\d{9}$/.test(v);
            },
            message: props => `${props.value} nie jest poprawnym numerem telefonu. Powinien mieć 9 cyfr.`
        }
    },
    state: {
        type: String,
        enum: ['aktywny', 'nieaktywny'],
        default: 'aktywny',
        index: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Dział jest wymagany'],
        index: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Employee', 'Specialist']
    }
}, { discriminatorKey: 'role', timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

// Definiowanie modelu Specialist jako discriminatora Employee
const specialistSchema = new Schema({
    specialty: {
        type: String,
        required: [true, 'Specjalizacja jest wymagana']
    }
});

const Specialist = Employee.discriminator('Specialist', specialistSchema);

module.exports = { Employee, Specialist };