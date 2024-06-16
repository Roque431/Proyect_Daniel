import { Router } from 'express';
import ServicioExtra from '../models/ServicioExtra';

const router = Router();

router.get('/', async (req, res) => {
  const serviciosExtras = await ServicioExtra.findAll();
  res.json(serviciosExtras);
});

router.post('/', async (req, res) => {
  const servicioExtra = await ServicioExtra.create(req.body);
  res.status(201).json(servicioExtra);
});

export default router;
