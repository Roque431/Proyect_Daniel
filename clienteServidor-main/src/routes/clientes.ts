import { Router, Response, Request } from 'express';
import Cliente from '../models/Cliente';

const router = Router();

let responses: Response[] = [];

// Endpoint para obtener todos los clientes
router.get('/', async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint para recibir nuevas notificaciones de clientes (long polling)
router.get('/poll', (req: Request, res: Response) => {
  responses.push(res);
  req.on('close', () => {
    responses = responses.filter(r => r !== res);
  });
});

// Endpoint para crear un nuevo cliente
router.post('/', async (req: Request, res: Response) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
    notifyNewCliente(cliente);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

function notifyNewCliente(cliente: any) {
  for (let res of responses) {
    res.json({
      success: true,
      cliente
    });
  }
  responses = [];
}

export default router;
