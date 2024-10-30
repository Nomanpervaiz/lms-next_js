import mongoose from 'mongoose';

let connection = null;

export async function connectDB() {
  if (connection && connection.readyState === 1) {
    return connection;
  }
  
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("Connection Error: ", err);
  }
}
