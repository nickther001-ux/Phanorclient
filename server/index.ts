import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import ordersRoutes from './routes/orders';
import webhookRoutes from './routes/webhooks';

const app = express();
const PORT = 3001;

app.use('/api/webhooks', express.raw({ type: 'application/json' }));

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

async function start() {
  try {
    await initDb();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[server] Phanor API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[server] Failed to start:', err);
    process.exit(1);
  }
}

start();
