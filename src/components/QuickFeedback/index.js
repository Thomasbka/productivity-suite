// src/components/QuickFeedback/index.js
import React, { useState, useEffect } from 'react';
import './QuickFeedback.css';

const QuickFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedbackList')) || [];
    setFeedbackList(savedFeedback);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === '') return;

    const newFeedbackList = [...feedbackList, feedback];
    setFeedbackList(newFeedbackList);
    setFeedback('');
    localStorage.setItem('feedbackList', JSON.stringify(newFeedbackList));
  };

  const handleClearFeedback = () => {
    if (window.confirm("Are you sure you want to clear all feedback?")) {
      setFeedbackList([]);
      localStorage.removeItem('feedbackList');
    }
  };

  return (
    <div className="quick-feedback">
      <h1>Quick Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Feedback List</h2>
      <ul>
        {feedbackList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {feedbackList.length > 0 && (
        <button className="clear-feedback-button" onClick={handleClearFeedback}>
          Clear Feedback
        </button>
      )}
    </div>
  );
};

export default QuickFeedback;
