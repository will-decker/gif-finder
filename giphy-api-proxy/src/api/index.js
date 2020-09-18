const express = require('express');

const giphy = require('./giphy-search');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Giphy API proxy',
  });
});

router.use('/giphy-search', giphy);

module.exports = router;
