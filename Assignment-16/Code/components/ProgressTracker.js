import React from "react";

function ProgressTracker({ skill, progress }) {
  if (!skill) {
    return <div className="progress-tracker">Please select a skill first</div>;
  }

  const skillProgress = progress[skill.id] || {
    completedMilestones: [],
    streak: 0,
  };
  const roadmapData = {
    "web-dev": { milestones: 5 },
    "data-science": { milestones: 5 },
    cybersecurity: { milestones: 5 },
  };

  const totalMilestones = roadmapData[skill.id].milestones;
  const completedCount = skillProgress.completedMilestones.length;
  const progressPercentage = Math.round(
    (completedCount / totalMilestones) * 100
  );

  return (
    <div className="progress-tracker">
      <h2>Your Progress: {skill.title}</h2>

      <div className="progress-stats">
        <div className="stat-card">
          <h3>Completion</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p>{progressPercentage}% Complete</p>
          <p>
            {completedCount} of {totalMilestones} milestones completed
          </p>
        </div>

        <div className="stat-card">
          <h3>Current Streak</h3>
          <div className="streak-counter">
            <span className="streak-number">{skillProgress.streak}</span>
            <span className="streak-label">days</span>
          </div>
          <p>Keep learning to maintain your streak!</p>
        </div>
      </div>

      <div className="achievements">
        <h3>Achievements</h3>
        <div className="badges-container">
          {progressPercentage >= 20 && (
            <div className="badge">
              <span className="badge-icon">🔰</span>
              <span className="badge-title">Getting Started</span>
            </div>
          )}
          {progressPercentage >= 50 && (
            <div className="badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-title">Halfway There</span>
            </div>
          )}
          {progressPercentage === 100 && (
            <div className="badge">
              <span className="badge-icon">🏆</span>
              <span className="badge-title">Completion Master</span>
            </div>
          )}
          {skillProgress.streak >= 3 && (
            <div className="badge">
              <span className="badge-icon">🔥</span>
              <span className="badge-title">3-Day Streak</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
