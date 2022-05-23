const express = require('express');

const router = express.Router();

/* GET /auth */
router.get('/', (req, res) => {
  return res.status(200).json({msg: 'passed'});
});

module.exports = router;
