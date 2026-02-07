const express = require("express");
const notesModel = require("../models/notes.model");
const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note Created Successfully",
    note,
  });
  console.log(req.body);
});

app.get("/notes", async (req, res) => {
  const note = await notesModel.find();
  res.status(200).json({
    message: "Data Fetched Successfully",
    note,
  });
});

module.exports = app;
