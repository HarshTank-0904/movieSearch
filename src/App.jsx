import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Single from './components/Single';
import Navbar from './components/Navbar';
import Favourite from './components/Favourite';

const App = () => {

  const url = "http://www.omdbapi.com/?apikey=51594f22&";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;