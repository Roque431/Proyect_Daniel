"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const clientes_1 = __importDefault(require("./routes/clientes"));
const reservas_1 = __importDefault(require("./routes/reservas"));
const habitaciones_1 = __importStar(require("./routes/habitaciones"));
const pagos_1 = __importDefault(require("./routes/pagos"));
const serviciosExtras_1 = __importDefault(require("./routes/serviciosExtras"));
const http_1 = require("http");
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/clientes', clientes_1.default);
app.use('/reservas', reservas_1.default);
app.use('/habitaciones', habitaciones_1.default);
app.use('/pagos', pagos_1.default);
app.use('/servicios-extras', serviciosExtras_1.default);
// Crear el servidor HTTP
const server = new http_1.Server(app);
// Iniciar el servidor HTTP
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`API escuchando en http://localhost:${port}`);
    try {
        yield database_1.default.authenticate();
        console.log('Conexión a la base de datos exitosa.');
        yield database_1.default.sync();
        console.log('Base de datos sincronizada.');
    }
    catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}));
// Crear el servidor WebSocket
const wss = new ws_1.Server({ server });
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = JSON.parse(data.toString());
            switch (message.action) {
                case 'gethabitaciones':
                    const habitaciones = yield (0, habitaciones_1.obtenerHabitaciones)();
                    ws.send(JSON.stringify({ event: 'gethabitaciones', data: habitaciones }));
                    break;
                case 'createHabitacion':
                    const { numHabitacion, tipo, precioXNoche, estado } = message.data;
                    yield (0, habitaciones_1.crearHabitaciones)({
                        numHabitacion, tipo, precioXNoche, estado,
                        idHabitacion: 0
                    });
                    const updatedHabitaciones = yield (0, habitaciones_1.obtenerHabitaciones)();
                    wss.clients.forEach(client => {
                        if (client.readyState === ws_1.WebSocket.OPEN) {
                            client.send(JSON.stringify({ event: 'habitacionCreada', data: updatedHabitaciones }));
                        }
                    });
                    break;
                default:
                    ws.send(JSON.stringify({ error: 'Acción no válida' }));
            }
        }
        catch (error) {
            console.error('Error al manejar el mensaje:', error);
            ws.send(JSON.stringify({ error: 'Error al manejar el mensaje' }));
        }
    }));
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});
exports.default = app;
