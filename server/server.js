const app = require("./src/app") ; 
const connectDB = require("./src/config/db")
require("dotenv").config()



connectDB().then(()=>{
    console.log("database connected");
    app.listen(process.env.PORT , ()=>{
        console.log(`server is running on ${process.env.PORT}`) ; 
    })
}).catch(()=>{
    
    console.log("error connecting database.")
})
