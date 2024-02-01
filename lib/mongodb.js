import mongoose from "mongoose";


export const connectMongoDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)   
        console.log('connet to db')
    } catch (error) {
        console.log('error to connect db', error);
    }
}