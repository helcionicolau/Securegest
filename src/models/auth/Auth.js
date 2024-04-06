const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('logs_logout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Adicionado para indicar autoincremento
        field: "id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "user_id"
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "data_hora"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    tableName: "logs_logout",
    timestamps: true, // Habilita o uso dos timestamps automáticos
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });


// Created by António Baptista #(24/08/2023)