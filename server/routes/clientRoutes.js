var express = require('express');
var router = express.Router();
var path = require('path');

// static files
// router.use(express.static(path.resolve(__dirname, '../../client', 'build')));
router.use(express.static(path.resolve(__dirname, '../../client', 'public')));

// home page
router.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
    res.sendFile(path.resolve(__dirname, '../../client', 'public', 'index.html'));
});

module.exports = router;