// routes for handling  user topics
import express from 'express';
import TopicsController from '../controllers/TopicsController';
import AuthController from '../controllers/AuthController';

const topicRoute = express.Router();

// adding topic to user account
topicRoute.post('/auth/topic/add', AuthController.verifyToken,
  TopicsController.addTopic);

// deleting topic from user account
topicRoute.post('/auth/topic/delete', AuthController.verifyToken,
  TopicsController.deleteTopic);

// getting all subscribed topics
topicRoute.get('/auth/topics', AuthController.verifyToken,
  TopicsController.getTopics);

// get all available topics
topicRoute.get('/all/topics', TopicsController.getAllTopics);

export default topicRoute;
