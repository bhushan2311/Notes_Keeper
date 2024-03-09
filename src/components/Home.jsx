import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';


export const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <AddNote />
        <h2>Your Notes</h2>
        <Notes />
      </div>
    </div>
  )
}