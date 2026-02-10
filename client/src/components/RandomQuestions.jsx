import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function RandomQuestions() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://theorypro-backend.onrender.com/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      });
  }, []);

  const startQuiz = (category) => {
    navigate(`/Quiz/${encodeURIComponent(category)}`);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <section className="mb-20">
      <h2 className="text-center text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-4xl font-pj">
        Start Practicing Instantly
      </h2>
      <h3 class="text-xl text-center mt-5 font-bold leading-tight text-gray-900 sm:text-4xl xl:text-2xl font-pj">
        Practice questions from all categories and see how exam-ready you
        are.
      </h3>

      <button
      className="flex items-center justify-center md:w-auto mx-auto bg-orange-700 hover:bg-blue-dark text-white font-bold px-6 py-5 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
        onClick={() => navigate("/quiz/random")}
      >
        Take a 50 Question Mock Test
      </button>
    </section>
  );
}

export default RandomQuestions;
