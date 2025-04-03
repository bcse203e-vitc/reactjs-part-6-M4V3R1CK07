import React, { useRef } from "react";

function Certificate({ skill, progress }) {
  const certificateRef = useRef(null);

  if (!skill) {
    return <div className="certificate">Please select a skill first</div>;
  }

  const skillProgress = progress[skill.id] || { completedMilestones: [] };
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
  const isCompleted = progressPercentage === 100;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = () => {
    // In a real app, use libraries like jsPDF or html2canvas
    alert(
      "Certificate download functionality would be implemented here using jsPDF or html2canvas"
    );
  };

  return (
    <div className="certificate-page">
      <h2>Course Certificate</h2>

      {!isCompleted ? (
        <div className="certificate-locked">
          <div className="lock-icon">🔒</div>
          <h3>Certificate Not Available Yet</h3>
          <p>Complete all milestones to unlock your certificate</p>
          <div className="progress-indicator">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p>
            {progressPercentage}% Complete ({completedCount}/{totalMilestones}{" "}
            milestones)
          </p>
        </div>
      ) : (
        <div className="certificate-available">
          <div className="certificate-preview" ref={certificateRef}>
            <div className="certificate-content">
              <div className="certificate-header">
                <h3>Certificate of Completion</h3>
                <p className="certificate-subtitle">This certifies that</p>
              </div>

              <div className="certificate-body">
                <p className="certificate-name">Your Name</p>
                <p className="certificate-text">
                  has successfully completed the course in
                </p>
                <p className="certificate-course">{skill.title}</p>
                <p className="certificate-date">Issued on {formattedDate}</p>
              </div>

              <div className="certificate-footer">
                <div className="certificate-seal">🏅</div>
                <p className="certificate-issuer">
                  Personalized Learning Pathway
                </p>
              </div>
            </div>
          </div>

          <div className="certificate-actions">
            <button onClick={handleDownload} className="download-button">
              Download Certificate
            </button>
            <button className="share-button">Share on Social Media</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificate;
