import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`) // see why do we have to write the two name mainly the second name 
        console.log(`Mongodb connected : DB host ${connectionInstance.connection.host}`) 
    } catch (error) {
        console.log(`Error while connecting : ${error.message}`)
    }
}

export default connectDb;