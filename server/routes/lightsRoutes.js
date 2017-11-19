var express = require('express');
var http = require('http');
var router = express.Router();
var Color = require('../app/models/color');

var { arduinoBase } = require('../config');

// const arduinoBase = 'http://192.168.168.103';

router.route('/set')
    .get((req, res) => {
        const name = req.query.name;

        Color.findOne({ name: name }, (err, color) => {
            if (err) res.send(err);

            if (color) {
                sendCommand(`/arduino/hex/${color.value}`);
                res.json(color);
            } else {
                res.json({
                    message: 'Color not found'
                });
            }
        });
    });

const sendCommand = (uri) => {
    console.log(`Command sent: ${arduinoBase}${uri}`);

    var req = http.get('http://root:arduino@192.168.168.103' + uri);

    req.on('error', err => {
        console.error(err);
        req.end();
        return;
    });

    req.end();
}

module.exports = router;