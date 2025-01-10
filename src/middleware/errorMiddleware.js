//./src/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Obsługa błędów walidacji mongoose
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({
            success: false,
            message: 'Błąd walidacji danych',
            errors: messages
        });
    }

    // Obsługa błędów duplicate key (np. zduplikowany email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `Ten ${field} jest już zajęty`
        });
    }

    // Obsługa błędów Cast (np. nieprawidłowe ID)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Nieprawidłowy format danych'
        });
    }

    // Obsługa błędów JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Nieprawidłowy token'
        });
    }

    // Logowanie błędów w środowisku deweloperskim
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            message: err.message,
            stack: err.stack
        });
    }

    // Domyślna odpowiedź dla pozostałych błędów
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Wystąpił błąd serwera',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Nie znaleziono endpointu: ${req.originalUrl}`
    });
};

module.exports = {
    errorHandler,
    notFound
};