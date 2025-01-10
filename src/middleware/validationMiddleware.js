//./src/middleware/validationMiddleware.js
const validateRegistration = (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

        const errors = [];

        // Walidacja email
        if (!email) {
            errors.push('Email jest wymagany');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Nieprawidłowy format adresu email');
        }

        // Walidacja hasła
        if (!password) {
            errors.push('Hasło jest wymagane');
         }

        // Sprawdzenie czy hasła się zgadzają
        if (password !== confirmPassword) {
            errors.push('Hasła nie są identyczne');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Błędy walidacji',
                errors
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

const validateLogin = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const errors = [];

        // Podstawowa walidacja obecności pól
        if (!email) {
            errors.push('Email jest wymagany');
        }
        if (!password) {
            errors.push('Hasło jest wymagane');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Błędy walidacji',
                errors
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

const validateProfileUpdate = (req, res, next) => {
    try {
        const { email, currentPassword } = req.body;
        const errors = [];

        // Walidacja email przy aktualizacji
        if (email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push('Nieprawidłowy format adresu email');
            }
        }

        // Jeśli przesłano currentPassword, sprawdź czy spełnia wymagania
        if (currentPassword) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordRegex.test(currentPassword)) {
                errors.push('Aktualne hasło nie spełnia wymagań bezpieczeństwa');
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Błędy walidacji',
                errors
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

// Pomocnicze funkcje walidacyjne
const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChar
    );
};

const sanitizeEmail = (email) => {
    return email.trim().toLowerCase();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateProfileUpdate,
    isStrongPassword,
    sanitizeEmail
};