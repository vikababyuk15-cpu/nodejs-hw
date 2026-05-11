import mongoose from 'mongoose';

export const  connectMongoDB = async () => {
  try {
    const { MONGO_URL} = process.env;

    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
    

  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1); 
  }
};

