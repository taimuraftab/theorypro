import React from "react";
import HeroImage from "../assets/hero-image.png";

function Hero() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start xl:pt-24 sm:pt-16 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal tracking-tight text-opacity-70">
          Master the essentials of driving theory
        </h1>

        <p className="mt-6 tracking-tight">
          <span className="block font-sans font-normal text-4xl sm:text-5xl md:text-6xl">
            The road to passing your
          </span>
          <span className="block font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl">
            theory test
          </span>
        </p>

        <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg md:text-xl font-normal leading-7 sm:leading-8 text-opacity-70">
          Practice real driving theory questions and build confidence before
          your exam. Learn road signs, hazard awareness, and safe driving rules
          with structured practice designed to help you pass first time.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6 sm:mt-8 gap-4">
          <button
            className="w-full sm:w-auto bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          >
            Get started
          </button>

          <button
            className="w-full sm:w-auto bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            onClick={() => window.scrollTo({ top: 1350, behavior: "smooth" })}
          >
            Practice by Category
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={HeroImage}
          className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl ml-20"
          alt="Driving Illustration"
        />
      </div>
    </div>
  );
}

export default Hero;
