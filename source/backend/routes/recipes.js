const express = require('express');

const router = express.Router();

/* GET /recipes */
router.get('/', (req, res) => {
  res.send('recipes');
});

module.exports = router;
