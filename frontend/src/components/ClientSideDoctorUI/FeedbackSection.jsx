import { useState } from "react";

const FeedbackSection = ({ feedback }) => {
  console.log("Feedback:", feedback);
  const [showAll, setShowAll] = useState(false);
  const visibleFeedback = showAll ? feedback : feedback.slice(0, 2);

  return (
    <div className="mb-6 bg-red-100 p-4 rounded-lg shadow-inner">
      <h4 className="text-xl font-bold text-red-700 mb-3 border-b border-red-300 pb-1">
        Patient Feedback
      </h4>

      <ul
        className={`text-black space-y-4 ${showAll ? "max-h-64 overflow-y-auto pr-2" : ""
          }`}
      >
        {visibleFeedback.map((fb, idx) => (
          <li
            key={idx}
            className="bg-white p-3 rounded shadow-sm border-l-4 border-red-400"
          >
            <p className="font-semibold text-red-700">{fb.patientName}</p>
            <p className="text-sm text-gray-800 mt-1">{fb.comment}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(fb.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format ke liye
              })}
            </p>

            <p className="text-sm text-yellow-500 mt-1">{fb.rating} ⭐</p>

          </li>
        ))}
      </ul>

      {feedback.length > 2 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-3 text-sm font-medium text-red-700 hover:underline"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      )}
    </div>
  );
};

export default FeedbackSection;
