// components/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you are looking for doesn’t exist.</p>
      <Link to="/" className="text-red-600 font-semibold hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
