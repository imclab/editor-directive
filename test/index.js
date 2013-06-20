
var editor = require('tower-editor-directive');
var assert = require('timoxley-assert');
require('ace');
require('ace-mode-javascript');
require('ace-worker-javascript');

describe('towerEditorDirective', function(){
  it('should test', function(){
    var el = document.querySelector('#editor');
    editor.exec(el);
  });
});