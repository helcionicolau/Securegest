const express = require('express');
const userRoutes = require('./users/usersRoute');
const userProfileRoutes = require('./users/usersProfileRoute');
const authRoutes = require('./auths/authsRoute');
const employeeRoutes = require('./rh/employees/employeesRoute');
const employeeRoleRoutes = require('./rh/roles/rolesRoute');
const departmentRoutes = require('./rh/departments/departmentsRoute');
const edRoutes = require('./rh/employees_departments/edRoute');
const holidayRoutes = require('./rh/holidays/holidaysRoute');
const leaveTypeRoutes = require('./rh/leave_types/leaveTypesRoute');
const employeeLeaveRoutes = require('./rh/employee_leaves/employeeLeavesRoute');
const employeeVacationRoutes = require('./rh/employee_vacations/employeeVacationsRoute');
const clientRoutes = require('./business_diretion/clients/clientsRoute');
const projectRoutes = require('./general_direction/projects/projectsRoute');
const taskRoutes = require('./general_direction/tasks/tasksRoute');
const taskDepartmantEmployeeRoutes = require('./general_direction/tasks/taskDepartmentEmployeesRoute');
const areaRoutes = require('./business_diretion/area/areasRoute');
const logisticRoutes = require('./business_diretion/logistic/logisticsRoute');
const postRoutes = require('./business_diretion/post/postsRoute');
const providerRoutes = require('./business_diretion/provider/providersRoute');
const zoneRoutes = require('./business_diretion/zone/zonesRoute');
const positionRoutes = require('./business_diretion/position/positionsRoute');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/user_profile', userProfileRoutes);
router.use('/employees', employeeRoutes);
router.use('/employee_roles', employeeRoleRoutes);
router.use('/departments', departmentRoutes);
router.use('/employees_departments', edRoutes);
router.use('/holidays', holidayRoutes);
router.use('/leave_types', leaveTypeRoutes);
router.use('/employeeLeaves', employeeLeaveRoutes);
router.use('/employeeVacations', employeeVacationRoutes);
router.use('/clients', clientRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/area', areaRoutes);
router.use('/logistic', logisticRoutes);
router.use('/post', postRoutes);
router.use('/provider', providerRoutes);
router.use('/zone', zoneRoutes);
router.use('/employee_task', taskDepartmantEmployeeRoutes);
router.use('/position', positionRoutes);

module.exports = router;

// Created by António Baptista #(24/08/2023)