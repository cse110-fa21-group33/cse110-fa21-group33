const express = require('express');

const router = express.Router();

/* GET /users */
router.get('/', (req, res) => {
  res.send('users');
});

module.exports = router;
