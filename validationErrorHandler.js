// validationErrorHandler.js

const { validationResult } = require('express-validator');

/**
 * Middleware do obsługi błędów walidacji.
 * Sprawdza, czy w żądaniu wystąpiły błędy walidacyjne i zwraca je w sformatowanej formie.
 * Jeśli błędów nie ma, przekazuje kontrolę do następnego middleware lub handlera.
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Tworzymy obiekt z błędami, gdzie kluczem jest nazwa pola, a wartością tablica komunikatów
        const extractedErrors = {};
        errors.array().forEach(err => {
            if (!extractedErrors[err.param]) {
                extractedErrors[err.param] = [];
            }
            extractedErrors[err.param].push(err.msg);
        });

        return res.status(400).json({
            errors: extractedErrors,
        });
    }
    next();
};

module.exports = { handleValidationErrors };
