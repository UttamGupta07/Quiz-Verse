import React from "react";
import {
  Brain,
  Target,
  Trophy,
  Users,
  BookOpen,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate=useNavigate()
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Multiple Quiz Categories",
      description:
        "Explore quizzes in Development, Aptitude, and General Knowledge with various subcategories.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Difficulty Levels",
      description:
        "Choose Easy, Medium, or Hard questions to challenge yourself at your own pace.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Performance Tracking",
      description:
        "Monitor your quiz history, scores, accuracy, and overall progress after every attempt.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "Large Question Bank",
      description:
        "Practice from a growing collection of carefully designed multiple-choice questions.",
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      title: "User Friendly",
      description:
        "Simple, responsive, and intuitive interface that works seamlessly across devices.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
      title: "Secure Platform",
      description:
        "Protected authentication system ensures safe access for users and administrators.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About QuizVerse</h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-8 text-gray-100">
            QuizVerse is an interactive online quiz platform designed to make
            learning engaging, competitive, and fun. Whether you're preparing
            for interviews, improving programming skills, or testing your
            general knowledge, QuizVerse offers an enjoyable way to learn while
            tracking your progress.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8 text-lg mb-5">
              Our mission is to create a platform where students and learners
              can improve their knowledge through interactive quizzes while
              receiving instant feedback on their performance.
            </p>

            <p className="text-gray-600 leading-8 text-lg">
              We believe learning should be engaging, accessible, and rewarding.
              QuizVerse helps users strengthen their concepts with real-time
              scoring, detailed results, and continuous practice.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt="Learning"
              className="rounded-lg w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Why Choose QuizVerse?
          </h2>

          <p className="text-center text-gray-500 mb-12">
            Everything you need to practice, learn, and improve.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{feature.icon}</div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-blue-50 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            What You Can Do
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Take quizzes from different categories.",
              "Select your preferred difficulty level.",
              "Practice Development, Aptitude, and GK questions.",
              "View detailed quiz results instantly.",
              "Review your answers after completing quizzes.",
              "Track your learning progress over time.",
              "Improve accuracy with regular practice.",
              "Access quizzes on desktop and mobile devices.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow"
              >
                <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Learn. Practice. Improve.
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Join QuizVerse today and enhance your knowledge through interactive
            quizzes designed to make learning enjoyable and effective.
          </p>

          <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition" 
          onClick={()=>{navigate("/categories")}}>
            Start Your Quiz
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;