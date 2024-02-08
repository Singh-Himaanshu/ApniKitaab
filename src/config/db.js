import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  }).then(() => {
    console.log("Connected to db!...");
  }).catch((error) => {
    console.log("Error: " + error.message);
  })
}

export default connectDB
