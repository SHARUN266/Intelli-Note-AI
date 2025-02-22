"use client";
import React, { useState } from "react";
import axios from "axios";

function Suggestions() {
  const [suggestion, setSuggestion] = useState({
    userEmail: "",
    feedback: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 
  const handleChange = (e) => {
    setSuggestion({ ...suggestion, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.userEmail || !suggestion.feedback) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/suggestion", suggestion);
      if (response.status === 200) {
        setMessage("Thank you for your feedback!");
        setSuggestion({ userEmail: "", feedback: "" }); // Reset form
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Failed to send feedback. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 flex w-full flex-col border rounded-lg bg-white p-8">
      <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
        Suggestion
      </h2>
      <p className="mb-5 leading-relaxed text-gray-600">
        If you had any issues or liked our tool, please share with us!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="userEmail"
            required
            value={suggestion.userEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="feedback" className="text-sm leading-7 text-gray-600">
            Message
          </label>
          <textarea
            id="feedback"
            name="feedback"
            required
            value={suggestion.feedback}
            onChange={handleChange}
            placeholder="Type your feedback"
            className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-center text-gray-600">{message}</p>
      )}
    </div>
  );
}

export default Suggestions;
