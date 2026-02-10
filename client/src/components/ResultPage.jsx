import React from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
   const location = useLocation();
  const { category } = useParams();

  const { results, questions, userAnswers } = location.state || {};
   if (!results || !questions || !userAnswers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No results found. Please take the quiz first.</p>
      </div>
    );
  }
  const score = results.filter((r) => r === "correct").length;

  const handleRetake = () => {
     navigate(`/quiz/${category}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Test Completed
            </h1>

            <p className="text-slate-600 text-lg">
              You scored <span className="font-semibold">{score}</span> out of{" "}
              <span className="font-semibold">{questions.length}</span>
            </p>

            <p className="text-rose-500 mt-2">
              Incorrect Answers: {results.filter((r) => r === "wrong").length}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
               onClick={handleRetake}
              className="rounded-xl px-6 py-3 font-semibold text-white bg-orange-700 hover:bg-orange-600 transition-all shadow-md
              hover: cursor-pointer"
            >
              Retake Test
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl px-6 py-3 font-semibold border border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-sm hover:cursor-pointer"
            >
              Choose Another Category
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Questions Review
            </h2>

            <div className="space-y-6">
              {questions.map((q, index) => {
                const result = results[index];
                const userAnswer = userAnswers[index];

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 p-6 bg-slate-50"
                  >
                    <p className="font-semibold text-slate-800 mb-4">
                      Q{index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options?.map((opt, i) => {
                        const isCorrect = opt.label === q.correct_answer;
                        const isUserChoice = userAnswer?.label === opt.label;

                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm
                              ${isCorrect ? "border-emerald-300 bg-emerald-50" : ""}
                              ${isUserChoice && !isCorrect ? "border-rose-300 bg-rose-50" : ""}
                            `}
                          >
                            <span className="font-semibold w-6">
                              {String.fromCharCode(65 + i)}
                            </span>

                            <span className="flex-1">{opt.label}</span>

                            {result === "wrong" && isCorrect && (
                              <span className="text-emerald-600 font-semibold">
                                ✔ 
                              </span>
                            )}

                            {result === "wrong" &&
                              isUserChoice &&
                              !isCorrect && (
                                <span className="text-rose-600 font-semibold">
                                  ✖
                                </span>
                              )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      {result === "correct" ? (
                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 font-semibold">
                          Correct
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-rose-100 text-rose-700 font-semibold">
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
