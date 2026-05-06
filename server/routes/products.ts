import { Router, Request, Response } from 'express';
import pool from '../db';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('[products] GET error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (rows.length === 0) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { name_fr, name_en, description_fr, description_en, price, stock, image_url, category } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (name_fr, name_en, description_fr, description_en, price, stock, image_url, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name_fr, name_en, description_fr || '', description_en || '', price, stock || 0, image_url || '', category || 'b2c']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('[products] POST error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const { name_fr, name_en, description_fr, description_en, price, stock, image_url, category } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE products SET name_fr=$1, name_en=$2, description_fr=$3, description_en=$4,
       price=$5, stock=$6, image_url=$7, category=$8 WHERE id=$9 RETURNING *`,
      [name_fr, name_en, description_fr, description_en, price, stock, image_url, category, req.params.id]
    );
    if (rows.length === 0) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
