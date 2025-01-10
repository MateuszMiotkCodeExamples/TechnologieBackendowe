//./src/controllers/authController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { comparePassword } = require('../utils/passwordUtils');
const { promisify } = require('util');

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, role } = req.body;

            // Sprawdzenie czy użytkownik już istnieje
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Użytkownik z tym adresem email już istnieje'
                });
            }

            // Utworzenie nowego użytkownika
            const user = await User.create({
                email,
                password,
                role: role || 'user'
            });

            // Generowanie tokenu
            const token = generateToken({ id: user._id });

            // Zwrócenie odpowiedzi bez hasła
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(201).json({
                success: true,
                token,
                user: userResponse
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Sprawdzenie czy podano wymagane pola
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Proszę podać email i hasło'
                });
            }

            // Pobranie użytkownika z bazy wraz z hasłem
            const user = await User.findOne({ email }).select('+password');
            if (!user || !user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Nieprawidłowe dane logowania'
                });
            }

            // Weryfikacja hasła
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Nieprawidłowe dane logowania'
                });
            }

            // Aktualizacja ostatniego logowania
            user.lastLogin = new Date();
            await user.save();

            // Generowanie tokenu
            const token = generateToken({ id: user._id });

            // Przygotowanie odpowiedzi bez hasła
            const userResponse = user.toObject();
            delete userResponse.password;

            res.json({
                success: true,
                token,
                user: userResponse
            });
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req, res, next) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            // Pobranie użytkownika z hasłem
            const user = await User.findById(userId).select('+password');

            // Weryfikacja aktualnego hasła
            const isCurrentPasswordValid = await comparePassword(
                currentPassword,
                user.password
            );

            if (!isCurrentPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Aktualne hasło jest nieprawidłowe'
                });
            }

            // Aktualizacja hasła
            user.password = newPassword;
            await user.save();

            res.json({
                success: true,
                message: 'Hasło zostało zmienione'
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res) {
        // W przypadku JWT, właściwe wylogowanie powinno być obsługiwane po stronie klienta
        // poprzez usunięcie tokenu. Tutaj możemy tylko potwierdzić operację.
        res.json({
            success: true,
            message: 'Wylogowano pomyślnie'
        });
    }
}

module.exports = new AuthController();