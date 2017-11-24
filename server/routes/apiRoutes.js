var express = require('express');
var http = require('http');
var router = express.Router();
var Color = require('../app/models/color');
const config = require('../config');

// test endpoint (/api)
router.get('/', (req, res) => {
    res.json({ message: 'Konichiwa!' });
});


router.route('/colors')
    .get((req, res) => {
        // get all colors
        Color.find((err, colors) => {
            if (err) res.send(err);
            res.json(colors);
        });
    })
    .post((req, res) => {
        const name = req.body.name;

        // create new color
        Color.findOne({ name: name }, (err, color) => {
            if (err) res.send(err);

            if (color) {
                res.json({
                    success: false,
                    message: `Color ${name} already exists`
                });
            } else {
                let color = new Color();

                color.name = name;
                color.value = req.body.value;

                color.save(err => {
                    if (err) res.send(err);
                    res.json({
                        success: true,
                        message: 'Color created!',
                        color: color
                    });
                });
            }
        });
    });

router.route('/colors/active')
    .get((req, res) => {
        res.send('todo');
    })
    .put((req, res) => {
        const isSpecial = req.body.isSpecial;

        if (isSpecial) {
            const type = req.body.type;

            sendCommand(`/arduino/special/${type}`);

            res.json({
                success: true,
                type: type,
                message: ''
            });
        } else {
            const hex = req.body.hex.replace('#', '');

            sendCommand(`/arduino/hex/${hex}`);

            res.json({
                success: true,
                hex,
                message: ''
            });

            // Color.findById(id, (err, color) => {
            //     if (err) res.send(err);

            //     if (color) {

            //         // update color on arduino
            //         sendCommand(`/arduino/hex/${color.value}`);

            //         res.json({
            //             success: true,
            //             color: color,
            //             message: ''
            //         });
            //     } else {
            //         res.json({
            //             success: false,
            //             message: 'Color not found'
            //         });
            //     }
            // });
        }
    });

router.route('/colors/:color_id')
    .get((req, res) => {
        Color.findById(req.params.color_id, (err, color) => {
            if (err) res.send(err);
            res.json(color);
        });
    })
    .put((req, res) => {
        Color.findById(req.params.color_id, (err, color) => {
            if (err) res.send(err);

            // update value
            color.value = req.body.value;

            color.save(err => {
                if (err) res.send(err);
                res.json({ message: 'Color updated!' });
            })
        });
    })
    .delete((req, res) => {
        Color.remove({
            _id: req.params.color_id
        }, (err, color) => {
            if (err) {
                res.json({
                    success: false,
                    error: err
                });
            }

            res.json({
                success: true,
                message: 'Color deleted',
                color: color
            });
        })
    });



const sendCommand = (uri) => {
    const { address, username, password } = config.arduino;

    console.log(`Command sent: ${uri}`);

    var req = http.get(`http://${username}:${password}@${address}${uri}`);

    req.on('error', err => {
        console.error(err);
        req.end();
        return;
    });

    req.end();
}

module.exports = router;