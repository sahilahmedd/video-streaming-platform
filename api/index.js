import dotenv from 'dotenv';
import connectDB from '../src/db/index.js';
import { app } from '../src/app.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB().catch(console.error);

// Export the Express app as a Vercel serverless function
export default app;
