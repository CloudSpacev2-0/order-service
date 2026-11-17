const test = require('node:test');
const assert = require('node:assert');
const app = require('./server');

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => server.close());

const post = (body) =>
  fetch(`${base}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

test('GET /health', async () => {
  const res = await fetch(`${base}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok', service: 'order-service' });
});

test('POST /api/orders creates an order that GET lists', async () => {
  const res = await post({ productName: 'Cloud Hoodie', quantity: 3 });
  assert.strictEqual(res.status, 201);
  const created = await res.json();
  assert.strictEqual(created.quantity, 3);
  const list = await (await fetch(`${base}/api/orders`)).json();
  assert.ok(list.some((o) => o.id === created.id));
});

test('POST /api/orders validates input', async () => {
  assert.strictEqual((await post({})).status, 400);
  assert.strictEqual((await post({ productName: 'x', quantity: 0 })).status, 400);
  assert.strictEqual((await post({ productName: 'x', quantity: 1.5 })).status, 400);
});
