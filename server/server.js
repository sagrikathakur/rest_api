import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import userRegisterRoutes from './routes/userRegisterRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/register', userRegisterRoutes);
app.use('/api/userRegister', userRegisterRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
