const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionarios_departamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "funcionario_id"
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "departamento_id"
    },
    data_associacao: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "data_associacao"
    }
}, {
    tableName: "funcionarios_departamentos"
});

// Created by António Baptista #(24/08/2023)