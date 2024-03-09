import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const InitialNotes = [];
  const [notes, setNotes] = useState(InitialNotes);
  
  // ------------------- Get all note --------------------

  const getNote = async () => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);   
    console.log(notes);         // shows empty
  }


  // ------------------- Add Note -------------------
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const note = await response.json();
    setNotes(notes.concat(note));                   // .push pushes note in array & .concat pushes notes and returns array
    getNote();
  }

  // ------------------- Delete Note -------------------
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    const notesAfterDelete = notes.filter(note => { return id !== note._id });
    // setNotes(notes.filter(note=>{return id!==note._id}));     // note is a object
    setNotes(notesAfterDelete);
  }

  // ------------------- Edit Note -------------------
  const editNote = async (id, title, description, tag) => {
    // API Call
    const url = `http://localhost:8000/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag })
    })
    getNote();
    // const json = response.json();
    // console.log(json);
    
    // Logic to edit note in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     console.log("itheee");
    //     notes[index].title = title;
    //     console.log(notes[index].title);
    //     notes[index].description = description;
    //     console.log(notes[index].description);
    //     notes[index].tag = tag;
    //     console.log(notes[index].tag);
    //     console.log(notes[index]);
    //     break;
    //   }
    // }

  //   const newNotes = notes.map(note => {
  //     if (note._id === id) {
  //         return {...note , title , description , tag} ;
  //     }
  //     return note;
  // });
  // // logic to edit in client
  // setNotes(prev => newNotes);

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>  {/* value={{notes:notes, setnotes:setNotes}} passing */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;