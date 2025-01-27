import express from 'express';
import AuthController from '../controllers/AuthController';
import ContentHandler from '../controllers/ContentHandler';

const contentRoute = express.Router();

contentRoute.get('/articles', AuthController.verifyToken,
  ContentHandler.getArticlesByTopics);
contentRoute.get('/videos', AuthController.verifyToken,
  ContentHandler.getVideosByTopics);

export default contentRoute;
