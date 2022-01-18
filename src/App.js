import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonSingle from "./pages/PokemonSingle";


import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:id" element={<PokemonSingle />} />
      </Routes>
    </Router>
  );
}

export default App;
