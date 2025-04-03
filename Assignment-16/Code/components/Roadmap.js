import React, { useState, useEffect } from "react";

// Mock data - in a real app, this would come from an API or JSON file
const roadmapData = {
  "web-dev": {
    title: "Web Development Roadmap",
    milestones: [
      {
        id: "html-basics",
        title: "HTML Basics",
        type: "article",
        duration: "2 hours",
      },
      {
        id: "css-basics",
        title: "CSS Fundamentals",
        type: "video",
        duration: "3 hours",
      },
      {
        id: "js-intro",
        title: "JavaScript Introduction",
        type: "interactive",
        duration: "4 hours",
      },
      {
        id: "responsive",
        title: "Responsive Design",
        type: "project",
        duration: "5 hours",
      },
      {
        id: "react-basics",
        title: "React Fundamentals",
        type: "course",
        duration: "10 hours",
      },
    ],
  },
  "data-science": {
    title: "Data Science Roadmap",
    milestones: [
      {
        id: "python-basics",
        title: "Python Basics",
        type: "article",
        duration: "3 hours",
      },
      {
        id: "data-analysis",
        title: "Data Analysis with Pandas",
        type: "interactive",
        duration: "5 hours",
      },
      {
        id: "visualization",
        title: "Data Visualization",
        type: "video",
        duration: "4 hours",
      },
      {
        id: "ml-intro",
        title: "Intro to Machine Learning",
        type: "course",
        duration: "8 hours",
      },
      {
        id: "project",
        title: "Build a Prediction Model",
        type: "project",
        duration: "10 hours",
      },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity Roadmap",
    milestones: [
      {
        id: "network-basics",
        title: "Network Fundamentals",
        type: "article",
        duration: "3 hours",
      },
      {
        id: "threats",
        title: "Common Security Threats",
        type: "video",
        duration: "2 hours",
      },
      {
        id: "encryption",
        title: "Encryption Basics",
        type: "interactive",
        duration: "4 hours",
      },
      {
        id: "pen-testing",
        title: "Penetration Testing",
        type: "course",
        duration: "6 hours",
      },
      {
        id: "incident-response",
        title: "Incident Response",
        type: "project",
        duration: "5 hours",
      },
    ],
  },
};

function Roadmap({ skill, progress, onMilestoneComplete }) {
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    if (skill) {
      setRoadmap(roadmapData[skill.id]);
    }
  }, [skill]);

  if (!skill || !roadmap) {
    return <div className="roadmap">Please select a skill first</div>;
  }

  const completedMilestones = progress[skill.id]?.completedMilestones || [];

  return (
    <div className="roadmap">
      <h2>{roadmap.title}</h2>
      <div className="milestone-timeline">
        {roadmap.milestones.map((milestone, index) => {
          const isCompleted = completedMilestones.includes(milestone.id);

          return (
            <div
              key={milestone.id}
              className={`milestone ${isCompleted ? "completed" : ""}`}
            >
              <div className="milestone-number">{index + 1}</div>
              <div className="milestone-content">
                <h3>{milestone.title}</h3>
                <div className="milestone-details">
                  <span className="milestone-type">{milestone.type}</span>
                  <span className="milestone-duration">
                    {milestone.duration}
                  </span>
                </div>
                <p>
                  Learn about {milestone.title} through {milestone.type}{" "}
                  content.
                </p>
                <button
                  onClick={() => onMilestoneComplete(skill.id, milestone.id)}
                  disabled={isCompleted}
                >
                  {isCompleted ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Roadmap;
