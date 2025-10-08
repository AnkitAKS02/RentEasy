import mongoose  from "mongoose";

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_SECRET_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected to localhost');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;