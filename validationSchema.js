// validationSchema.js

const { checkSchema } = require('express-validator');

const registrationSchema = checkSchema({
    firstName: {
        in: ['body'],
        trim: true,
        notEmpty: {
            errorMessage: 'Imię jest wymagane.',
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Imię musi mieć od 2 do 50 znaków.',
        },
        matches: {
            options: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/,
            errorMessage: 'Imię może zawierać tylko litery.',
        },
    },
    lastName: {
        in: ['body'],
        trim: true,
        notEmpty: {
            errorMessage: 'Nazwisko jest wymagane.',
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'Nazwisko musi mieć od 2 do 50 znaków.',
        },
        matches: {
            options: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/,
            errorMessage: 'Nazwisko może zawierać tylko litery.',
        },
    },
    email: {
        in: ['body'],
        trim: true,
        notEmpty: {
            errorMessage: 'Adres e-mail jest wymagany.',
        },
        isEmail: {
            errorMessage: 'Adres e-mail jest nieprawidłowy.',
        },
        normalizeEmail: true,
    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Hasło jest wymagane.',
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Hasło musi mieć co najmniej 8 znaków.',
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).+$/,
            errorMessage: 'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny (@, $, !, %, *, ?, &, #).',
        },
    },
    confirmPassword: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Potwierdzenie hasła jest wymagane.',
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Potwierdzenie hasła musi być takie samo jak hasło.');
                }
                return true;
            },
        },
    }
});

module.exports = { registrationSchema };
