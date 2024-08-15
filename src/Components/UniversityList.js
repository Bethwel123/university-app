import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UniversityList = () => {
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h1>University Tours in Kenya</h1>
      <ul className="list-group">
        {counties.map((county) => (
          <li key={county.id} className="list-group-item">
            <Link to={`/county/${county.name}`}>{county.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityList;
