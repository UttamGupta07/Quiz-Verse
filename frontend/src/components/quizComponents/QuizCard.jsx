import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {

    const navigate = useNavigate();

    return (

        <div
            onClick={() =>
                navigate(`/result/${quiz._id}`)
            }
            className="
            bg-white
            rounded-2xl
            shadow-lg
            hover:shadow-2xl
            cursor-pointer
            transition
            duration-300
            p-6
            border-l-8
            border-blue-600
            "
        >

            <div className="flex justify-between">

                <div>

                    <h2 className="text-2xl font-bold">
                        {quiz.subCategory}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {quiz.category}
                    </p>

                </div>

                <div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                        {quiz.difficulty}

                    </span>

                </div>

            </div>

            <div className="grid grid-cols-3 mt-8">

                <div>

                    <p className="text-gray-500">
                        Score
                    </p>

                    <h3 className="text-2xl font-bold text-green-600">

                        {quiz.score}/{quiz.totalQuestions}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Percentage
                    </p>

                    <h3 className="text-2xl font-bold text-blue-600">

                        {quiz.percentage}%

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Time
                    </p>

                    <h3 className="text-xl font-bold">

                        {Math.floor(quiz.timeTaken/60)}m {quiz.timeTaken%60}s

                    </h3>

                </div>

            </div>

            <div className="flex justify-between items-center mt-8">

                <p className="text-gray-400">

                    {new Date(quiz.createdAt).toLocaleDateString()}

                </p>

                <button
                    className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    "
                    onClick={() => navigate(`/result/${quiz._id}`)}
                >
                    View Result →
                </button>

            </div>

        </div>

    );

}

export default QuizCard;