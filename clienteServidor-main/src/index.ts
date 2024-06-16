import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import clientesRouter from './routes/clientes';
import reservasRouter from './routes/reservas';
import habitacionesRouter, { crearHabitaciones, obtenerHabitaciones } from './routes/habitaciones';
import pagosRouter from './routes/pagos';
import serviciosExtrasRouter from './routes/serviciosExtras';
import { Server as HttpServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/clientes', clientesRouter);
app.use('/reservas', reservasRouter);
app.use('/habitaciones', habitacionesRouter);
app.use('/pagos', pagosRouter);
app.use('/servicios-extras', serviciosExtrasRouter);

// Crear el servidor HTTP
const server = new HttpServer(app);

// Iniciar el servidor HTTP
server.listen(port, async () => {
  console.log(`API escuchando en http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
    await sequelize.sync();
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});

// Crear el servidor WebSocket
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.action) {
        case 'gethabitaciones':
          const habitaciones = await obtenerHabitaciones();
          ws.send(JSON.stringify({ event: 'gethabitaciones', data: habitaciones }));
          break;
        case 'createHabitacion':
          const { numHabitacion, tipo, precioXNoche, estado } = message.data;
          await crearHabitaciones({
            numHabitacion, tipo, precioXNoche, estado,
            idHabitacion: 0
          });
          const updatedHabitaciones = await obtenerHabitaciones();
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ event: 'habitacionCreada', data: updatedHabitaciones }));
            }
          });
          break;
        default:
          ws.send(JSON.stringify({ error: 'Acción no válida' }));
      }
    } catch (error) {
      console.error('Error al manejar el mensaje:', error);
      ws.send(JSON.stringify({ error: 'Error al manejar el mensaje' }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

export default app;
