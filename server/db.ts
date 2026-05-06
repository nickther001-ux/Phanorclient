import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
});

export default pool;

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name_fr TEXT NOT NULL DEFAULT '',
      name_en TEXT NOT NULL DEFAULT '',
      description_fr TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      stock INTEGER DEFAULT 0,
      image_url TEXT DEFAULT '',
      category TEXT DEFAULT 'b2c',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name TEXT NOT NULL DEFAULT '',
      customer_email TEXT DEFAULT '',
      items JSONB NOT NULL DEFAULT '[]',
      total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      stripe_session_id TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      referral_code TEXT UNIQUE,
      credits DECIMAL(10,2) DEFAULT 0,
      tier TEXT DEFAULT 'bronze',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const { rows } = await pool.query('SELECT id FROM admins WHERE email = $1', [adminEmail]);
    if (rows.length === 0) {
      const bcrypt = await import('bcrypt');
      const hash = await bcrypt.hash(adminPassword, 12);
      await pool.query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [adminEmail, hash]);
      console.log('[DB] Admin seeded:', adminEmail);
    }
  }

  console.log('[DB] Tables ready');
}
