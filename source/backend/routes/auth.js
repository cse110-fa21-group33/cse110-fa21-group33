const express = require('express');

const router = express.Router();

/* GET /auth */
router.get('/', (req, res) => {
  res.send('auth');
});

module.exports = router;
