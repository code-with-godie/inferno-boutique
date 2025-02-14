import mongoose from 'mongoose';
const connectToDB = async () => {
  try {
    let connection = {};
    if (connection?.isConnected) {
      console.log('using existing connection');
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to the database');
    connection = db.connections[0].readyState;
    return;
  } catch (error) {
    throw new Error(error);
  }
};
export default connectToDB;
