import { Link } from "react-router-dom";

function About() {
  return (
    <>
      {/* Banner */}
      <section className="bg-slate-900 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold">About QuizVerse</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering learners through interactive quizzes, real-time
            feedback, and a passion for continuous learning.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              QuizVerse was created with one simple idea—learning should be
              enjoyable instead of stressful. We wanted students to practice,
              compete, and improve without feeling overwhelmed.
            </p>

            <p className="text-gray-600 leading-8">
              Whether you're preparing for placements, college exams, or simply
              sharpening your programming skills, QuizVerse provides a platform
              where every quiz helps you become better.
            </p>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-5">
              Our Purpose
            </h3>

            <p className="leading-8">
              We aim to create a platform where curiosity meets technology,
              helping learners grow through practice, consistency, and friendly
              competition.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-bold text-xl mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Delivering quality quizzes and an excellent learning experience.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="font-bold text-xl mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                Constantly improving with modern technologies and ideas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                Learning becomes better when people grow together.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-bold text-xl mb-3">
                Learning
              </h3>
              <p className="text-gray-600">
                We believe education should always be engaging and accessible.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Journey */}
      <section className="max-w-6xl mx-auto py-24 px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Our Journey
        </h2>

        <div className="space-y-10 border-l-4 border-indigo-600 pl-8">

          <div>
            <h3 className="text-2xl font-bold text-indigo-600">
              Idea
            </h3>
            <p className="text-gray-600 mt-2">
              Started with the vision of making quiz-based learning fun.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-indigo-600">
              Development
            </h3>
            <p className="text-gray-600 mt-2">
              Built using React, modern UI design, and secure authentication.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-indigo-600">
              Growth
            </h3>
            <p className="text-gray-600 mt-2">
              Expanding quiz categories and improving the user experience every
              day.
            </p>
          </div>

        </div>

      </section>

      {/* Numbers */}
      <section className="bg-indigo-700 py-20 text-white">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h2 className="text-5xl font-bold">10K+</h2>
            <p className="mt-3">Learners</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-3">Quizzes</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">50+</h2>
            <p className="mt-3">Topics</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">24/7</h2>
            <p className="mt-3">Learning Access</p>
          </div>

        </div>

      </section>

      {/* Quote */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            "Knowledge grows when it is challenged."
          </h2>

          <p className="text-gray-600 mt-6 text-lg">
            Every quiz is an opportunity to learn, improve, and achieve your
            goals.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-10 bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Join QuizVerse
          </Link>

        </div>
      </section>
    </>
  );
}

export default About;