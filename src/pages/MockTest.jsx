import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './MockTest.css';

const questionsData = [
  {
    id: 1,
    question: "What is the virtual DOM in React?",
    options: [
      "A direct copy of the actual DOM",
      "A lightweight copy of the actual DOM kept in memory",
      "A browser extension for debugging",
      "A new standard for HTML5"
    ]
  },
  {
    id: 2,
    question: "Which hook is used to handle side effects in functional components?",
    options: ["useState", "useContext", "useEffect", "useReducer"]
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON X", "JavaScript X-DOM"]
  }
];

const MockTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    navigate('/result');
  };

  return (
    <div className="mock-test-page">
      <div className="container animate-fade-in">
        <div className="test-header">
          <div>
            <h2>React Developer Assessment</h2>
            <p>Question {currentQuestion + 1} of {questionsData.length}</p>
          </div>
          <div className="timer-wrapper">
            <Clock size={20} color="var(--accent-red)" />
            <span className={`timer ${timeLeft < 60 ? 'timer-warning' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <Card className="question-card" hoverEffect={false}>
          <h3 className="question-text">{questionsData[currentQuestion].question}</h3>
          
          <div className="options-list">
            {questionsData[currentQuestion].options.map((option, index) => (
              <div 
                key={index} 
                className={`option-item ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => setSelectedOption(index)}
              >
                <div className="option-marker">{String.fromCharCode(65 + index)}</div>
                <div className="option-text">{option}</div>
              </div>
            ))}
          </div>

          <div className="question-actions">
            <Button 
              variant="secondary" 
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
            >
              Previous
            </Button>
            
            {currentQuestion === questionsData.length - 1 ? (
              <Button variant="primary" onClick={handleSubmit}>Submit Test</Button>
            ) : (
              <Button variant="primary" onClick={handleNext} disabled={selectedOption === null}>
                Next Question
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MockTest;
