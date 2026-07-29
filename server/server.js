// creating a server//

import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

// creating a server instance//

const server = express();
const port = process.env.PORT || 5000;

// middleware//
server.use(express.json());

// routes//
server.get("/", (req, res) => {
  res.send("hello");
});

server.use("/notes", notesRoutes);

// listen//
server.listen(port, () => {
  console.log(`server is running at ${port}`);
});