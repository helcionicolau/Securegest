const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('posto_supervisor', {
    id_ps: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_ps"
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        field: "id_usuario"
    },
    id_posto: {
        type: DataTypes.INTEGER,
        field: "id_posto"
    },
    data_registro: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "data_registro"
    },
    data_atualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
        field: "data_atualizacao"
    },
}, {
    tableName: "posto_supervisor"
});

// Created by António Baptista #(24/08/2023)