//./src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../middleware/validationMiddleware');
const User = require('../models/User');

// Wszystkie ścieżki w tym routerze wymagają autentykacji
router.use(authenticate);

// Ścieżki dla zalogowanego użytkownika
router.get('/profile',
    userController.getProfile
);

router.patch('/profile',
    validateProfileUpdate,
    userController.updateProfile
);

// Ścieżki administracyjne (tylko dla admina)
router.get('/list',
    authorize('admin'),
    userController.getAllUsers
);

router.patch('/deactivate/:id',
    authorize('admin'),
    userController.deactivateUser
);

// Dodatkowe endpointy administracyjne
router.get('/stats',
    authorize('admin'),
    async (req, res, next) => {
        try {
            const stats = await User.aggregate([
                {
                    $group: {
                        _id: '$role',
                        count: { $sum: 1 },
                        activeUsers: {
                            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
                        }
                    }
                }
            ]);

            res.json({
                success: true,
                stats
            });
        } catch (error) {
            next(error);
        }
    }
);

// Obsługa błędów dla tej grupy routingu
router.use((err, req, res, next) => {
    console.error('User Route Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Błąd podczas przetwarzania żądania użytkownika'
    });
});

module.exports = router;