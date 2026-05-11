import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import {connectMongoDB} from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
const PORT  = process.env.PORT || 3000;
const app = express();


app.use(logger); 
app.use(express.json()); 
app.use(cors());

const startServer = async () => {
  try {
    await connectMongoDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();




app.use('/', notesRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

