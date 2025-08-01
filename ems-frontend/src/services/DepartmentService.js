import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api/departments"

export const getAllDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (department) => axios.post(REST_API_BASE_URL, department);

export const getDepartmentById = (departmentId) => axios.get(REST_API_BASE_URL + '/' + departmentId);

export const updateDepartment = (departmentId, updatedDepartment) => axios.put(REST_API_BASE_URL + '/' + departmentId, updatedDepartment);

export const deleteDepartment = (departmentId) => axios.delete(REST_API_BASE_URL + '/' + departmentId);