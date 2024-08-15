import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UniversityDetails = () => {
  const { universityId } = useParams();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/counties")
      .then((res) => res.json())
      .then((data) => {
        // Flatten the data to get all universities from all counties
        const universities = data.flatMap((county) => county.universities);

        // Find the specific university by its ID
        const targetUniversity = universities.find(
          (uni) => uni.id.toString() === universityId
        );

        if (targetUniversity) {
          setUniversity(targetUniversity);
        } else {
          console.error("University not found");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [universityId]);

  if (!university) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{university.name}</h1>
      <p>Location: {university.location}</p>

      <h3>Programmes and Curriculum:</h3>
      <ul>
        {university.programmes.map((programme, index) => (
          <li key={index}>
            <strong>{programme.name}</strong>
            <p>{programme.curriculum}</p>
          </li>
        ))}
      </ul>

      <h3>Facilities:</h3>
      <ul>
        {university.facilities.map((facility, index) => (
          <li key={index}>
            <strong>{facility.name}</strong>
            <p>{facility.description}</p>
          </li>
        ))}
      </ul>

      <h3>Lecturers:</h3>
      <ul>
        {university.lecturers.map((lecturer, index) => (
          <li key={index}>
            <strong>{lecturer.name}</strong>
            <p>{lecturer.profile}</p>
          </li>
        ))}
      </ul>

      <h3>Gallery:</h3>
      <div className="gallery">
        {university.gallery.map((image, index) => (
          <div key={index}>
            <img
              src={image.imageUrl}
              alt={`Gallery ${index + 1}`}
              className="img-fluid"
            />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityDetails;
