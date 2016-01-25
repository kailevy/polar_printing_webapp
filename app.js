// npm modules
var express = require('express');
var path = require('path');
var winston = require('winston');
var bodyParser = require('body-parser');
// routes
var routes = require('./routes/routes.js');
// app init
var app = express();

// port set up
var PORT = process.env.PORT || 8080;

// middleware?
global.logger = winston;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(PORT);
logger.info('Listening on Port', PORT);
