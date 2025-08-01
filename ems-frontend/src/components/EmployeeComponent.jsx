import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { getAllDepartments } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
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

    if (firstName.trim()) {
      errors.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required.";
      valid = false;
    }

    if (lastName.trim()) {
      errors.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required.";
      valid = false;
    }

    if (email.trim()) {
      errors.email = "";
    } else {
      errorsCopy.email = "Email is required.";
      valid = false;
    }

    if (departmentId) {
      errors.department = "";
    } else {
      errorsCopy.department = "Select Department";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return "Update Employee";
    } else {
      return "Add Employee";
    }
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">{pageTitle()}</h2>
        <div className="card-body p-0">
          <form>
            <div className="form-group mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                placeholder="Enter Employee First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`form-control ${
                  errors.firstName
                    ? "is-invalid"
                    : firstName.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`form-control ${
                  errors.lastName
                    ? "is-invalid"
                    : lastName.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter Employee Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${
                  errors.email
                    ? "is-invalid"
                    : email.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Department</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className={`form-control ${
                  errors.department
                    ? "is-invalid"
                    : email.trim() !== ""
                    ? "is-valid"
                    : ""
                }`}
              >
                <option value="Select Department">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className="invalid-feedback">{errors.department}</div>
              )}
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={saveOrUpdateEmployee}
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

export default EmployeeComponent;
