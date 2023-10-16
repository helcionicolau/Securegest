// routes/index.js
const express = require('express');
const userRoutes = require('./users/usersRoute');
const authRoutes = require('./auths/authsRoute');
const employeeRoutes = require('./rh/employees/employeesRoute');
const departmentRoutes = require('./rh/departments/departmentsRoute');
const edRoutes = require('./rh/employees_departments/edRoute');
const holidayRoutes = require('./rh/holidays/holidaysRoute');
const leaveTypeRoutes = require('./rh/leave_types/leaveTypesRoute');
const employeeLeaveRoutes = require('./rh/employee_leaves/employeeLeavesRoute');
const employeeVacationRoutes = require('./rh/employee_vacations/employeeVacationsRoute');
const clientRoutes = require('./operation_control/clients/clientsRoute');
const projectRoutes = require('./general_direction/projects/projectsRoute');
const taskRoutes = require('./general_direction/tasks/tasksRoute');
const employeeTaskRoutes = require('./general_direction/employee_tasks/employeeTasksRoute');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);
router.use('/departments', departmentRoutes);
router.use('/employees_departments', edRoutes);
router.use('/holidays', holidayRoutes);
router.use('/leave_types', leaveTypeRoutes);
router.use('/employeeLeaves', employeeLeaveRoutes);
router.use('/employeeVacations', employeeVacationRoutes);
router.use('/clients', clientRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/employee_tasks', employeeTaskRoutes);

module.exports = router;

// Created by António Baptista #(24/08/2023)