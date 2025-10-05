import express from "express";
import dotenv from "dotenv";
import connectDB from './lib/db.js'
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.listen(PORT,() => {
    connectDB();
    console.log("Server running on PORT",PORT);
})