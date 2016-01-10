module.exports = routes;
var path = require('path');

function routes(app) {
  app.all('/', function(req, res, next) {
    logger.info('Home page');
    res.sendFile(path.resolve('public/views/home.html'));
  });

  app.get('/upload', function(req, res, next) {
    logger.info('Upload page');
    res.sendFile(path.resolve('public/views/upload.html'));
  });

  app.post('/upload', require('./upload.js'));

  app.use(function(req, res, next) {
    res.status(404);
    logger.error('Page not found');
    res.send('Page does not exist');
  });
}
