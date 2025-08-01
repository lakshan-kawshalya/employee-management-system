import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold fs-4" href="/">
            <i className="bi bi-building me-2"></i> Employee Management System
          </a>
          <div className="d-flex ms-auto">
            <NavLink
              className="nav-link text-white fw-semibold me-3"
              to="/employees"
            >
              Employees
            </NavLink>
            <NavLink
              className="nav-link text-white fw-semibold"
              to="/departments"
            >
              Departments
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
