const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/server');

test('Phase 1 Verification: GET /health returns 200 and valid JSON', async (t) => {
  const server = app.listen(0); // Listen on random available port
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/health`);
    assert.equal(res.status, 200, 'Health endpoint should return HTTP 200');

    const data = await res.json();
    assert.equal(data.status, 'ok', 'Status should be ok');
    assert.equal(data.service, 'GigWealth-Lite API', 'Service name should match');
    assert.ok(data.timestamp, 'Timestamp should be present');
    assert.ok(data.supabase, 'Supabase status block should be present');
  } finally {
    server.close();
  }
});
