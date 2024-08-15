import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UniversityList from "./Components/UniversityList";
import CountyList from "./Components/CountyList";
import UniversityDetails from "./Components/UniversityDetails";
import AdminPanel from "./Components/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Universities
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin Panel
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<UniversityList />} />
            <Route path="/county/:countyName" element={<CountyList />} />
            <Route
              path="/university/:universityId"
              element={<UniversityDetails />}
            />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
