const express = require('express');
const cors = require('cors');

// In-memory store: data is lost when the container restarts (fine for the demo).
const orders = [
  { id: 1, productName: 'Azure Mug', quantity: 2, status: 'Delivered' },
];
let nextId = 2;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'order-service' }));

app.get('/api/orders', (_req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const { productName, quantity } = req.body || {};
  const qty = Number(quantity);
  if (!productName || typeof productName !== 'string' || !Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ error: 'productName (string) and quantity (integer >= 1) are required' });
  }
  const order = { id: nextId++, productName, quantity: qty, status: 'Received' };
  orders.push(order);
  res.status(201).json(order);
});

if (require.main === module) {
  const port = process.env.PORT || 3002;
  app.listen(port, () => console.log(`order-service listening on ${port}`));
}

module.exports = app;
