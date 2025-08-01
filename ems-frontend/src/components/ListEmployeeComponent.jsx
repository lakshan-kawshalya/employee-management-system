import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const navigator = useNavigate();

  function fetchEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        console.log(response.data);
        fetchEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !selectedDepartment ||
      employee.departmentId === parseInt(selectedDepartment);
    return matchesName && matchesDepartment;
  });

  return (
    <div className="container my-5">
      <div className="p-4 rounded">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="flex-grow-1 m-0">List Employees</h1>
          <button
            className="btn btn-success btn-lg ms-3"
            onClick={addNewEmployee}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Employee
          </button>
        </div>

        <div className="row mb-4">
          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-5 mb-2">
            <select
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-secondary ms-3"
              onClick={() => {
                setSearchTerm("");
                setSelectedDepartment("");
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i> Reset
              Filters
            </button>
          </div>
        </div>

        <hr className="border-light" />
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle mb-0">
            <thead className="table-dark text-light">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning text-dark"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => removeEmployee(employee.id)}
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

export default ListEmployeeComponent;
