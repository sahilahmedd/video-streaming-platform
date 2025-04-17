import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Initilzating the express app
const app = express();


// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Express configuration to accept DATA
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser()); //To manage cookies CRUD opreations




export { app };