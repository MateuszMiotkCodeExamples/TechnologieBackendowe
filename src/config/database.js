//./src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', err => {
            console.error('Błąd połączenia z MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Utracono połączenie z MongoDB');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Błąd podczas łączenia z MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;