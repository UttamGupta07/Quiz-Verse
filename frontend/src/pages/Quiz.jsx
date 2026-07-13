 import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionCard from "../components/quizComponents/QuestionCard";
import QuizSidebar from "../components/quizComponents/QuizSidebar";
import {useNavigate} from 'react-router-dom' ;


const Quiz = () => {
  const navigate=useNavigate();
  const quizPara = JSON.parse(localStorage.getItem("quizPara"));

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [answers, setAnswers] = useState({});

  const url = `http://localhost:3030/quiz/random?category=${quizPara.category}&subCategory=${quizPara.subCategory}&limit=${quizPara.noOfQuestions}&difficulty=${quizPara.difficulty}`;

  const loadQuestions = async () => {
    const res = (await axios.get(url)).data.questions;
    setQuestions(res);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
}, []);

  useEffect(  () => {
     loadQuestions();
    setInterval(()=>{
      setTimeLeft(prev=>prev-1);
    },1000)

  }, []);

  const handleSelect = (option) => {
    const q_id=questions[currentQuestion]._id;
    setAnswers((prev) => ({
      ...prev,
      [q_id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
  const quizData = {
    category: quizPara.category,
    subCategory: quizPara.subCategory,
    difficulty: quizPara.difficulty,
    totalQuestions: questions.length,
    timeTaken: 1800 - timeLeft,
    answers,
  };

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3030/quiz/submit",
      quizData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    // Navigate to Result page
    navigate("/result", {
       replace: true,
  state: res.data.result,
});

  } catch (err) {
    console.log(err);
  }
};
 
  


  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="text-2xl font-semibold text-blue-600 animate-pulse">
          Loading Questions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-1 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              QuizVerse
            </h1>

            <p className="text-blue-100 mt-1">
              {quizPara.category} • {quizPara.subCategory}
            </p>
          </div>

          <div className="bg-white/20 rounded-xl px-5 py-3 text-white backdrop-blur-sm">
            <p className="text-sm">Difficulty</p>
            <h2 className="text-lg font-semibold">
              {quizPara.difficulty}
            </h2>
          </div>

        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left */}
          <div className="lg:col-span-8">
            <QuestionCard
              question={questions[currentQuestion]}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={answers[questions[currentQuestion]?._id]}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>

          {/* Right */}
          <div className="lg:col-span-4">
            <QuizSidebar
              questions={questions}
              currentQuestion={currentQuestion}
              answers={answers}
              timeLeft={timeLeft}
              onQuestionClick={setCurrentQuestion}
              onSubmit={handleSubmit}
            />
          </div>

        </div>

      </main>

    </div>
  );
};

export default Quiz;