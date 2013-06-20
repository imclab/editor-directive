#!/usr/bin/env node

/**
 * Module dependencies.
 */

var request = require('superagent');
var fs = require('fs');

/**
 * Repo.
 */

var pkg = 'ajaxorg/ace-builds';

/**
 * Default component.json
 */

var componentJSON = {
  version: '0.0.1'
};

function install(done) {
  mkdir('components');

  file(pkg, 'src-noconflict', function(err, directoryData){
    if (err) return done(err);

    var i = 0;

    function next() {
      var item = directoryData[i++];
      if (!item) return done();
      if ('file' !== item.type) return next();
      if ('.js' !== item.name.substr(-3)) return next();
      
      var name = item.name.substr(0, item.name.lastIndexOf('.js'));
      var dir = 'ace-' + name;
      componentJSON.name = dir;
      componentJSON.repo = 'ace/' + name;

      file(pkg, item.path, function(err, fileData){
        console.log(err);
        if (!fileData) console.log(item)
        mkdir('components/' + dir);
        var content = 'module.exports = ' + fileData.content;
        fs.writeFileSync('components/' + dir + '/index.js', content);
        fs.writeFileSync('components/' + dir + '/component.json', JSON.stringify(componentJSON));
        next();
      });
    }

    next();
  });
}

/**
 * Fetch ace-builds repo and put into ./build directory.
 * 
 * XXX: Maybe later just create a local component for each out of it.
 */

function file(pkg, name, fn) {
  var url = 'https://api.github.com/repos/' + pkg + '/contents/' + name;
  console.log(url);
  request
    .get(url)
    // http://stackoverflow.com/questions/16575013/superagent-call-to-issue-github-oath-token-fails-in-node-js-app
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1542.0 Safari/537.36')
    .end(function(err, res){
      console.log(err, res)
      if (err) return fn(err);
      if (!res.ok) return fn(res.status);
      fn(null, res.body);
    });
};

function mkdir(name) {
  if (!fs.existsSync('components')) fs.mkdirSync('components');
}

install(function(err){
  console.log(err);
});