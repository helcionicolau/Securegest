const authModel = require("./auth/Auth");
const projectsModel = require("./general_diretion/projects/Project");
const tasksModel = require("./general_diretion/tasks/Task");
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
const profileModel = require("./profile/profile");
const areaModel = require("./business_diretion/area/Area");
const logisticModel = require("./business_diretion/logistic/Logistic");
const postModel = require("./business_diretion/post/Post");
const positionModel = require("./business_diretion/position/Position");
const zoneModel = require("./business_diretion/zone/Zone");
const providerModel = require("./business_diretion/provider/Provider");
const taskDepartEmploModel = require("./general_diretion/tasks/taskDepartmentEmployee");
const roleModel = require("./roles/Role");
const menuModel = require("./menus/Menu");
const roleAccessModel = require("./roleaccess/Roleaccess");


authModel.hasMany(authModel, {
    constraint: true,
    foreignKey: "id"
});

projectsModel.hasMany(projectsModel, {
    construent: true,
    foreignKey: "id_projeto"
});

tasksModel.hasMany(tasksModel, {
    construent: true,
    foreignKey: "id_tarefa"
});

taskDepartEmploModel.hasMany(taskDepartEmploModel, {
    construent: true,
    foreignKey: "id_tdf"
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

rolesModel.hasMany(rolesModel, {
    construent: true,
    foreignKey: "id_cargo"
});

employeeRolesModel.hasMany(employeeRolesModel, {
    construent: true,
    foreignKey: "id_fc"
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

profileModel.hasMany(profileModel, {
    construent: true,
    foreignKey: "id_perfil"
});

areaModel.hasMany(areaModel, {
    construent: true,
    foreignKey: "id_area"
});

logisticModel.hasMany(logisticModel, {
    construent: true,
    foreignKey: "id_logistica"
});

postModel.hasMany(postModel, {
    construent: true,
    foreignKey: "id_posto"
});

positionModel.hasMany(positionModel, {
    construent: true,
    foreignKey: "id_posicao"
});

zoneModel.hasMany(zoneModel, {
    construent: true,
    foreignKey: "id_zona"
});

providerModel.hasMany(providerModel, {
    construent: true,
    foreignKey: "id_provedora"
});

roleModel.hasMany(roleModel, {
    construent: true,
    foreignKey: "id_role"
});

menuModel.hasMany(menuModel, {
    construent: true,
    foreignKey: "id_menu"
});

roleAccessModel.hasMany(roleAccessModel, {
    construent: true,
    foreignKey: "id_rm"
});

module.exports = {
    authModel,
    projectsModel,
    tasksModel,
    taskDepartEmploModel,
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
    profileModel,
    areaModel,
    logisticModel,
    postModel,
    positionModel,
    zoneModel,
    providerModel,
    roleModel,
    menuModel,
    roleAccessModel
}