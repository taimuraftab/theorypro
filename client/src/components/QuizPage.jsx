import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import QuestionCard from "./QuestionCard";


function QuizPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://theorypro-backend.onrender.com/api/questions/${category}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const selected =
          decodedCategory.toLowerCase() === "random"
            ? shuffled.slice(0, 50)
            : shuffled;
        setQuizQuestions(selected);
        setCurrent(0);
        setSelected(null);
        setShowExplanation(false);
        setResults([]);
        setUserAnswers([]);
      });
  }, [category]);

  const score = results.filter((r) => r === "correct").length;
  const isLast = current === quizQuestions.length - 1;

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    const q = quizQuestions[current];
    const isCorrect =
      option.label === q.correct_answer || option.image === q.correct_answer;
    setResults((prev) => [...prev, isCorrect ? "correct" : "wrong"]);
    setUserAnswers((prev) => [...prev, option]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setShowExplanation(false);
  };

  const handleBack = () => {
    if (results.length === 0) {
      navigate("/");
    } else {
      const confirmLeave = window.confirm(
        `Your current score: ${score} / ${quizQuestions.length}\n\nAre you sure you want to go back? Your progress will be lost.`,
      );
      if (confirmLeave) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (current >= quizQuestions.length && quizQuestions.length > 0) {
      navigate(`/result/${category}`, {
        state: { results, questions: quizQuestions, userAnswers },
        replace: true,
      });
    }
  }, [current, quizQuestions, results, userAnswers, category, navigate]);

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-slate-200">
        <Spinner />
      </div>
    );
  }

  if (current >= quizQuestions.length) {
    navigate(`/result/${category}`, {
      state: { results, questions: quizQuestions, userAnswers },
      replace: true,
    });
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-slate-200 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                {decodedCategory.charAt(0).toUpperCase() +
                  decodedCategory.slice(1)}{" "}
                Questions
              </h1>

              <p className="text-slate-500 mt-2 text-sm md:text-base">
                Question{" "}
                <span className="font-semibold text-slate-700">
                  {current + 1}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {quizQuestions.length}
                </span>
              </p>
            </div>
          </div>

          <div className="flex h-2 w-full overflow-hidden rounded-full border border-slate-200 mb-10">
            {quizQuestions.map((_, index) => {
              const status = results[index];

              const bgColor =
                status === "correct"
                  ? "bg-emerald-500"
                  : status === "wrong"
                    ? "bg-rose-500"
                    : "bg-transparent";

              return (
                <div
                  key={index}
                  className={`${bgColor} flex-1 transition-colors duration-300 border-r border-slate-200 last:border-r-0`}
                />
              );
            })}
          </div>

          {quizQuestions.length > 0 && quizQuestions[current] && (
            <div className="mb-8">
              <QuestionCard
                questionData={quizQuestions[current]}
                selected={selected}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {showExplanation && (
            <div className="mt-6 p-6 md:p-8 rounded-2xl bg-linear-to-br from-slate-50 to-white border border-slate-200 shadow-inner">
              <p className="text-slate-700 leading-relaxed text-[15px] md:text-base mb-6">
                <span className="font-semibold text-slate-900">
                  Explanation:
                </span>{" "}
                {quizQuestions[current].explanation}
              </p>

              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-2xl px-8 py-3 font-semibold text-white bg-orange-700 hover:bg-orange-600 hover:cursor-pointer active:scale-[0.98] transition-all duration-200 shadow-lg"
              >
                {isLast ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center flex-wrap gap-4">
            <div className="text-sm text-slate-500">
              Score:{" "}
              <span className="font-semibold text-slate-700">{score}</span>
            </div>

            <button
              onClick={handleBack}
              className="rounded-2xl px-6 py-3 font-medium border  text-white bg-orange-700 hover:bg-orange-600 transition-colors duration-200"
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
