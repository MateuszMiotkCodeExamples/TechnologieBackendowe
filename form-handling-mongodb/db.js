//db.js
const credentials = require('./credentials.development.json')
const mongoose = require('mongoose')
const { connectionString } = credentials.mongo
if(!connectionString) {
    console.error('MongoDB connection string missing!')
    process.exit(1)
}
mongoose.connect(connectionString)
const Vacation = require('./models/vacation')
const db = mongoose.connection
db.on('error', err => {
    console.error('MongoDB error: ' + err.message)
    process.exit(1)
})
db.once('open', () => console.log('MongoDB connection established'))

async function createVacations() {
    try {
        const vacations = await Vacation.find();
        if (vacations.length) return;

        await new Vacation({
            name: 'Rock Climbing in Bend',
            slug: 'rock-climbing-in-bend',
            category: 'Adventure',
            sku: 'B99',
            description: 'Experience the thrill of climbing in the high desert.',
            location: {
                search: 'Bend, Oregon, USA',
            },
            price: 289.95,
            tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
            inSeason: true,
            requiresWaiver: true,
            maximumGuests: 4,
            available: false,
            packagesSold: 0,
            notes: 'The tour guide is currently recovering from a skiing accident.',
        }).save()

        await new Vacation({
            name: 'Oregon Coast Getaway',
            slug: 'oregon-coast-getaway',
            category: 'Weekend Getaway',
            sku: 'OC39',
            description: 'Enjoy the ocean air and quaint coastal towns!',
            location: {
                search: 'Cannon Beach, Oregon, USA',
            },
            price: 269.95,
            tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
            inSeason: false,
            maximumGuests: 8,
            available: true,
            packagesSold: 0,
        }).save()

        await new Vacation({
            name: 'Hood River Day Trip',
            slug: 'hood-river-day-trip',
            category: 'Day Trip',
            sku: 'HR199',
            description: 'Spend a day sailing on the Columbia and ' +
                'enjoying craft beers in Hood River!',
            location: {
                search: 'Hood River, Oregon, USA',
            },
            price: 99.95,
            tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
            inSeason: true,
            maximumGuests: 16,
            available: true,
            packagesSold: 0,
        }).save();
    } catch (err) {
        console.error(err);
    }
}

const VacationInSeasonListener = require('./models/vacationInSeasonListener')
module.exports = {
    getVacations: async (options = {}) => Vacation.find(options),
    addVacationInSeasonListener: async (email, sku) => {
        await VacationInSeasonListener.updateOne(
            { email },
            { $push: { skus: sku } },
            { upsert: true }
        )
    },
}