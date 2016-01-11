module.exports = images;
var fs = require('fs');
var path = require('path');

function images(req, res) {
  logger.info('GET images');
  var files = fs.readdirSync(path.resolve('public/uploads'));
  logger.info(files);
  res.status(200).send(files);
}
