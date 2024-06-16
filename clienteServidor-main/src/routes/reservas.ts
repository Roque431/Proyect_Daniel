import { Router } from 'express';
import Reserva from '../models/Reserva';

const router = Router();

// Short Polling: simplemente consulta normal
router.get('/', async (req, res) => {
  const reservas = await Reserva.findAll();
  res.json(reservas);
});

// Long Polling
router.get('/long-polling', (req, res) => {
  const checkForUpdates = async () => {
    const reservas = await Reserva.findAll();
    if (reservas.length > 0) {
      res.json(reservas);
    } else {
      setTimeout(checkForUpdates, 9000); // Verifica cada segundo
    }
  };

  checkForUpdates();
});

router.post('/', async (req, res) => {
  const reserva = await Reserva.create(req.body);
  res.status(201).json(reserva);
});

export default router;
