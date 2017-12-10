var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ngrok = require('ngrok');

var config = require('./config');

var mongoose = require('mongoose');
var dbUri = config.mongo.dbUri;
var dbOptions = {
   useMongoClient: true,
   user: config.mongo.user,
   pass: config.mongo.pass
};

var port = process.env.PORT || 8080;

var clientRouter = require('./routes/clientRoutes');
var apiRouter = require('./routes/apiRoutes');
var lightsRouter = require('./routes/lightsRoutes');

// setup mongoose connection
mongoose.connect(dbUri, dbOptions).then(
   () => { },
   err => console.error(err)
);

// setup ngrok connection
ngrok.connect({
   proto: config.ngrok.proto,
   addr: config.ngrok.addr,
   subdomain: config.ngrok.subdomain,
   authtoken: config.ngrok.authtoken,
   host_header: config.ngrok.host_header
}, (err, url) => {
   if (err) console.error(err);
});

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