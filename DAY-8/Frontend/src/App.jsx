import React from "react";
import { useState } from "react";
import axios from 'axios'

const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "First Note",
      description: "This is the first note",
    },
    {
      title: "Second Note",
      description: "This is the second note",
    },
    {
      title: "Third Note",
      description: "This is the third note",
    },
    {
      title: "Fourth Note",
      description: "This is the fourth note",
    },
  ]);

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setnotes(res.data.notes)
  })

  return (
    <div className="bg-black h-screen p-10">
      {notes.map((notes,idx) => {
        return (
          <div key = {idx}className="bg-gray-500 w-80 text-2xl p-5 rounded-2xl m-5 ml-50">
            <h1 className="text-white">{notes.title}</h1>
            <p className="text-white">{notes.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
