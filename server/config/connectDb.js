import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected");
    }
    catch(err){
        console.log(process.env.MONGODB_URL);
        console.log(`Database Error: ${err}`);
    }
}

export default connectDB;