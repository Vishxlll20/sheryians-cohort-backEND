import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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

  function getdata() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

  useEffect(() => {
    getdata();
  }, []);

  function submithandler(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    console.log(title.value, description.value)
    axios.post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(res => {
        console.log(res.data);

        getdata()
      });
  }

  function deletehandler(noteId){
    console.log(noteId)
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      getdata();
    })

    }
  
  return (
    <div className="bg-black h-screen p-10">
      <form className="ml-50" onSubmit={submithandler}>
        <input
        name="title"
          placeholder="Enter Title"
          type="text"
          className="bg-gray-300 rounded-xl text-black p-2 m-2"
        />
        <input
        name="description"
          placeholder="Enter Description"
          type="text"
          className="bg-gray-300 rounded-xl text-black p-2 m-2 "
        />
        <button className="bg-gray-300 rounded-xl text-black p-2">
          Submit form
        </button>
      </form>
      <div className="flex flex-wrap">
         {notes.map((notes, idx) => {
        return (
          <div
            key={idx}
            className="bg-gray-500 w-80 text-2xl p-5 rounded-2xl m-5 ml-50"
          >
            <h1 className="text-white">{notes.title}</h1>
            <p className="text-white">{notes.description}</p>
            <button className="bg-gray-300 p-2 rounded-xl" onClick={()=>{deletehandler(notes._id)}}>Delete</button>
          </div>
        );
      })}
      </div>
     
    </div>
  );
}

export default App;
