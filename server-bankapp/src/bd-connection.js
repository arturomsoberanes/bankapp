const { MongoClient } = require('mongodb');
const url = 'mongodb://db:27017';
const client = new MongoClient(url);
const dbName = 'bankapp';

async function connection() {
  // Use connect method to connect to the server
  await client.connect();
  return 'Connected to database.';
}

module.exports = {
  dbName,
  client,
  connection
}

