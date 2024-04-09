// Roleaccess.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const RoleAccess = prisma.roleAccess;
const Role = prisma.role;
const Menu = prisma.menu;

RoleAccess.belongsTo(Role, { foreignKey: 'role_id' });
RoleAccess.belongsTo(Menu, { foreignKey: 'menu_id' });

module.exports = {
  RoleAccess,
  Role,
  Menu,
};