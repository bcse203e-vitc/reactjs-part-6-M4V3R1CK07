import React from "react";
import { useNavigate } from "react-router-dom";

const skills = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript and modern frameworks.",
    image: "https://via.placeholder.com/100",
    difficulty: "Beginner to Advanced",
  },
  {
    id: "data-science",
    title: "Data Science",
    description:
      "Learn Python, statistics, machine learning and data visualization.",
    image: "https://via.placeholder.com/100",
    difficulty: "Intermediate",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Learn network security, ethical hacking, and security best practices.",
    image: "https://via.placeholder.com/100",
    difficulty: "Intermediate to Advanced",
  },
];

function SkillSelection({ onSelectSkill, selectedSkill }) {
  const navigate = useNavigate();

  const handleSelect = (skill) => {
    onSelectSkill(skill);
    navigate("/roadmap");
  };

  return (
    <div className="skill-selection">
      <h2>Select a Skill to Begin Your Learning Journey</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`skill-card ${
              selectedSkill?.id === skill.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(skill)}
          >
            <img src={skill.image} alt={skill.title} />
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <span className="difficulty">{skill.difficulty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillSelection;
