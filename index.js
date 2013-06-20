
/**
 * Module dependencies.
 */

var directive = require('tower-directive');

/**
 * Expose `towerEditorDirective`.
 */

module.exports = directive('data-editor', editorDirective);

/**
 * Instantiate a new Ace editor.
 */

function editorDirective(scope, el, attr) {
  var lang = attr.value;
  var editor = ace.edit(el);
  // editor.setTheme('ace/theme/twilight');
  editor.getSession().setMode('ace/mode/' + lang);
}