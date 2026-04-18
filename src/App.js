import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Forsiden med hjul + to-do liste */}
        <Route path="/" element={<Home />} />

        {/* Profil-siden (uden css lige nu) */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
