import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // 1. Імпортуємо cookie-parser
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js'; // 2. Імпортуємо роутер аутентифікації
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger); 
app.use(express.json()); 
app.use(cookieParser()); // 3. Застосовуємо middleware для зчитування кукі
app.use(cors());

// 4. Реєструємо маршрути
app.use('/auth', authRoutes); 
app.use('/notes', notesRoutes); 

app.use(errors());

app.use(notFoundHandler);
app.use(errorHandler);

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
startServer();







