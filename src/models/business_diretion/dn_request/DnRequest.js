const { DataTypes } = require('sequelize');
const sequelize = require('../../../utils/sequelize');

const Departamento = require('../../rh/departments/Department');
const Cliente = require('../clients/Client');

const DnLevantamento = sequelize.define('dn_levantamento', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'descricao'
    },
    localizacao: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'localizacao'
    },
    id_departamento: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'id_departamento',
        references: {
            model: Departamento,
            key: 'id_departamento'
        }
    },
    id_cliente: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'id_cliente',
        references: {
            model: Cliente,
            key: 'id_cliente'
        }
    },
    latitude: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'latitude'
    },
    longitude: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'longitude'
    },
    status: {
        type: DataTypes.STRING(25),
        allowNull: true,
        field: 'status'
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
    tableName: 'dn_levantamento',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

DnLevantamento.belongsTo(Departamento, { foreignKey: 'id_departamento', as: 'departamento' });
DnLevantamento.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

module.exports = DnLevantamento;
