const express = require('express');

const app = express();

app.use(express.json())

const notes = []

app.post('/notes',(req,res)=>{
    res.status(201).json({
        message : "Notes created successfully"
    })
    console.log(req.body);
    notes.push(req.body)
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
       notes : notes
    })

})

app.delete('/notes/:index',(req,res)=>{

    delete notes[req.params.index]
    res.status(204).json({
        message : "Notes deletedsuccessfully"
    })
    

})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.status(200).json({
        message : "Notes updated successfully"
    })
    console.log(req.body);
    

})

module.exports = app