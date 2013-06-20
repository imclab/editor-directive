
var editor = require('tower-editor-directive');
var assert = require('timoxley-assert');

describe('towerEditorDirective', function(){
  it('should test', function(){
    var el = document.querySelector('#editor');
    editor.exec(el);
  });
});
