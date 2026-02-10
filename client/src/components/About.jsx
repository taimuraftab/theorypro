function About() {
  return (
    <div className="py-30 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/931/735/non_2x/blue-race-car-illustration-design-free-vector.jpg"
              alt="image"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Interactive Learning Made Fun
            </h2>
            <p className="mt-6 text-gray-600">
              This quiz app is designed to help users test and improve their
              knowledge across a variety of topics. Users can choose different
              categories, answer questions, and get instant feedback to see how
              well they are doing. Each question comes with detailed
              explanations, so even if you get an answer wrong, you can
              understand the reasoning and learn from your mistakes. The app
              highlights correct and incorrect choices, making learning more
              effective and engaging.
            </p>
            <p className="mt-4 text-gray-600">
              With progress tracking and the ability to retake quizzes, users
              can continuously challenge themselves and improve their scores.
              Whether you are preparing for exams or just love learning for fun,
              this app makes practice simple, interactive, and rewarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
