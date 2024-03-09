import React, { useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote} = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      getNote();
    }
    else{
      navigate("/login");
    }
  }, []);

  const [detail, setDetail] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setDetail({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const ref = useRef(null);

  const refClose = useRef(null);


  const onChange = (event) => {
    setDetail({ ...detail, [event.target.name]: event.target.value });
  }

  const handleClick = () => {
    // console.log(detail);
    editNote(detail.id, detail.etitle, detail.edescription, detail.etag);
    refClose.current.click();
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* -------------- Form-start -------------- */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    name="etitle"
                    id="etitle"
                    value={detail.etitle}
                    className="form-control"
                    aria-describedby="emailHelp"
                    onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    value={detail.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    value={detail.etag}
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange} />
                </div>
              </form>
              {/* -------------- Form-end -------------- */}
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={detail.etitle.length < 4 && detail.edescription.length < 4} type="button" className="btn btn-primary" onClick={handleClick}>Edit Changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>


        {notes.length===0? <div className='container'>Please Add notes</div>: notes.map((elem) => {
          // return <NoteItem ztitle={elem.title} desc={elem.description}/>
          return <NoteItem key={notes._id} note={elem} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes;