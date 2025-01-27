// MongoDB NodeJs Client
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'permed';
    const url = `mongodb://${host}:${port}/${database}`;

    // create client
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.isConnected = false;

    // connect to the database
    this.client.connect()
      .then((client) => {
        this.isConnected = true;
        this.db = client.db(database);
      }).catch((err) => {
        console.error(err);
      });
  }

  // check if connection is successful
  isAlive() {
    return this.isConnected;
  }

  // gets stats on nb of documents in every collection
  async getStats() {
    const collections = {
      users: 0,
      topics: 0,
      content: 0,
      quizzes: 0,
    };

    for (const coll in collections) {
      const nb = await this.db.collection(coll).countDocuments();
      collections[coll] = nb;
    }

    return collections;
  }
}

// create an Instance
const dbClient = new DBClient();
export default dbClient;
