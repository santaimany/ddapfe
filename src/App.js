
import Home from "./components/Home.jsx";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SignUp from "./components/Signup.jsx";
import Aboutus from "./components/Aboutus";
import './index.css';
import 'aos/dist/aos.css';
import Program from "./components/Program";
import React from "react";
import Contactus from './components/Contactus';
import BlogPages from "./components/Blogpages";
import Blogs from "./components/Blogs";





function App() {

   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus/>}/>
          <Route path="/program" element={<Program/>}/>
          <Route path="/contact" element={<Contactus/>}/>
          <Route path='/blog' element={<BlogPages/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
      </Routes>
    </Router>

  );
}

export default App;
