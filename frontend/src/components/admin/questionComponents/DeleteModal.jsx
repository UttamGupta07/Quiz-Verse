import React from "react";

const DeleteModal = ({
  show,
  onClose,
  onConfirm,
}) => {

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-2xl font-bold mb-4">
          Delete Question
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this question?
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;