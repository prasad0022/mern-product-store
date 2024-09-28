import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.mesage}`);
        process.exit(1) // process code 1 means exit with failure, 0 means success.
    }
};

export default connectToDB;