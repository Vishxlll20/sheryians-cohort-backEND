const express = require('express');

const app = express();

app.use(express.json())
const notes = []

app.get('/notes',(req,res)=>{
   res.send("Hello World")
})

app.post('/notes',(req,res)=>{
     console.log(req.body)
     notes.push(req.body)
     console.log(notes)
    res.send("Note Created")
})

module.exports = app;