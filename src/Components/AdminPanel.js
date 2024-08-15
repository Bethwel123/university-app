import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [newUniversity, setNewUniversity] = useState({
    id: null,
    name: "",
    location: "",
    programmes: [{ name: "" }],
    facilities: [{ name: "" }],
    lecturers: [{ name: "" }],
    gallery: [{ imageUrl: "" }],
  });
  const [universities, setUniversities] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/counties/1")
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data.universities || []);
      })
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  const handleChange = (e) => {
    setNewUniversity({ ...newUniversity, [e.target.name]: e.target.value });
  };

  const handleProgrammeChange = (e, index) => {
    const updatedProgrammes = [...newUniversity.programmes];
    updatedProgrammes[index] = {
      ...updatedProgrammes[index],
      name: e.target.value,
    };
    setNewUniversity({ ...newUniversity, programmes: updatedProgrammes });
  };

  const handleFacilityChange = (e, index) => {
    const updatedFacilities = [...newUniversity.facilities];
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      name: e.target.value,
    };
    setNewUniversity({ ...newUniversity, facilities: updatedFacilities });
  };

  const handleLecturerChange = (e, index) => {
    const updatedLecturers = [...newUniversity.lecturers];
    updatedLecturers[index] = {
      ...updatedLecturers[index],
      name: e.target.value,
    };
    setNewUniversity({ ...newUniversity, lecturers: updatedLecturers });
  };

  const handleGalleryChange = (e, index) => {
    const updatedGallery = [...newUniversity.gallery];
    updatedGallery[index] = {
      ...updatedGallery[index],
      imageUrl: e.target.value,
    };
    setNewUniversity({ ...newUniversity, gallery: updatedGallery });
  };

  const handleAddProgramme = () => {
    setNewUniversity({
      ...newUniversity,
      programmes: [...newUniversity.programmes, { name: "" }],
    });
  };

  const handleAddFacility = () => {
    setNewUniversity({
      ...newUniversity,
      facilities: [...newUniversity.facilities, { name: "" }],
    });
  };

  const handleAddLecturer = () => {
    setNewUniversity({
      ...newUniversity,
      lecturers: [...newUniversity.lecturers, { name: "" }],
    });
  };

  const handleAddGallery = () => {
    setNewUniversity({
      ...newUniversity,
      gallery: [...newUniversity.gallery, { imageUrl: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUniversity.name || !newUniversity.location) {
      console.error("Name and Location are required.");
      return;
    }

    try {
      let updatedUniversities;
      if (editMode) {
        updatedUniversities = universities.map((university) =>
          university.id === newUniversity.id ? newUniversity : university
        );
      } else {
        const id = Date.now();
        updatedUniversities = [...universities, { ...newUniversity, id }];
      }

      const response = await fetch("http://localhost:3000/counties/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universities: updatedUniversities }),
      });

      if (response.ok) {
        setUniversities(updatedUniversities);
        setNewUniversity({
          id: null,
          name: "",
          location: "",
          programmes: [{ name: "" }],
          facilities: [{ name: "" }],
          lecturers: [{ name: "" }],
          gallery: [{ imageUrl: "" }],
        });
        setEditMode(false);
        console.log("University created/updated successfully");
      } else {
        console.error("Error creating/updating university");
      }
    } catch (error) {
      console.error("Error creating/updating university:", error);
    }
  };

  const handleEdit = (index) => {
    setNewUniversity({ ...universities[index] });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    const updatedUniversities = universities.filter(
      (university) => university.id !== id
    );
    try {
      const response = await fetch("http://localhost:3000/counties/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universities: updatedUniversities }),
      });

      if (response.ok) {
        setUniversities(updatedUniversities);
        console.log("University deleted successfully");
      } else {
        console.error("Error deleting university");
      }
    } catch (error) {
      console.error("Error deleting university:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUniversity.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={newUniversity.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <h3>Programmes:</h3>
        {newUniversity.programmes.map((programme, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`programme-${index}`} className="form-label">
              Programme {index + 1}:
            </label>
            <input
              type="text"
              id={`programme-${index}`}
              value={programme.name}
              onChange={(e) => handleProgrammeChange(e, index)}
              className="form-control"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProgramme}
          className="btn btn-secondary mb-3"
        >
          Add Programme
        </button>

        <h3>Facilities:</h3>
        {newUniversity.facilities.map((facility, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`facility-${index}`} className="form-label">
              Facility {index + 1}:
            </label>
            <input
              type="text"
              id={`facility-${index}`}
              value={facility.name}
              onChange={(e) => handleFacilityChange(e, index)}
              className="form-control"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFacility}
          className="btn btn-secondary mb-3"
        >
          Add Facility
        </button>

        <h3>Lecturers:</h3>
        {newUniversity.lecturers.map((lecturer, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`lecturer-${index}`} className="form-label">
              Lecturer {index + 1}:
            </label>
            <input
              type="text"
              id={`lecturer-${index}`}
              value={lecturer.name}
              onChange={(e) => handleLecturerChange(e, index)}
              className="form-control"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddLecturer}
          className="btn btn-secondary mb-3"
        >
          Add Lecturer
        </button>

        <h3>Gallery:</h3>
        {newUniversity.gallery.map((image, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`gallery-${index}`} className="form-label">
              Image URL {index + 1}:
            </label>
            <input
              type="text"
              id={`gallery-${index}`}
              value={image.imageUrl}
              onChange={(e) => handleGalleryChange(e, index)}
              className="form-control"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddGallery}
          className="btn btn-secondary"
        >
          Add Image
        </button>

        <button type="submit" className="btn btn-primary">
          {editMode ? "Update University" : "Add University"}
        </button>
      </form>

      <h2 className="my-4">University List</h2>
      <ul className="list-group">
        {universities.map((university) => (
          <li
            key={university.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{university.name}</h5>
              <p>{university.location}</p>
            </div>
            <div>
              <button
                className="btn btn-info me-2"
                onClick={() =>
                  handleEdit(
                    universities.findIndex((u) => u.id === university.id)
                  )
                }
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(university.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
