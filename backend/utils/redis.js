// nodejs redis-client
import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.isConnected = true;
    this.client = createClient();
    this.client.on('error', (err) => {
      console.error(err);
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
    this.client.get = promisify(this.client.get).bind(this.client);
  }

  /**
  * isAlive - checks if redis-client is connected to the db
  * Return: true if connected, otherwise False
  */
  isAlive() {
    return this.isConnected;
  }

	/**
	 * get - returns value from redis-db
	 * @key: key whose value is to be returned
	 */
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

	/**
	 * set - stores a key-value pair
	 * @key: key
	 * @value: value to be stored
	 * @duration: time in seconds
	 */
  async set(key, value, duration) {
    await this.client.setex(key, duration, value);
  }

	/**
	 * del - deletes data from redis-db
	 * @key: key for value to be deleted
	 */
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
