import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
 
const AddNote = () => {
  const context = useContext(noteContext)
  const {addNote} = context;
  const [detail, setDetail] = useState({title:"", description:"",tag:"default"})

  const onChange = (event)=>{

    /* '...detail' is a spread operator. It tells whatever the previous values of the detail object remains same 
     and add/override the properties to that values being written in []: . Each value corresponds to the name will add to title,desc and tag */
    setDetail({...detail, [event.target.name]:event.target.value});

    // ******* Above single line of code replacing below whole Angela Yu's explained code in 37.video of react js ********
    /*const name = event.target.name;
    const value = event.target.value;
    setDetail((prevValue)=>{
        if(name==="title"){
            return{
                title:value,
                description:prevValue.description,
                tag:prevValue.tag
            }
        }
        else if(name==="description"){
            return{
                title:prevValue.title,
                description:value,
                tag:prevValue.tag
            }
        }
        if(name==="tag"){
            return{
                title:prevValue.title,
                description:prevValue.description,
                tag:value
            }
        }
    }) */
  }

  const handleClick = (e)=>{
    // e.preventDefault();
    addNote(detail.title, detail.description, detail.tag);
  }

  return (
    <div className="container my-3" > {/* style={{border:'2px solid black'}} */}
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                className="form-control" 
                aria-describedby="emailHelp" 
                onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input 
                type="text" 
                className="form-control" 
                id="description" 
                name="description"
                onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input 
                type="text" 
                className="form-control" 
                id="tag" 
                name="tag"
                onChange={onChange}/>
          </div>
          <button disabled={detail.title.length<4 && detail.description.length<4} type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
        </form>
      </div>
  )
}

export default AddNote;