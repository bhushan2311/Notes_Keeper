import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const {note, updateNote} = props

    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className="card col-md-3 mx-5 my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <button type="button" onClick={()=>{updateNote(note)}} className="btn btn-primary mx-1">Edit</button>
                    <button type="button" className="btn btn-danger mx-1" onClick={()=>{deleteNote(note._id)}}>Delete</button>
                </div>
                {/* <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.desc}</p>
                </div> */}
        </div>
    )
}

export default NoteItem;