import mongoose from "mongoose";

const ConnectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName: "VISITOR_MANAGEMENT_SYSTEM"
    })
    console.log("DB connected")
} catch (error) {
    console.error("DB not connected",error.message);
    process.exit(1)
}
};
export default ConnectDB;