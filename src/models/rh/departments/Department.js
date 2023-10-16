const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('departamentos', {
    id_departamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_departamento"
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nome"
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "descricao"
    }
}, {
    tableName: "departamentos"
});

// Created by António Baptista #(24/08/2023)