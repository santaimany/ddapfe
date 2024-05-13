
import Home from "./components/Home.jsx";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SignUp from "./components/Signup.jsx";
import Aboutus from "./components/Aboutus";
import './index.css';
import 'aos/dist/aos.css';
import Program from "./components/Program";
import React from "react";





function App() {

   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<Aboutus/>}/>
          <Route path="/program" element={<Program/>}/>
      </Routes>
    </Router>

  );
}

export default App;
