import React from "react";

const CategorySelector = ({ categories, onSelect }) => {
  return (
    <div className="flex gap-10 flex-wrap p-10 justify-center">
      {categories.map(([cat, count], index) => {
        return (
          <div
            className="relative overflow-hidden w-100 h-60 rounded-3xl cursor-pointer text-white text-2xl font-bold bg-gray-800
          shadow-xl/20 "
            key={index}
            onClick={() => onSelect(cat)}
          >
            <div className="z-10 absolute w-full h-full peer"></div>
            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-orange-700 transition-all duration-500"></div>
            <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-orange-700 transition-all duration-500">
              <div className="bg-gray-800 p-5 rounded-3xl">
                Take all {count} Questions
              </div>
            </div>
            <div className="w-full h-full text-center items-center justify-center flex uppercase">
                {cat}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;
