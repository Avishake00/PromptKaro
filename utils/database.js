import mongoose from "mongoose"


let isConncted=false;

export const connectDB=async()=>{
    mongoose.set('strictQuery',true);

    if(isConncted){
        console.log("mongodb already connected");
        return;
    }

    try {
       await mongoose.connect(`${process.env.MONGO_URI}`,{
        dbName:"share_prompt",
        useNewUrlParser:true,
        useUnifiedTopology:true,
       });
       isConncted=true;
       console.log("mongoDB connected");

    } catch (error) {
        console.log("mongodb connection error",error);
    }

}