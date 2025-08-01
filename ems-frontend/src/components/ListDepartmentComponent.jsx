import React, { useEffect, useState } from "react";
import {
  deleteDepartment,
  getAllDepartments,
} from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  function fetchDepartments() {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data);
        fetchDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container my-5">
      <div className="p-4 rounded">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="flex-grow-1 m-0">List Departments</h1>
          <Link to="/add-department" className="btn btn-success btn-lg ms-3">
            <i className="bi bi-plus-circle me-2"></i> Add Department
          </Link>
        </div>
        <hr className="border-light" />
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead className="table-dark text-light">
              <tr>
                <th scope="col">Department ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.departmentDescription}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning text-dark"
                      onClick={() => updateDepartment(department.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => removeDepartment(department.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListDepartmentComponent;
