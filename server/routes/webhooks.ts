import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import pool from '../db';

const router = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey) {
    res.status(500).json({ error: 'Stripe not configured' });
    return;
  }

  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;

  if (webhookSecret) {
    const sig = req.headers['stripe-signature'] as string;
    try {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
    } catch (err) {
      console.error('[webhook] signature verification failed:', err);
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }
  } else {
    event = req.body as Stripe.Event;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await pool.query(
        "UPDATE orders SET status='paid', stripe_session_id=$1 WHERE stripe_session_id=$2",
        [session.id, session.id]
      );

      if (session.metadata?.items) {
        const items = JSON.parse(session.metadata.items) as Array<{ id: number; quantity: number }>;
        for (const item of items) {
          await pool.query(
            'UPDATE products SET stock = GREATEST(0, stock - $1) WHERE id = $2',
            [item.quantity, item.id]
          );
        }
      }

      if (session.customer_email) {
        const { rows } = await pool.query(
          'SELECT id, tier FROM users WHERE email = $1',
          [session.customer_email]
        );
        if (rows.length > 0) {
          const amount = (session.amount_total || 0) / 100;
          const creditRate = rows[0].tier === 'gold' ? 0.05 : rows[0].tier === 'silver' ? 0.03 : 0.01;
          const credits = amount * creditRate;
          await pool.query('UPDATE users SET credits = credits + $1 WHERE id = $2', [credits, rows[0].id]);
        }
      }

      console.log('[webhook] checkout.session.completed handled:', session.id);
    } catch (err) {
      console.error('[webhook] DB update error:', err);
    }
  }

  res.json({ received: true });
});

export default router;
