import React from "react";
import { Link } from "react-router-dom";

const UniversityCard = ({ university }) => {
  return (
    <li key={university.name}>
      <Link to={`/university/${university.id}`}>
        <h3>{university.name}</h3>
        <p>{university.location}</p>
      </Link>
    </li>
  );
};

export default UniversityCard;
