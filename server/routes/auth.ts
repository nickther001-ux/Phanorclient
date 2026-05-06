import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';
import { signToken, requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }
  try {
    const { rows } = await pool.query('SELECT id, password_hash FROM admins WHERE email = $1', [email]);
    if (rows.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    res.json({ token: signToken(rows[0].id), email });
  } catch (err) {
    console.error('[auth] login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/verify', requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ ok: true, adminId: req.adminId });
});

export default router;
