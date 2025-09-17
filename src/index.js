// require('dotenv').config({path: './env'})

// import mongoose from 'mongoose';
// import express from 'express';
// import { DB_NAME } from './constants';

import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`App is listening on port: ${process.env.PORT}`);
            });
            app.on("error", (error) => {
                console.log("Error: ", error);
                throw error
            })
        })
        .catch((err) => {
            console.log("MONGO db connection error: ", err);

        })
}


/*
const app = express();

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error", error);
            throw error
        });

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on ${process.env.PORT}`);
            
        })

    } catch (error) {
        console.error("Error", error);
        throw error
    }
})()
*/