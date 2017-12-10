# AUTOSAVE.JS
Autosave forms when they change.

## Setup
First, include the script located on the dist folder and jQuery.
```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="dist/latest/autosave.min.js"></script>
```

Now, you can configure your autosave with jQuery selector. 
```js
$("form").autosave();
```

## Options
<dl>
  <dt>before :</dt>
  <dd>Function execute before to send ajax request. This function can be use as validation.</dd>
</dl>
<dl>
  <dt>success :</dt>
  <dd>Function execute after ajax call. You can treat your data return and forward to your fail function if update MySQL request didn't working.</dd>
</dl>
<dl>
  <dt>fail :</dt>
  <dd>Function execute if ajax call fail or forward by success function.</dd>
</dl>

## Usage exemple

```js
var func = {
  before : function (parameter) {
  
  },
  success : function (data, parameter) {
  
  },
  fail : function (parameter) {
  
  }
};

$("form").autosave(func);
```

## Author
Marc-Antoine Loignon - <https://www.lognoz.com>
