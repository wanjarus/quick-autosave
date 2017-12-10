# AUTOSAVE.JS
Autosave forms when they change.

## Options
<dl>
  <dt>before : function (parameter)</dt>
  <dd>Function execute before to send ajax request. This function can be use as validation.</dd>
</dl>
<dl>
  <dt>success : function (data, parameter)</dt>
  <dd>Function execute after ajax call. You can treat your data return and forward to your fail function if update MySQL request didn't working.</dd>
</dl>
<dl>
  <dt>fail : function (parameter)</dt>
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
