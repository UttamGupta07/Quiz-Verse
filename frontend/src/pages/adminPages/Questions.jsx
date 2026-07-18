 import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import QuestionFilters from "../../components/admin/questionComponents/QuestionFilters";
import QuestionTable from "../../components/admin/questionComponents/QuestionTable";
import Pagination from "../../components/admin/questionComponents/Pagination";
import DeleteModal from "../../components/admin/questionComponents/DeleteModal";

const Questions = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [deleteId, setDeleteId] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const deleteQuestion = async () => {
  try {
    await axios.delete(
      `http://localhost:3030/admin/questions/${deleteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Question Deleted");

    setQuestions((prev) =>
      prev.filter((q) => q._id !== deleteId)
    );

    setShowDeleteModal(false);

    setDeleteId(null);

    fetchQuestions();

  } catch (err) {

    toast.error("Delete Failed");

    console.log(err);
  }
};

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    subCategory: "All",
    difficulty: "All",
  });

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:3030/admin/questions",
        {
          params: {
            page,
            limit: 10,
            search: filters.search,
            category: filters.category,
            subCategory: filters.subCategory,
            difficulty: filters.difficulty,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(res.data.questions);

      setTotalPages(res.data.totalPages);

      setTotalQuestions(res.data.totalQuestions);
    } catch (err) {
      toast.error("Unable to fetch questions");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, filters]);

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Question Management
        </h1>

        <button
          onClick={() => navigate("/admin/questions/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Question
        </button>

      </div>

      {/* Filters */}

      <QuestionFilters
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />

      {/* Count */}

      <p className="my-5 font-semibold">
        Total Questions : {totalQuestions}
      </p>

      {/* Table */}

       <QuestionTable
    loading={loading}
    questions={questions}
    selectedQuestions={selectedQuestions}
    setSelectedQuestions={setSelectedQuestions}
    setDeleteId={setDeleteId}
    setShowDeleteModal={setShowDeleteModal}
/>

      {/* Pagination */}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
     {/* delete modal  */}
      <DeleteModal
    show={showDeleteModal}
    onClose={() => setShowDeleteModal(false)}
    onConfirm={deleteQuestion}
/>

    </div>
  );
};

export default Questions;