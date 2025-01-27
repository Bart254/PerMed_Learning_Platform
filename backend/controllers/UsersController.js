// handles user creation and authentication
import bcrypt from 'bcrypt';
import dbClient from '../utils/db';

const createErrorResponse = (message, code = 400) => ({ success: false, code, error: message });

export default class UsersController {
  // Register a new user
  static async postNew(req, resp) {
    const { username, email, password } = req.body;

    // Validate input
    if (!username) return resp.status(400).json(createErrorResponse('Missing username'));
    if (!email) return resp.status(400).json(createErrorResponse('Missing email'));
    if (!password) return resp.status(400).json(createErrorResponse('Missing password'));

    try {
      // Check if username or email already exists
      const [userNameExists, emailExists] = await Promise.all([
        dbClient.db.collection('users').findOne({ username }),
        dbClient.db.collection('users').findOne({ email }),
      ]);

      if (userNameExists) return resp.status(400).json(createErrorResponse('Username already exists'));
      if (emailExists) return resp.status(400).json(createErrorResponse('Email already registered'));

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        selectedTopics: [],
      };
      const result = await dbClient.db.collection('users').insertOne(newUser);

      return resp.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { id: result.insertedId, email },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return resp.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }

  // Get user profile
  static async getProfile(req, resp) {
    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });
      if (!user) return resp.status(404).json(createErrorResponse('User not found', 404));

      return resp.status(200).json({
        success: true,
        data: { email: user.email, username: user.username },
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      return resp.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }

  // Delete account
  static async delAccount(req, resp) {
    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.userId });
      if (!user) return resp.status(404).json(createErrorResponse('User not found', 404));

      await dbClient.db.collection('users').deleteOne({ _id: req.userId });
      return resp.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return resp.status(500).json(createErrorResponse('Internal server error', 500));
    }
  }
}
