const express = require('express');
const { checkSupabaseConnection, isConfigured } = require('../config/supabase');

const router = express.Router();

/**
 * GET /health
 * Returns service health status, server uptime, and Supabase connection state
 */
router.get('/', async (req, res) => {
  const supabaseHealth = await checkSupabaseConnection();

  return res.status(200).json({
    status: 'ok',
    service: 'GigWealth-Lite API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    supabase: {
      configured: isConfigured,
      ...supabaseHealth,
    },
    message: 'Backend service is healthy and operational',
  });
});

module.exports = router;
