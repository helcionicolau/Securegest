const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('logs_logout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "data_hora"
    }
}, {
    tableName: "logs_logout",
    //timestamps: false // Se você não precisa de colunas de timestamp created_at e updated_at
});


// Created by António Baptista #(24/08/2023)