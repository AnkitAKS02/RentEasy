import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGOOSE_SECRET_KEY) {
      throw new Error("MONGOOSE_SECRET_KEY is not defined in .env");
    }

    // Check if it's Atlas connection (mongodb+srv)
    const isAtlas = process.env.MONGOOSE_SECRET_KEY.startsWith("mongodb+srv");

    await mongoose.connect(process.env.MONGOOSE_SECRET_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: isAtlas, // enable TLS only for Atlas
    });

    console.log(
      `MongoDB connected successfully (${isAtlas ? "Atlas" : "Localhost"})`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
