import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRegisterRouter from './routes/userRegister.js';

dotenv.config();

const myServer = express();
const port = process.env.PORT || 3000;

// middleware
myServer.use(cors());
myServer.use(express.json());

// routes
myServer.get('/', (req, res) => {
  res.send('hello');
});

myServer.use('/api', userRegisterRouter);

// listen
myServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
