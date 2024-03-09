import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export const About = () => {

  const a = useContext(noteContext);
  return (
    <div>
        This is about {a.name} and she is class {a.class}
    </div>
  )
}
