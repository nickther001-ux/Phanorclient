import { Router, Request, Response } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { customer_name, customer_email, items, total_price } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO orders (customer_name, customer_email, items, total_price)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [customer_name, customer_email || '', JSON.stringify(items || []), total_price]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/status', requireAuth, async (req: Request, res: Response) => {
  const { status } = req.body as { status: string };
  const validStatuses = ['pending', 'paid', 'cancelled'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }
  try {
    const { rows } = await pool.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
