import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRegisterRouter from './routes/userRegister.js';
import authRouter from './routes/authRoutes.js';
import { initOtpTable } from './models/otpModel.js';
import { safeJsonParser } from './middlewares/jsonParser.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const myServer = express();
const port = process.env.PORT || 3000;

// Initialize database tables
initOtpTable();

// Middlewares
myServer.use(cors());
myServer.use(express.json());
myServer.use(express.urlencoded({ extended: true }));
myServer.use(safeJsonParser);


// Routes
myServer.get('/', (req, res) => {
  res.send('hello');
});
myServer.use('/auth', authRouter);
myServer.use('/api/auth', authRouter);
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


