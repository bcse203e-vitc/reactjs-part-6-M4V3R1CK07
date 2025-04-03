import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SkillSelection from "./components/SkillSelection";
import Roadmap from "./components/Roadmap";
import ProgressTracker from "./components/ProgressTracker";
import Quizzes from "./components/Quizzes";
import Certificate from "./components/Certificate";
import Community from "./components/Community";
import "./styles.css";

function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [progress, setProgress] = useState({});
  const [quizResults, setQuizResults] = useState({});

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    // Initialize progress tracking for this skill if not exists
    if (!progress[skill.id]) {
      setProgress((prev) => ({
        ...prev,
        [skill.id]: {
          completedMilestones: [],
          streak: 0,
          lastActivity: Date.now(),
        },
      }));
    }
  };

  const handleMilestoneComplete = (skillId, milestoneId) => {
    setProgress((prev) => {
      const updatedProgress = { ...prev };
      if (!updatedProgress[skillId].completedMilestones.includes(milestoneId)) {
        updatedProgress[skillId].completedMilestones.push(milestoneId);
        updatedProgress[skillId].lastActivity = Date.now();

        // Update streak
        const lastDate = new Date(updatedProgress[skillId].lastActivity);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
          updatedProgress[skillId].streak += 1;
        } else {
          updatedProgress[skillId].streak = 1;
        }
      }
      return updatedProgress;
    });
  };

  const handleQuizComplete = (skillId, milestoneId, score) => {
    setQuizResults((prev) => ({
      ...prev,
      [`${skillId}-${milestoneId}`]: score,
    }));
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Personalized Learning Pathway</h1>
          <nav>
            <Link to="/">Home</Link>
            {selectedSkill && (
              <>
                <Link to="/roadmap">Roadmap</Link>
                <Link to="/progress">Progress</Link>
                <Link to="/quizzes">Quizzes</Link>
                <Link to="/certificate">Certificate</Link>
                <Link to="/community">Community</Link>
              </>
            )}
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <SkillSelection
                  onSelectSkill={handleSkillSelect}
                  selectedSkill={selectedSkill}
                />
              }
            />
            <Route
              path="/roadmap"
              element={
                <Roadmap
                  skill={selectedSkill}
                  progress={progress}
                  onMilestoneComplete={handleMilestoneComplete}
                />
              }
            />
            <Route
              path="/progress"
              element={
                <ProgressTracker skill={selectedSkill} progress={progress} />
              }
            />
            <Route
              path="/quizzes"
              element={
                <Quizzes
                  skill={selectedSkill}
                  onQuizComplete={handleQuizComplete}
                  results={quizResults}
                />
              }
            />
            <Route
              path="/certificate"
              element={
                <Certificate skill={selectedSkill} progress={progress} />
              }
            />
            <Route
              path="/community"
              element={<Community skill={selectedSkill} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
