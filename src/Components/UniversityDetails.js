import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UniversityDetails = () => {
  const { universityId } = useParams();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/counties")
      .then((res) => res.json())
      .then((data) => {
        const targetUniversity = data
          .flatMap((county) => county.universities)
          .find((uni) => uni.id === universityId);
        if (targetUniversity) {
          setUniversity(targetUniversity);
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
            <ul>
              {programme.units.map((unit, idx) => (
                <li key={idx}>{unit}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <h3>Facilities and Lecturer Profiles:</h3>
      <ul>
        {university.facilities.map((facility, index) => (
          <li key={index}>{facility}</li>
        ))}
      </ul>
      <h3>Lecturers:</h3>
      <ul>
        {university.lecturers.map((lecturer, index) => (
          <li key={index}>
            <strong>{lecturer.name}</strong> - {lecturer.profile}
          </li>
        ))}
      </ul>
      <h3>Gallery:</h3>
      <div className="gallery">
        {university.gallery.map((image, index) => (
          <img key={index} src={image.imageUrl} alt="" />
        ))}
      </div>
    </div>
  );
};

export default UniversityDetails;
