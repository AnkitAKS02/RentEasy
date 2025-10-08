import express from "express";
import dotenv from "dotenv";
import connectDB from './lib/db.js'
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.get('/',(req,res)=>{
    res.send("its running");
})
app.listen(PORT,() => {
    connectDB();
    console.log("Server running on PORT",PORT);
})