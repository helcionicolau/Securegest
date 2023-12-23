// models/posto_segurancas.model.js
const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('posto_segurancas', {
    id_pss: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_pss"
    },
    id_posto: {
        type: DataTypes.INTEGER,
        field: "id_posto"
    },
    n_mec: {
        type: DataTypes.INTEGER,
        field: "n_mec"
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
    tableName: "posto_segurancas"
});

// Created by António Baptista #(Data de Criação)