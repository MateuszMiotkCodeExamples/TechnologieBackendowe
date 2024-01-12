const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'test'; // Nazwa Twojej bazy danych
const client = new MongoClient(url);

async function getSpecialsFromDatabase() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('specials');
        return await collection.find({}).toArray();
    } finally {
        await client.close();
    }
}

module.exports = getSpecialsFromDatabase;

