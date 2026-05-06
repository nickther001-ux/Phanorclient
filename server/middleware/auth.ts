import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SESSION_SECRET || 'phanor-secret';

export interface AuthRequest extends Request {
  adminId?: number;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, SECRET) as { id: number };
    req.adminId = payload.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function signToken(id: number): string {
  return jwt.sign({ id }, SECRET, { expiresIn: '8h' });
}
