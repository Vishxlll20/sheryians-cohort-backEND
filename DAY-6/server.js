const app = require("./src/app");
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://Vishal:CZQYaMQwDfMee82I@cluster0.eyyuk2g.mongodb.net/DAY-6")
    .then(()=>{
        console.log("Connected to Database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})