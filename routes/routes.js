module.exports = routes;
var path = require('path');

function routes(app) {
  app.all('/', function(req, res) {
    logger.info('Home page');
    res.sendFile(path.resolve('public/views/home.html'));
  });

  app.get('/images', require('./images.js'));

  app.get('/upload', function(req, res, next) {
    logger.info('GET Upload');
    res.sendFile(path.resolve('public/views/upload.html'));
  });

  app.post('/upload', require('./upload.js'));

  app.post('/print', require('./print.js'));

  app.use(function(req, res, next) {
    res.status(404);
    logger.error('Page not found');
    res.send('Page does not exist');
  });
}
