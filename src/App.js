import { About } from './components/About';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (

    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home key="H893y62983ome" />} />
            <Route exact path="/about" element={<About key="Abo921379182ut" />} />
            <Route exact path="/login" element={<Login key="login" />} />
            <Route exact path="/signup" element={<Signup/>} /> {/* key="signup" */}
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
