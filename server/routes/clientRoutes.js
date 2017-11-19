var express = require('express');
var router = express.Router();
var path = require('path');

// static files
router.use(express.static(path.resolve(__dirname, '../../client', 'build')));

// home page
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
});

module.exports = router;