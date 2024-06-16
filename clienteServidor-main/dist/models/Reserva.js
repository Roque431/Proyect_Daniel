"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Reserva extends sequelize_1.Model {
}
Reserva.init({
    idReserva: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idCliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idHabitacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fechaInicio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fechaFin: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'reserva',
});
exports.default = Reserva;
