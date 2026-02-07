const express = require('express');

const app = express();

app.use(express.json())
const notes = []

// app.get('/notes',(req,res)=>{
//    res.send("Hello World")
// })
//POST NOTES
app.post('/notes',(req,res)=>{
     console.log(req.body)
     notes.push(req.body)
     console.log(notes)
    res.send("Note Created")
})

//GET NOTES
app.get('/notes',(req,res)=>{
   res.send(notes)
})

//DELETE NOTES

app.delete('/notes/:index',(req,res)=>{
   delete notes[req.params.index]

   res.send("Note Deleted Successfully");
})

//UPDATE NOTES

app.patch('/notes/:index',(req,res)=>{
   notes[req.params.index].description = req.body.description

   res.send("Notes Updated Successfully")
})

module.exports = app;