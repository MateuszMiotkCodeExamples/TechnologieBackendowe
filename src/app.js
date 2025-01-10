//./src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Inicjalizacja aplikacji
const app = express();

// Połączenie z bazą danych
connectDB();

// Middleware bezpieczeństwa i logowania
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsowanie body
app.use(express.json({ limit: '10kb' })); // Limit wielkości requestu
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Podstawowy endpoint zdrowia aplikacji
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Routy API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Obsługa nieznalezionych endpointów
app.use(notFound);

// Centralny handler błędów
app.use(errorHandler);

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
    console.log(`Środowisko: ${process.env.NODE_ENV}`);
});