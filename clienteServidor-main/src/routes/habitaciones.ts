import { Router } from 'express';
import { Op } from 'sequelize';
import Habitacion from '../models/Habitacion';

const router = Router();

let lastCheckedTime: Date = new Date();

// Obtener todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Short polling para nuevas habitaciones
router.get('/nuevas-habitaciones', async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll({
      where: {
        createdAt: {
          [Op.gt]: lastCheckedTime,
        },
      },
    });
    lastCheckedTime = new Date();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Crear una nueva habitación
router.post('/', async (req, res) => {
  try {
    const habitacion = await Habitacion.create(req.body);
    res.status(201).json(habitacion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export const crearHabitaciones = async (habitacionData: {
  idHabitacion: number,
  numHabitacion: string,
  tipo: string,
  precioXNoche: number,
  estado: string
}): Promise<void> => {
  try {
    await Habitacion.create(habitacionData);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
export const obtenerHabitaciones = async (): Promise<Habitacion[]> => {
  try {
    const habitaciones = await Habitacion.findAll();
    return habitaciones;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default router;
