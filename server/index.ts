import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import ordersRoutes from './routes/orders';
import webhookRoutes from './routes/webhooks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3001', 10);

const app = express();

app.use('/api/webhooks', express.raw({ type: 'application/json' }));

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// In production, serve the Vite build and handle SPA routing
if (isProd) {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*splat', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

async function start() {
  // Start the HTTP server first — site loads regardless of DB status
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Phanor API running on port ${PORT} (${isProd ? 'production' : 'development'})`);
  });

  // Attempt DB init separately so a bad DATABASE_URL doesn't kill the process
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[DB] DATABASE_URL is not set — skipping database init. API routes requiring DB will fail.');
    return;
  }

  try {
    new URL(dbUrl); // validate URL format before handing to pg
  } catch {
    console.error('[DB] DATABASE_URL is not a valid URL:', dbUrl.slice(0, 30) + '...');
    console.error('[DB] Expected format: postgresql://user:password@host:5432/dbname');
    return;
  }

  try {
    await initDb();
  } catch (err) {
    console.error('[DB] Failed to initialise database — API routes requiring DB will return 503:', err);
  }
}

start();
