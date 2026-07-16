import { Link } from "react-router-dom";
import hero from "../assets/hero.png"; // Change path if needed
import { useAuth } from "../context/AuthContext";

function Home() {
  const {token}=useAuth();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 items-center gap-10">

          <div>
            <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold">
              🚀 Learn • Compete • Win
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
              Welcome to
              <br />
              <span className="text-yellow-300">QuizVerse</span>
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Master Programming, Aptitude, DBMS, OS, Java, React and much
              more with interactive quizzes and exciting leaderboards.
            </p>

            <div className="mt-8 flex gap-4">
               {token ? (
  <Link
    to="/dashboard"
    className="bg-yellow-400 text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
  >
    Go to Dashboard
  </Link>
) : (
  <Link
    to="/signup"
    className="bg-yellow-400 text-black px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
  >
    Get Started
  </Link>
)}
              <Link
  to={token ? "/dashboard" : "/login"}
  className="border-2 border-white px-7 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
>
  Explore
</Link>

             
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={hero}
              alt="Quiz Illustration"
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center">
          Why Choose QuizVerse?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:-translate-y-2 transition">
            <div className="text-5xl">📚</div>
            <h3 className="text-2xl font-bold mt-4">
              500+ Quizzes
            </h3>
            <p className="text-gray-600 mt-3">
              Practice Java, DSA, React, DBMS, Aptitude and more.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:-translate-y-2 transition">
            <div className="text-5xl">🏆</div>
            <h3 className="text-2xl font-bold mt-4">
              Compete
            </h3>
            <p className="text-gray-600 mt-3">
              Challenge your friends and climb the leaderboard.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:-translate-y-2 transition">
            <div className="text-5xl">📈</div>
            <h3 className="text-2xl font-bold mt-4">
              Track Progress
            </h3>
            <p className="text-gray-600 mt-3">
              Monitor your scores, accuracy and growth over time.
            </p>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              "💻 Programming",
              "🌳 DSA",
              "🧠 Aptitude",
              "🗄️ DBMS",
              "⚙️ Operating System",
              "⚛️ React"
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-lg p-6 text-center font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-8">

          <div>
            <h2 className="text-5xl font-bold">10K+</h2>
            <p>Students</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p>Quizzes</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">50+</h2>
            <p>Topics</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">95%</h2>
            <p>Success Rate</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white p-12 text-center shadow-xl">

          <h2 className="text-4xl font-bold">
            Ready to Challenge Yourself?
          </h2>

          <p className="mt-5 text-lg">
            Join thousands of learners and start your quiz journey today.
          </p>

          <Link
  to={token ? "/dashboard" : "/signup"}
  className="inline-block mt-8 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
>
  {token ? "Go to Dashboard" : "Start Learning"}
</Link>

        </div>
      </section>
    </>
  );
}

export default Home;