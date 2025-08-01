import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateDepartment(e) {
    e.preventDefault();

    if (validateForm()) {
      const department = { departmentName, departmentDescription };

      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (departmentName.trim()) {
      errors.departmentName = "";
    } else {
      errorsCopy.departmentName = "Department name is required.";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errors.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "Department description is required.";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return "Update";
    } else {
      return "Add";
    }
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">{pageTitle()} Department</h2>
        <div className="card-body p-0">
          <form>
            <div className="form-group mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Enter Department Name"
                name="firstName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className={`form-control ${
                  errors.departmentName
                    ? "is-invalid"
                    : departmentName.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.departmentName && (
                <div className="invalid-feedback">{errors.departmentName}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                placeholder="Enter Department Description"
                name="lastName"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                className={`form-control ${
                  errors.departmentDescription
                    ? "is-invalid"
                    : departmentDescription.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.departmentDescription && (
                <div className="invalid-feedback">
                  {errors.departmentDescription}
                </div>
              )}
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={(e) => saveOrUpdateDepartment(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
