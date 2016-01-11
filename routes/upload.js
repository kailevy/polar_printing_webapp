module.exports = upload;
var path = require('path');
var fs = require('fs');
var multiparty = require('multiparty');

function upload(req, res) {
  // adapted from https://github.com/PhoenixRacing/WebApp20/blob/master/routes/routes.js
  logger.info('POST Upload');
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {

    var img = files.image[0];
    logger.info(img);
    var filename = img.originalFilename.split(".");
    var filetype = filename[filename.length-1].toLowerCase();

    // figure out if it's actually an image
    var allowedTypes = ["jpg","jpeg","png","gif"];
    if (allowedTypes.indexOf(filetype) == -1) {
      logger.error("ERROR. File must be an image.");

      // delete the temp file
      fs.unlink(img.path, null);
      res.redirect("/");
      return;
    }

    fs.readFile(img.path, function (err, data) {

      // delete the temp file
      fs.unlinkSync(img.path, null);

      if (err) {
        logger.error(err);
        return;
      }

      // rename the file to milliseconds
      var time = new Date().getTime();
      var newPath = path.join(__dirname, '../public/uploads', String(time) + "." + filetype);

      fs.writeFile(newPath, data, function (err) {
        if (err) {
          logger.error(err);
        }
        res.redirect("/");
      });
    });
  });
}
