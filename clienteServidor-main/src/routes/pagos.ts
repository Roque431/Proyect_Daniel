import { Router } from 'express';
import Pago from '../models/Pago';

const router = Router();

router.get('/', async (req, res) => {
  const pagos = await Pago.findAll();
  res.json(pagos);
});

router.post('/', async (req, res) => {
  const pago = await Pago.create(req.body);
  res.status(201).json(pago);
});

export default router;
