import app from "./app.js";
import ConnectDB from "./configDB/DB.js";


ConnectDB();


app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
});
