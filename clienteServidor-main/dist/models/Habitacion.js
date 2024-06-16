"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerHabitacion = exports.crearHabitaciones = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Habitacion extends sequelize_1.Model {
}
Habitacion.init({
    idHabitacion: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numHabitacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    precioXNoche: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Habitacion',
});
const crearHabitaciones = (habitacionData) => __awaiter(void 0, void 0, void 0, function* () {
    yield Habitacion.create(habitacionData);
});
exports.crearHabitaciones = crearHabitaciones;
const obtenerHabitacion = (idHabitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitacion = yield Habitacion.findByPk(idHabitacion);
        return habitacion;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.obtenerHabitacion = obtenerHabitacion;
exports.default = Habitacion;
