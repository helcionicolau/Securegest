const authModel = require("./auth/Auth");
const employee_tasksModel = require("./general_diretion/employee_tasks/employeeTask");
const projectsModel = require("./general_diretion/projects/Project");
const tasksModel = require("./general_diretion/tasks/Task");
const clientsModel = require("./operation_control/clients/Client");
const departamentsModel = require("./rh/departments/Department");
const employee_leavesModel = require("./rh/employee_leaves/employeeLeave");
const employee_vacationsModel = require("./rh/employee_vacations/employeeVacation");
const employeesModel = require("./rh/employees/Employee");
const employee_departamentsModel = require("./rh/employees_departments/ED");
const holidaysModel = require("./rh/holidays/Holiday");
const leave_typesModel = require("./rh/leave_types/leaveType");
const userModel = require("./user/User");


authModel.hasMany(authModel, {
    constraint: true,
    foreignKey: "id"
});

employee_tasksModel.hasMany(employee_tasksModel, {
    construent: true,
    foreignKey: "id_ft"
});

projectsModel.hasMany(projectsModel, {
    construent: true,
    foreignKey: "id_projeto"
});


tasksModel.hasMany(tasksModel, {
    construent: true,
    foreignKey: "id_tarefa"
});

clientsModel.hasMany(clientsModel, {
    construent: true,
    foreignKey: "id_cliente"
});

departamentsModel.hasMany(departamentsModel, {
    construent: true,
    foreignKey: "id_departamento"
});

employee_leavesModel.hasMany(employee_leavesModel, {
    construent: true,
    foreignKey: "id"
});

employee_vacationsModel.hasMany(employee_vacationsModel, {
    construent: true,
    foreignKey: "id_feria"
});

employeesModel.hasMany(employeesModel, {
    construent: true,
    foreignKey: "id_funcionario"
});

employee_departamentsModel.hasMany(employee_departamentsModel, {
    construent: true,
    foreignKey: "id"
});

holidaysModel.hasMany(holidaysModel, {
    construent: true,
    foreignKey: "id_feriado"
});

leave_typesModel.hasMany(leave_typesModel, {
    construent: true,
    foreignKey: "id_tipo"
});

userModel.hasMany(userModel, {
    construent: true,
    foreignKey: "id_usuario"
});

module.exports = {
    authModel,
    employee_tasksModel,
    projectsModel,
    tasksModel,
    clientsModel,
    departamentsModel,
    employee_leavesModel,
    employee_vacationsModel,
    employeesModel,
    employee_departamentsModel,
    holidaysModel,
    leave_typesModel,
    userModel
}