import React from "react";

const QuestionCard = ({ questionData, selected, onAnswer }) => {
  if (!questionData) return null;

  const getOptionLetter = (index) =>
    index >= 0 ? String.fromCharCode(65 + index) : "?";

  const normalize = (val) => (val ? val.trim().toLowerCase() : "");

  const correctIndex = questionData.options.findIndex((opt) =>
    normalize(opt.label) === normalize(questionData.correct_answer)
  );

  const selectedIndex = questionData.options.findIndex(
    (opt) => normalize(opt.label) === normalize(selected?.label)
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      {questionData.image && (
        <div className="mb-6 flex justify-center">
          <img
            src={`../assets/${questionData.image}`}
            alt="question visual"
            className="max-h-64 rounded-xl object-contain shadow-sm"
          />
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
        {questionData.question}
      </h3>

      <ul className="space-y-4">
        {questionData.options.map((opt, index) => {
          const isSelected = selected && opt === selected;
          const isCorrect = index === correctIndex;
          const isWrong = isSelected && index !== correctIndex;

          return (
            <li
              key={index}
              onClick={() => !selected && onAnswer(opt)}
              className={`group flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200
                ${!selected ? "hover:border-orange-400 hover:bg-orange-50" : ""}
                ${isCorrect && selected ? "border-emerald-400 bg-emerald-50" : ""}
                ${isWrong ? "border-rose-400 bg-rose-50" : ""}
                ${selected && !isSelected && !isCorrect ? "opacity-70" : ""}
              `}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm
                  ${isCorrect && selected ? "bg-emerald-500 text-white" : ""}
                  ${isWrong ? "bg-rose-500 text-white" : ""}
                  ${!selected ? "bg-slate-200 text-slate-700 group-hover:bg-orange-500 group-hover:text-white" : ""}
                `}
              >
                {getOptionLetter(index)}
              </div>

              {/\.png|\.jpg|\.jpeg|\.gif$/i.test(opt.label) ? (
                <img
                  src={`/images/${opt.label}`}
                  alt="option"
                  className="h-20 rounded-lg object-contain"
                />
              ) : (
                <span className="text-slate-700 text-sm md:text-base">
                  {opt.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      
    </div>
  );
};

export default QuestionCard;