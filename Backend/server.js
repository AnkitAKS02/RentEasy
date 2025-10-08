import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

import  connectDB  from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth_route.js'
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
//resume builder -- done
app.use('/api/auth', authRoutes);




app.use(cors());

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port:${PORT}`);
})