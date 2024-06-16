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
exports.obtenerHabitaciones = exports.crearHabitaciones = void 0;
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const Habitacion_1 = __importDefault(require("../models/Habitacion"));
const router = (0, express_1.Router)();
let lastCheckedTime = new Date();
// Obtener todas las habitaciones
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitaciones = yield Habitacion_1.default.findAll();
        res.json(habitaciones);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Short polling para nuevas habitaciones
router.get('/nuevas-habitaciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitaciones = yield Habitacion_1.default.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.gt]: lastCheckedTime,
                },
            },
        });
        lastCheckedTime = new Date();
        res.json(habitaciones);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Crear una nueva habitación
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitacion = yield Habitacion_1.default.create(req.body);
        res.status(201).json(habitacion);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
const crearHabitaciones = (habitacionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Habitacion_1.default.create(habitacionData);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.crearHabitaciones = crearHabitaciones;
const obtenerHabitaciones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitaciones = yield Habitacion_1.default.findAll();
        return habitaciones;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.obtenerHabitaciones = obtenerHabitaciones;
exports.default = router;
