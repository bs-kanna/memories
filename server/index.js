import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);

// Database Connection
const CONNECTION_URL = 'mongodb+srv://mongo:1234@fullstack.duvvdgy.mongodb.net/?retryWrites=true&w=majority&appName=fullstack';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Only start the server once the database connection is successful
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error.message} - Database connection failed`);
  });

// Disable deprecated Mongoose methods
mongoose.set('useFindAndModify', false);
