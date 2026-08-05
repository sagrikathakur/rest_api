import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRegisterRouter from './routes/userRegister.js';
import { safeJsonParser } from './middlewares/jsonParser.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const myServer = express();
const port = process.env.PORT;

// Middlewares
myServer.use(cors());
myServer.use(express.json());
myServer.use(express.urlencoded({ extended: true }));
myServer.use(safeJsonParser);


// Routes
myServer.get('/', (req, res) => {
  res.send('hello');
});
myServer.use('/api', userRegisterRouter);

// 404 Route Not Found Handler
myServer.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server.`
  });
});

// Global Error Handler
myServer.use(errorHandler);


// Listen
myServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

