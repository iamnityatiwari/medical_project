import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserFeedback = () => {
const navigate = useNavigate();
  const location = useLocation();
  const doctorId = location.state?.doctorId;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/doctor/${doctorId}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment: feedback,
          patientName: "Anonymous", // Ya patient ka naam agar available ho
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Feedback submitted successfully!");
        // Optionally reset form
        setRating(0);
        setFeedback("");
      } else {
        alert(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    } finally {
        navigate("/user"); // Redirect to home page after submission
    }
  };
  

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffeaea",
          padding: "2rem",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#c62828",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Rate Your Doctor
        </h1>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
              gap: "10px",
            }}
          >
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={40}
                    color={currentRating <= (hover || rating) ? "#c62828" : "#e4e5e9"}
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <textarea
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="5"
              style={{
                width: "100%",
                padding: "1rem",
                border: "1px solid #c62828",
                borderRadius: "8px",
                resize: "none",
                fontSize: "1rem",
                backgroundColor: "#fff",
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#c62828",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b71c1c")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#c62828")}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFeedback;
