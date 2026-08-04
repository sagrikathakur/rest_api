import express from 'express';
import dotenv from 'dotenv';
dotenv.config()


const myServer = express()
const port = process.env.PORT;

// middleware//
myServer.use(express.json())
// route//
myServer.get('/', (req, res) => {
  res.send('hello')
})

// listen//

myServer.listen(port, () => {
  console.log(`server is running on the ${port}`)
})