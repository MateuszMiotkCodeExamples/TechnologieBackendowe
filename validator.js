const { check } = require('express-validator');

exports.registrationValidation = [
    check('name', 'Imię jest wymagane').not().isEmpty(),
    check('email', 'Podaj prawidłowy adres e-mail').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Hasło musi mieć co najmniej 8 znaków alfanumerycznych').isLength({ min: 8 })
];
