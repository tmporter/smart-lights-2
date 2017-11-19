var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var dbUri = 'mongodb://colors_user:colors_user@104.131.46.15:27017/colors?authSource=admin';
var dbOptions = {
    useMongoClient: true,
    user: 'colors_user',
    pass: 'colors_user'
};

var port = process.env.PORT || 8080;

var clientRouter = require('./routes/clientRoutes');
var apiRouter = require('./routes/apiRoutes');
var lightsRouter = require('./routes/lightsRoutes');

// setup mongoose connection
mongoose.connect(dbUri, dbOptions).then(
    () => { },
    err => {
        console.error(err);
    }
);

// setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// regiser routes
app.use('/', clientRouter);
app.use('/api', apiRouter);
app.use('/lights', lightsRouter);

// listen
app.listen(port);
console.log(`Magic happens on port ${port}`);