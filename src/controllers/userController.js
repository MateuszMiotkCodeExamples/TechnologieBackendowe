//./src/controllers/userController.js
const User = require('../models/User');

class UserController {
    async getProfile(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Nie znaleziono użytkownika'
                });
            }

            res.json({
                success: true,
                user
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const userId = req.user.id;
            const { email } = req.body;

            // Sprawdzenie czy email nie jest już zajęty
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({
                    success: false,
                    message: 'Ten adres email jest już zajęty'
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { email },
                { new: true, runValidators: true }
            ).select('-password');

            res.json({
                success: true,
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            // Dodanie podstawowej paginacji
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const users = await User.find()
                .select('-password')
                .skip(skip)
                .limit(limit);

            const total = await User.countDocuments();

            res.json({
                success: true,
                users,
                pagination: {
                    current: page,
                    total: Math.ceil(total / limit),
                    totalRecords: total
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async deactivateUser(req, res, next) {
        try {
            const userId = req.params.id;

            // Sprawdzenie czy użytkownik nie próbuje dezaktywować sam siebie
            if (userId === req.user.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Nie możesz dezaktywować własnego konta'
                });
            }

            const user = await User.findByIdAndUpdate(
                userId,
                { isActive: false },
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Nie znaleziono użytkownika'
                });
            }

            res.json({
                success: true,
                message: 'Konto zostało dezaktywowane',
                user
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();