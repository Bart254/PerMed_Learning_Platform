// Api server
import cors from 'cors';
import express from 'express';
import route from './routes/index';
import userRoute from './routes/user';
import topicRoute from './routes/topic';
import contentRoute from './routes/content';
import 'dotenv/config';

// create application
const app = express();

// allow cross-origin resource sharing
app.use(cors());

// allow json data in post request
app.use(express.json());

// use all defined routes
app.use(route);
app.use(userRoute);
app.use(topicRoute);
app.use(contentRoute);

// initiate the app to listen @port 5000
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.listen(port, 'localhost', () => {
  console.log(`App listening @${host}:${port}`);
});
