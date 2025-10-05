import express from "express";
import dotenv from "dotenv";
import connectDB from './lib/db.js'
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();


app.listen(() => {
    connectDB();
    console.log("Server running on PORT",PORT);
})