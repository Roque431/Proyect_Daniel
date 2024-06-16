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
const express_1 = require("express");
const Cliente_1 = __importDefault(require("../models/Cliente"));
const router = (0, express_1.Router)();
let responses = [];
// Endpoint para obtener todos los clientes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield Cliente_1.default.findAll();
        res.json(clientes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Endpoint para recibir nuevas notificaciones de clientes (long polling)
router.get('/poll', (req, res) => {
    responses.push(res);
    req.on('close', () => {
        responses = responses.filter(r => r !== res);
    });
});
// Endpoint para crear un nuevo cliente
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield Cliente_1.default.create(req.body);
        res.status(201).json(cliente);
        notifyNewCliente(cliente);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
function notifyNewCliente(cliente) {
    for (let res of responses) {
        res.json({
            success: true,
            cliente
        });
    }
    responses = [];
}
exports.default = router;
