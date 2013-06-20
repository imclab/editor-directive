#!/usr/bin/env node

/**
 * Module dependencies.
 */

var request = require('superagent');
var fs = require('fs');
var path = require('path');
var names = fs.readFileSync(path.join(__dirname, 'manifest'), 'utf-8').split('\n');

/**
 * Repo.
 */

var pkg = 'ajaxorg/ace-builds';

function install(done) {
  mkdir('components');

  var i = 0;

  function next() {
    var name = names[i];
    i++;
    if (!name) return done();

    var dir = 'ace' === name
      ? name
      : 'ace-' + name;

    log('install', dir + '@master');
    
    // dummy component.json
    var componentJSON = {
      version: '0.0.1',
      name: dir,
      repo: 'ace/' + name,
      description: 'Ace ' + name + ' repo.',
      scripts: [ 'index.js' ]
    };

    file(name, function(err, content){
      if (err) return done(err);
      mkdir('components/' + dir);
      next();
      //content = 'module.exports = ' + content;
      fs.writeFileSync('components/' + dir + '/index.js', content);
      fs.writeFileSync('components/' + dir + '/component.json', JSON.stringify(componentJSON, null, 2));
    });
  }

  next();
}

/**
 * Fetch ace-builds files.
 */

function file(name, fn) {
  var url = 'https://raw.github.com/ajaxorg/ace-builds/master/src-noconflict/' + name + '.js';
  request
    .get(url)
    // http://stackoverflow.com/questions/16575013/superagent-call-to-issue-github-oath-token-fails-in-node-js-app
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1542.0 Safari/537.36')
    .end(function(err, res){
      if (err) return fn(err);
      if (!res.ok) return fn(res.status);
      fn(null, res.text);
    });
};

function mkdir(name) {
  if (!fs.existsSync(name)) fs.mkdirSync(name);
}

install(function(err){
  console.log('');
});

function log(type, msg, color) {
  color = color || '36';
  var w = 10;
  var len = Math.max(0, w - type.length);
  var pad = Array(len + 1).join(' ');
  console.log('  \033[' + color + 'm%s\033[m : \033[90m%s\033[m', pad + type, msg);
};