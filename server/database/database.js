const { MongoClient } = require('mongodb');

async function DBConnection() {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    return await client.connect();
}

module.exports = { DBConnection }