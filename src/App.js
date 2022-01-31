import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonSingle from "./pages/PokemonSingle";
import ErrorPage from "./pages/ErrorPage/ErrorPage";


import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:id" element={<PokemonSingle />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
