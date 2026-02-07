const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DataBase is Connected");
        
    })
}

module.exports = connectToDb;