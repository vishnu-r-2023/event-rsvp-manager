import mongoose from 'mongoose';

export let connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log("Mongo DB Connected");
    }
    catch(err){
        console.log(err);
    }
}