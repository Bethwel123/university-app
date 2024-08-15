import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UniversityCard from "./UniversityCard";

const CountyList = () => {
  const { countyName } = useParams();
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/counties?name=${countyName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setUniversities(data[0].universities || []);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [countyName]);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Universities in {countyName}</h2>
      <ul className="list-group">
        {universities.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </ul>
    </div>
  );
};

export default CountyList;
