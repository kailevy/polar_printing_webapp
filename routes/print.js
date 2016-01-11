module.exports = print;
var path = require('path');
var fs = require('fs');

// adapted from http://stackoverflow.com/questions/20972788/how-to-invoke-external-scripts-programs-from-node-js
var uploadDir = 'public/uploads/';
function print(req, res) {
  logger.info('POST print');
  var file_path = path.resolve(uploadDir, req.body.impath);
  logger.info(file_path);
  if(file_path) {
    fs.access(file_path, fs.F_OK, function (err) {
      if (err) {
        return res.status(500).send('No such file at ' + file_path);
      }
      else {
        var python = require('child_process').spawn(
        'python',
        // second argument is array of parameters, e.g.:
        [path.resolve('../spiral.py'), file_path]
        );
        var output = '';
        python.stdout.on('data', function(data) {
          output += data;
        });
        python.on('close', function(code, signal) {
          if (code !== 0) {
            return res.status(500).send('Uncaught exception\n Output: ' + output);
          }
          return res.status(200).send('Success\n Output: ' + output);
        });
      }
    });
  }
  else {
    return res.status(500).send('No file found at ' + file_path);
  }
}
