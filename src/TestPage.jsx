import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "./questions";

function TestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const handleAnswer = (choice) => {
    const updated = [...answers];
    updated[current] = choice;
    setAnswers(updated);
    if (current < questions.length - 1) setCurrent(current + 1);
    else {
      localStorage.setItem("userAnswers", JSON.stringify(updated));
      navigate("/result");
    }
  };

  return (
    <div className="container">
      <h2>İngilizce Seviye Tespit Testi</h2>
      <p>{current + 1} / {questions.length}</p>
      <h4>{questions[current].question}</h4>
      {questions[current].options.map((opt,i) => (
        <button key={i} className="btn-option" onClick={()=>handleAnswer(opt)}>{opt}</button>
      ))}
    </div>
  );
}

export default TestPage;