// routes for user and authentication
import express from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const userRoute = express.Router();

// register a new account
userRoute.post('/register', UsersController.postNew);

// login
userRoute.post('/login', AuthController.connect);

// get user profile
userRoute.get('/profile', AuthController.verifyToken,
  UsersController.getProfile);

// delete user account
userRoute.delete('/user/delete', AuthController.verifyToken,
  UsersController.delAccount);

export default userRoute;
