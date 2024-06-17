const logoutModel = require("./logout/Logout");
const projectsModel = require("./general_diretion/projects/Project");
const clientsModel = require("./business_diretion/clients/Client");
const departamentsModel = require("./rh/departments/Department");
const employee_leavesModel = require("./rh/employee_leaves/employeeLeave");
const employee_vacationsModel = require("./rh/employee_vacations/employeeVacation");
const employeesModel = require("./rh/employees/Employee");
const rolesModel = require("./rh/roles/Role");
const employeeRolesModel = require("./rh/employee_roles/EmployeeRole");
const employee_departamentsModel = require("./rh/employees_departments/ED");
const holidaysModel = require("./rh/holidays/Holiday");
const leave_typesModel = require("./rh/leave_types/leaveType");
const userModel = require("./user/User");
const areaModel = require("./business_diretion/area/Area");
const postModel = require("./business_diretion/post/Post");
const positionModel = require("./business_diretion/position/Position");
const zoneModel = require("./business_diretion/zone/Zone");
const providerModel = require("./business_diretion/provider/Provider");
const roleModel = require("./roles/Role");
const menuModel = require("./menus/Menu");
const roleAccessModel = require("./roleaccess/Roleaccess");
const provinceModel = require("./provinces/Province");
const countyModel = require("./counties/County");
const projectDepartmentModel = require("../models/general_diretion/projects_departments/ProjectDepartment");
const employeeTaskModel = require("./general_diretion/employee_tasks/EmployeeTask");
const employeePostModel = require("./business_diretion/post_security/PostSecurity");
const categoryLogisticModel = require("./logistic/category/Category");
const logisticModel = require("./logistic/Logistic");
const attributeLogisticModel = require("./logistic/attributeLogistic");

module.exports = {
    logoutModel,
    projectsModel,
    clientsModel,
    departamentsModel,
    employee_leavesModel,
    employee_vacationsModel,
    employeesModel,
    rolesModel,
    employeeRolesModel,
    employee_departamentsModel,
    holidaysModel,
    leave_typesModel,
    userModel,
    areaModel,
    postModel,
    positionModel,
    zoneModel,
    providerModel,
    roleModel,
    menuModel,
    roleAccessModel,
    provinceModel,
    countyModel,
    projectDepartmentModel,
    employeeTaskModel,
    employeePostModel,
    categoryLogisticModel,
    logisticModel,
    attributeLogisticModel
}