import React, { useState } from "react";

// Mock quiz data - in a real app, this would come from an API or JSON file
const quizData = {
  "web-dev": {
    "html-basics": {
      title: "HTML Basics Quiz",
      questions: [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language",
          ],
          answer: 0,
        },
        {
          id: 2,
          question: "Which tag is used to create a paragraph in HTML?",
          options: ["<p>", "<paragraph>", "<para>", "<text>"],
          answer: 0,
        },
        {
          id: 3,
          question:
            "Which attribute is used to specify a unique id for an HTML element?",
          options: ["class", "id", "unique", "identifier"],
          answer: 1,
        },
      ],
    },
    "css-basics": {
      title: "CSS Fundamentals Quiz",
      questions: [
        {
          id: 1,
          question: "What does CSS stand for?",
          options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
          ],
          answer: 1,
        },
        {
          id: 2,
          question: "Which property is used to change the background color?",
          options: ["color", "bgcolor", "background-color", "background"],
          answer: 2,
        },
        {
          id: 3,
          question: 'How do you select an element with id "demo"?',
          options: [".demo", "#demo", "demo", "*demo"],
          answer: 1,
        },
      ],
    },
  },
  "data-science": {
    "python-basics": {
      title: "Python Basics Quiz",
      questions: [
        {
          id: 1,
          question:
            'What is the correct syntax to output "Hello World" in Python?',
          options: [
            'print("Hello World")',
            'echo("Hello World")',
            'console.log("Hello World")',
            'printf("Hello World")',
          ],
          answer: 0,
        },
        {
          id: 2,
          question: "How do you create a variable with the numeric value 5?",
          options: ["x = 5", 'x = "5"', "var x = 5", "int x = 5"],
          answer: 0,
        },
        {
          id: 3,
          question:
            "Which method can be used to return a string in upper case letters?",
          options: ["uppercase()", "upper()", "toUpperCase()", "upperCase()"],
          answer: 1,
        },
      ],
    },
  },
  cybersecurity: {
    "network-basics": {
      title: "Network Fundamentals Quiz",
      questions: [
        {
          id: 1,
          question: "What does IP stand for?",
          options: [
            "Internet Protocol",
            "Internet Provider",
            "Internal Protocol",
            "Internet Proxy",
          ],
          answer: 0,
        },
        {
          id: 2,
          question: "Which protocol is used for secure web browsing?",
          options: ["HTTP", "HTTPS", "FTP", "SMTP"],
          answer: 1,
        },
        {
          id: 3,
          question: "What is a firewall used for?",
          options: [
            "Filtering network traffic",
            "Speed up internet connection",
            "Store website data locally",
            "Manage email communications",
          ],
          answer: 0,
        },
      ],
    },
  },
};

function Quizzes({ skill, onQuizComplete, results }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  if (!skill) {
    return <div className="quizzes">Please select a skill first</div>;
  }

  const skillQuizzes = quizData[skill.id] || {};
  const milestones = Object.keys(skillQuizzes);

  const handleSelectMilestone = (milestoneId) => {
    setSelectedMilestone(milestoneId);
    setCurrentQuiz(skillQuizzes[milestoneId]);
    setUserAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;

    currentQuiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      }
    });

    const finalScore = Math.round(
      (correctCount / currentQuiz.questions.length) * 100
    );
    setScore(finalScore);
    setQuizCompleted(true);

    if (onQuizComplete) {
      onQuizComplete(skill.id, selectedMilestone, finalScore);
    }
  };

  return (
    <div className="quizzes">
      <h2>Knowledge Check Quizzes</h2>

      {!selectedMilestone ? (
        <div className="milestone-selection">
          <h3>Select a milestone to take a quiz:</h3>
          <div className="milestone-list">
            {milestones.map((milestoneId) => (
              <div key={milestoneId} className="milestone-quiz-card">
                <h4>{skillQuizzes[milestoneId].title}</h4>
                <p>{skillQuizzes[milestoneId].questions.length} questions</p>
                <p>
                  {results && results[`${skill.id}-${milestoneId}`]
                    ? `Previous score: ${
                        results[`${skill.id}-${milestoneId}`]
                      }%`
                    : "Not attempted yet"}
                </p>
                <button onClick={() => handleSelectMilestone(milestoneId)}>
                  {results && results[`${skill.id}-${milestoneId}`]
                    ? "Retake Quiz"
                    : "Start Quiz"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : quizCompleted ? (
        <div className="quiz-results">
          <h3>Quiz Results: {currentQuiz.title}</h3>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{score}%</span>
            </div>
            <p>
              {score >= 70
                ? "Great job! You passed the quiz."
                : "Keep learning and try again later."}
            </p>
          </div>

          <div className="question-review">
            <h4>Review Questions:</h4>
            {currentQuiz.questions.map((question, index) => (
              <div
                key={question.id}
                className={`question-review-item ${
                  userAnswers[index] === question.answer
                    ? "correct"
                    : "incorrect"
                }`}
              >
                <p className="question-text">{question.question}</p>
                <p className="answer-feedback">
                  {userAnswers[index] === question.answer
                    ? "✅ Correct"
                    : `❌ Incorrect. The correct answer is: ${
                        question.options[question.answer]
                      }`}
                </p>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <button onClick={() => setSelectedMilestone(null)}>
              Back to Quiz Selection
            </button>
            <button
              onClick={() => {
                setUserAnswers([]);
                setQuizCompleted(false);
              }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h3>{currentQuiz.title}</h3>

          <div className="questions-list">
            {currentQuiz.questions.map((question, questionIndex) => (
              <div key={question.id} className="question-card">
                <p className="question-text">{question.question}</p>

                <div className="options-list">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`option ${
                        userAnswers[questionIndex] === optionIndex
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleAnswerSelect(questionIndex, optionIndex)
                      }
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="option-text">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-footer">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="secondary-button"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitQuiz}
              disabled={userAnswers.length !== currentQuiz.questions.length}
              className="primary-button"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzes;
