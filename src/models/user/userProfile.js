const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('perfis_usuario', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_perfil"
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "nome"
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "decricao"
    }
}, {
    tableName: "perfis_usuario"
});

// Created by António Baptista #(24/08/2023)