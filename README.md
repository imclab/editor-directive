# Ace Editor Directive

Question. How do you go about converting libraries like the ace editor (which has dozens of themes/extensions) to component?

## Installation

browser:

```bash
$ component install viatropos/editor-directive
$ git clone https://github.com/ajaxorg/ace-builds build/ace
```

Then put ace script tags into the DOM:

```html
<script src="./build/ace/ace.js"></script>
<script src="./build/ace/mode-javascript.js"></script>
```

## Example

```js
var editor = require('tower-editor-directive');

//editor.getSession().on('change', function(){
//  
//});
```

Use the directive like this:

```html
<pre id="editor" data-editor="javascript"></pre>
```

## Notes

- [Ace editor kitchen sink](http://ace.ajax.org/build/kitchen-sink.html)

## Licence

MIT