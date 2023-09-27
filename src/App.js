import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ColorTest from "./components/ColorTest";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router basename="HexGuesser">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<ColorTest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
