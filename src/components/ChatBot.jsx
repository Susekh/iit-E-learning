import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [interest, setInterest] = useState("");
  const [pastEnrollment, setPastEnrollment] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    try {
      const res = await axios.post("http://localhost:8080/chatbot", {
        interests: interest,
        pastEnrollment: pastEnrollment,
      });
      setResponse(res.data.suggestions);
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      setResponse("Something went wrong: " + (err.response?.data?.details || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎓 Course Recommender Chatbot
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Interests
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="e.g. AI, web dev"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Past Enrollments
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="e.g. React, ML"
              value={pastEnrollment}
              onChange={(e) => setPastEnrollment(e.target.value)}
            />
          </div>

          <button
            onClick={handleAsk}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-lg"
          >
            Get Course Suggestions
          </button>
        </div>

        {response && (
          <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4 text-gray-800 text-sm whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
