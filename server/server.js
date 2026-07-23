// creating a server//

import express from "express";
import dotenv from "dotenv";
dotenv.config();

// creating a server instance//

const server = express();
const port = process.env.PORT;

// middleware//
server.use(express.json());

// routes//
server.get("/", (req, res) => {
  res.send("hello")
})
// listen//
server.listen(port, () => {
  console.log(`server is running at ${port}`)
})