# AUTOSAVE
Making good form that improves user experience is not supposed to be hard to do. Many web developers prefer to prioritize time production over quality. But with autosave, it's possible to create dynamic forms quickly and easy to use.

## Install
Just [download a ZIP](https://github.com/lognoz/autosave/archive/master.zip) file.

## Setup
First, include the script located on the `dist` folder and jQuery.
```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="dist/latest/autosave.min.js"></script>
```

Now, you can configure your autosave with jQuery selector. 
```js
$(".exemple").autosave();
```
There is two way to create a DOM element that can be use by autosave. Autosave will use by the default the `action` or the `data-action` of your DOM selector for your ajax call. But you can overwrite it by using `data-action` on your form element.

```html
<input type="text" name="xs_username" class="exemple" data-action="action/ajax-01.html.php" >

<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
</form>

<!-- Overwirite action form xs_phone -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username">
  <input type="text" name="xs_phone" data-action="action/ajax-02.html.php">
</form>
```

To create a group, you can use `data-group` attribute.
```html
<input type="text" name="xs_username" id="xs_username" value=""
       placeholder="Username" data-group="xs_username,xs_token">
         
<input type="hidden" name="xs_token" id="xs_token"
       value="a(XZ=96dC8DXtEe\*YH\r6LSCzE]X$"
       data-group="xs_username,xs_token">
```

```js
{
  "xs_username": "a",
  "xs_token": "a(XZ=96dC8DXtEe\\*YH\\r6LSCzE]X$"
}
```

If you want to use contenteditable as form element, you can use `data-name` attribute. 
```html
<div contenteditable="true" class="textarea" data-name="xs_content"></div>
```

## Advanced Options

```js
var func = {};
```

Function execute before to send ajax request. This function can be use as validation.
```js
func.before = function (parameter) {

};
```

Function execute after ajax call. You can treat your data return and forward to your fail function if update MySQL request didn't working.
```js
func.success = function (data, parameter) {

};
```

Function execute if ajax call fail or forward by success function.
```js
func.fail = function (parameter) {

};
```

```js
$(".exemple").autosave(func);
```

## Author
Marc-Antoine Loignon - <https://www.lognoz.com>
