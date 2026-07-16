 import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import QuestionCard from "../components/quizComponents/QuestionCard";
import QuizSidebar from "../components/quizComponents/QuizSidebar";

const Quiz = () => {
  const navigate = useNavigate();

  const quizPara = JSON.parse(localStorage.getItem("quizPara"));
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (!quizPara) {
      toast.error("Quiz settings not found.");
      navigate("/dashboard", { replace: true });
    }

    if (!token) {
      toast.error("Please login first.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  
  useEffect(() => {
    if (!quizPara) return;

    const loadQuestions = async () => {
      try {
        setLoading(true);

        const url = `http://localhost:3030/quiz/random?category=${quizPara.category}&subCategory=${quizPara.subCategory}&limit=${quizPara.noOfQuestions}&difficulty=${quizPara.difficulty}`;

        const res = await axios.get(url);

        setQuestions(res.data.questions || []);
      } catch (err) {
        console.log(err);

        toast.error(
          err.response?.data?.msg || "Failed to load questions."
        );

        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [navigate]);

  
  // Prevent Refresh
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  
  // Timer
  
  useEffect(() => {
    if (loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (!hasSubmitted.current) {
            handleSubmit();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  // ==============================
  // Select Answer
  // ==============================
  const handleSelect = (option) => {
    const id = questions[currentQuestion]?._id;

    if (!id) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: option,
    }));
  };

  // ==============================
  // Navigation
  // ==============================
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
    if (hasSubmitted.current) return;

    hasSubmitted.current = true;
    setSubmitting(true);

    try {
      const quizData = {
        category: quizPara.category,
        subCategory: quizPara.subCategory,
        difficulty: quizPara.difficulty,
        totalQuestions: questions.length,
        timeTaken: 1800 - timeLeft,
        answers,
      };

      const res = await axios.post(
        "http://localhost:3030/quiz/submit",
        quizData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Quiz submitted successfully!");

      navigate("/result", {
        replace: true,
        state: res.data.result,
      });
    } catch (err) {
      console.log(err);

      hasSubmitted.current = false;

      toast.error(
        err.response?.data?.msg || "Failed to submit quiz."
      );
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="text-2xl font-bold text-blue-600 animate-pulse">
          Loading Questions...
        </div>
      </div>
    );
  }

  
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="text-2xl font-semibold text-red-500">
          No Questions Found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

    
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              QuizVerse
            </h1>

            <p className="text-blue-100 mt-1">
              {quizPara.category} • {quizPara.subCategory}
            </p>
          </div>

          <div className="bg-white/20 px-6 py-3 rounded-xl backdrop-blur-sm text-white">
            <p className="text-sm">
              Difficulty
            </p>

            <h2 className="text-xl font-bold">
              {quizPara.difficulty}
            </h2>
          </div>

        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Question */}
          <div className="lg:col-span-8">

            <QuestionCard
              question={questions[currentQuestion]}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={
                answers[questions[currentQuestion]?._id]
              }
              onSelect={handleSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />

          </div>

        
          <div className="lg:col-span-4">

            <QuizSidebar
              questions={questions}
              currentQuestion={currentQuestion}
              answers={answers}
              timeLeft={timeLeft}
              onQuestionClick={setCurrentQuestion}
              onSubmit={handleSubmit}
              submitting={submitting}
            />

          </div>

        </div>

      </main>

    </div>
  );
};

export default Quiz;