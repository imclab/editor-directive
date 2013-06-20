
/**
 * Module dependencies.
 */

var request = require('superagent');

/**
 * Fetch ace-builds repo and put into ./build directory.
 * 
 * XXX: Maybe later just create a local component for each out of it.
 */

exports.file = function(pkg, file, fn){
  var url = 'https://api.github.com/repos/' + pkg + '/contents/' + file;
  request
  .get(url)
  .end(function(err, res){
    if (err) return fn(err);
    if (!res.ok) return fn();
    fn(null, res.body);
  });
};