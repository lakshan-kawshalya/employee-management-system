package org.learn.ems.service.impl;

import lombok.AllArgsConstructor;
import org.learn.ems.dto.DepartmentDto;
import org.learn.ems.entity.Department;
import org.learn.ems.exception.ResourceNotFoundException;
import org.learn.ems.mapper.DepartmentMapper;
import org.learn.ems.repository.DepartmentRepository;
import org.learn.ems.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

        Department department = departmentRepository.save(DepartmentMapper.mapToDepartment(departmentDto));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {

        Department department = departmentRepository.findById(departmentId).orElseThrow(()->new ResourceNotFoundException("Department not found with ID: "+departmentId));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {

        List<Department> departments= departmentRepository.findAll();

        return departments.stream().map(department -> DepartmentMapper.mapToDepartmentDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto updatedDepartment) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->new ResourceNotFoundException("Department not found with ID: "+departmentId));

        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentDescription(updatedDepartment.getDepartmentDescription());

        departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        departmentRepository.findById(departmentId).orElseThrow(()->new ResourceNotFoundException("Department not found with ID: "+departmentId));

        departmentRepository.deleteById(departmentId);
    }
}
