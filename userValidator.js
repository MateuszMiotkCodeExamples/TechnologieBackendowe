// userValidator.js

const { body } = require('express-validator');

const registrationValidator = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('Imię jest wymagane.')
        .isLength({ min: 2, max: 50 }).withMessage('Imię musi mieć od 2 do 50 znaków.'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('Nazwisko jest wymagane.')
        .isLength({ min: 2, max: 50 }).withMessage('Nazwisko musi mieć od 2 do 50 znaków.'),

    body('email')
        .trim()
        .notEmpty().withMessage('Adres e-mail jest wymagany.')
        .isEmail().withMessage('Adres e-mail jest nieprawidłowy.')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Hasło jest wymagane.')
        .isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków.')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Hasło może zawierać tylko litery i cyfry.'),

    body('confirmPassword')
        .notEmpty().withMessage('Potwierdzenie hasła jest wymagane.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Potwierdzenie hasła musi być takie samo jak hasło.');
            }
            return true;
        })
];

module.exports = { registrationValidator };
