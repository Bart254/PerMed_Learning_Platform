import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

const createErrorResponse = (message, code = 400) => ({ success: false, code, error: message });

export default class AuthController {
  // Login user
  static async connect(req, resp) {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return resp.status(401).json(createErrorResponse('Missing username or password', 401));
    }

    try {
      // Find user by username or email
      const user = await dbClient.db.collection('users').findOne({
        $or: [{ username }, { email: username }],
      });
      if (!user) {
        return resp.status(401).json(createErrorResponse('Invalid username or password', 401));
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return resp.status(401).json(createErrorResponse('Invalid username or password', 401));
      }

      // Generate JWT
      const secretKey = process.env.SECRET_KEY;
      const payload = { id: user._id.toString(), email: user.email, username: user.username };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      const allTopics = await dbClient.db.collection('topics').find({}).toArray();

      return resp.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          username: user.username,
          selectedTopics: user.selectedTopics || [], // Include already selected topics
          availableTopics: allTopics.map(topic => topic.name), // Send all available topics
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return resp.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }

  // Verify JWT token middleware
  static verifyToken(req, resp, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return resp.status(401).json(createErrorResponse('Unauthorized', 401));
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return resp.status(401).json(createErrorResponse('Unauthorized', 401));
      }
      req.userId = new ObjectId(user.id);
      next();
    });
  }
}
