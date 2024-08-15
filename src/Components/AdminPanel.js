import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [newCounty, setNewCounty] = useState({
    id: null,
    name: "",
    universities: [
      {
        id: Date.now(),
        name: "",
        location: "",
        programmes: [{ name: "", curriculum: "" }],
        facilities: [{ name: "", description: "" }],
        lecturers: [{ name: "", profile: "" }],
        gallery: [{ imageUrl: "", description: "" }],
      },
      {
        id: Date.now() + 1,
        name: "",
        location: "",
        programmes: [{ name: "", curriculum: "" }],
        facilities: [{ name: "", description: "" }],
        lecturers: [{ name: "", profile: "" }],
        gallery: [{ imageUrl: "", description: "" }],
      },
    ],
  });

  const [counties, setCounties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data))
      .catch((error) => console.error("Error fetching counties:", error));
  }, []);

  const handleChange = (e, type, index, subIndex) => {
    const { name, value } = e.target;

    setNewCounty((prevCounty) => {
      const updatedUniversities = [...prevCounty.universities];

      if (type === "county") {
        return { ...prevCounty, [name]: value };
      } else if (type === "university") {
        updatedUniversities[index] = {
          ...updatedUniversities[index],
          [name]: value,
        };
        return { ...prevCounty, universities: updatedUniversities };
      } else {
        const updatedItems = updatedUniversities[index][type].map((item, i) =>
          i === subIndex ? { ...item, [name]: value } : item
        );
        updatedUniversities[index] = {
          ...updatedUniversities[index],
          [type]: updatedItems,
        };
        return { ...prevCounty, universities: updatedUniversities };
      }
    });
  };

  const handleAddField = (type, index) => {
    setNewCounty((prevCounty) => {
      const updatedUniversities = [...prevCounty.universities];
      const newField =
        type === "programme"
          ? { name: "", curriculum: "" }
          : type === "facility"
          ? { name: "", description: "" }
          : type === "lecturer"
          ? { name: "", profile: "" }
          : { imageUrl: "", description: "" };

      updatedUniversities[index][type].push(newField);
      return { ...prevCounty, universities: updatedUniversities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCounty.name) {
      console.error("County name is required.");
      return;
    }

    try {
      const newCountyData = {
        ...newCounty,
        id: Date.now(),
      };

      const updatedCounties = [...counties, newCountyData];

      const response = await fetch("http://localhost:3000/counties", {
        method: "PUT", // Use POST for creating a new county
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCounties),
      });

      if (response.ok) {
        setCounties(updatedCounties);
        setNewCounty({
          id: null,
          name: "",
          universities: [
            {
              id: Date.now(),
              name: "",
              location: "",
              programmes: [{ name: "", curriculum: "" }],
              facilities: [{ name: "", description: "" }],
              lecturers: [{ name: "", profile: "" }],
              gallery: [{ imageUrl: "", description: "" }],
            },
            {
              id: Date.now() + 1,
              name: "",
              location: "",
              programmes: [{ name: "", curriculum: "" }],
              facilities: [{ name: "", description: "" }],
              lecturers: [{ name: "", profile: "" }],
              gallery: [{ imageUrl: "", description: "" }],
            },
          ],
        });
        console.log("County and universities added successfully");
      } else {
        console.error("Error adding county and universities");
      }
    } catch (error) {
      console.error("Error adding county and universities:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            County Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCounty.name}
            onChange={(e) => handleChange(e, "county")}
            className="form-control"
          />
        </div>

        {newCounty.universities.map((university, index) => (
          <div key={university.id}>
            <h3>University {index + 1}:</h3>
            <div className="mb-3">
              <label
                htmlFor={`university-name-${index}`}
                className="form-label"
              >
                Name:
              </label>
              <input
                type="text"
                id={`university-name-${index}`}
                name="name"
                value={university.name}
                onChange={(e) => handleChange(e, "university", index)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor={`university-location-${index}`}
                className="form-label"
              >
                Location:
              </label>
              <input
                type="text"
                id={`university-location-${index}`}
                name="location"
                value={university.location}
                onChange={(e) => handleChange(e, "university", index)}
                className="form-control"
              />
            </div>

            <h4>Programmes:</h4>
            {university.programmes.map((programme, subIndex) => (
              <div key={subIndex} className="mb-3">
                <label
                  htmlFor={`programme-name-${index}-${subIndex}`}
                  className="form-label"
                >
                  Programme Name:
                </label>
                <input
                  type="text"
                  id={`programme-name-${index}-${subIndex}`}
                  name="name"
                  value={programme.name}
                  onChange={(e) =>
                    handleChange(e, "programme", index, subIndex)
                  }
                  className="form-control"
                />
                <label
                  htmlFor={`programme-curriculum-${index}-${subIndex}`}
                  className="form-label"
                >
                  Curriculum:
                </label>
                <input
                  type="text"
                  id={`programme-curriculum-${index}-${subIndex}`}
                  name="curriculum"
                  value={programme.curriculum}
                  onChange={(e) =>
                    handleChange(e, "programme", index, subIndex)
                  }
                  className="form-control"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("programmes", index)}
              className="btn btn-secondary mb-3"
            >
              Add Programme
            </button>

            <h4>Facilities:</h4>
            {university.facilities.map((facility, subIndex) => (
              <div key={subIndex} className="mb-3">
                <label
                  htmlFor={`facility-name-${index}-${subIndex}`}
                  className="form-label"
                >
                  Facility Name:
                </label>
                <input
                  type="text"
                  id={`facility-name-${index}-${subIndex}`}
                  name="name"
                  value={facility.name}
                  onChange={(e) => handleChange(e, "facility", index, subIndex)}
                  className="form-control"
                />
                <label
                  htmlFor={`facility-description-${index}-${subIndex}`}
                  className="form-label"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id={`facility-description-${index}-${subIndex}`}
                  name="description"
                  value={facility.description}
                  onChange={(e) => handleChange(e, "facility", index, subIndex)}
                  className="form-control"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("facilities", index)}
              className="btn btn-secondary mb-3"
            >
              Add Facility
            </button>

            <h4>Lecturers:</h4>
            {university.lecturers.map((lecturer, subIndex) => (
              <div key={subIndex} className="mb-3">
                <label
                  htmlFor={`lecturer-name-${index}-${subIndex}`}
                  className="form-label"
                >
                  Lecturer Name:
                </label>
                <input
                  type="text"
                  id={`lecturer-name-${index}-${subIndex}`}
                  name="name"
                  value={lecturer.name}
                  onChange={(e) => handleChange(e, "lecturer", index, subIndex)}
                  className="form-control"
                />
                <label
                  htmlFor={`lecturer-profile-${index}-${subIndex}`}
                  className="form-label"
                >
                  Profile:
                </label>
                <input
                  type="text"
                  id={`lecturer-profile-${index}-${subIndex}`}
                  name="profile"
                  value={lecturer.profile}
                  onChange={(e) => handleChange(e, "lecturer", index, subIndex)}
                  className="form-control"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("lecturers", index)}
              className="btn btn-secondary mb-3"
            >
              Add Lecturer
            </button>

            <h4>Gallery:</h4>
            {university.gallery.map((image, subIndex) => (
              <div key={subIndex} className="mb-3">
                <label
                  htmlFor={`gallery-imageUrl-${index}-${subIndex}`}
                  className="form-label"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id={`gallery-imageUrl-${index}-${subIndex}`}
                  name="imageUrl"
                  value={image.imageUrl}
                  onChange={(e) => handleChange(e, "gallery", index, subIndex)}
                  className="form-control"
                />
                <label
                  htmlFor={`gallery-description-${index}-${subIndex}`}
                  className="form-label"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id={`gallery-description-${index}-${subIndex}`}
                  name="description"
                  value={image.description}
                  onChange={(e) => handleChange(e, "gallery", index, subIndex)}
                  className="form-control"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField("gallery", index)}
              className="btn btn-secondary mb-3"
            >
              Add Image
            </button>
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Add County and Universities
        </button>
      </form>

      <h2 className="my-4">Existing Counties</h2>
      <ul className="list-group">
        {counties.map((county) => (
          <li key={county.id} className="list-group-item">
            <h4>{county.name}</h4>
            <ul>
              {county.universities.map((university) => (
                <li key={university.id}>
                  <strong>{university.name}</strong> - {university.location}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
