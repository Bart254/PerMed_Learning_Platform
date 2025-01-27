// root apis
import express from 'express';
import AppController from '../controllers/AppController';

const route = express.Router();

route.get('/status', AppController.getStatus);
route.get('/stats', AppController.getStats);

export default route;
