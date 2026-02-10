import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="/Quiz/:category" element={<QuizPage />} />
      <Route path="/Result/:category" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
