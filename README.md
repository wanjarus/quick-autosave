# AUTOSAVE.JS
Autosave forms when they change.

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
There is two way to create a DOM element that can be use by autosave. Autosave will use by the default the `action` or the `data-action` of your DOM selector for your ajax call. But you can overwrite your action's selector by using data-action on your form element.

```html
<input type="text" name="xs_username" class="exemple" data-action="action/ajax-01.html.php" >

<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
</form>

<!-- Overwirite action form xs_phone -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <!-- action/ajax-01.html.php -->
  <input type="text" name="xs_username" value="">

  <!-- action/ajax-02.html.php -->
  <input type="text" name="xs_phone" value="" data-action="action/ajax-02.html.php">
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

## Options

```js
var func = {
  before : function (parameter) {},
  success : function (data, parameter) {},
  fail : function (parameter) {}
};

$(".exemple").autosave(func);
```

### before
Function execute before to send ajax request. This function can be use as validation.

### success
Function execute after ajax call. You can treat your data return and forward to your fail function if update MySQL request didn't working.

### fail
Function execute if ajax call fail or forward by success function.

## Author
Marc-Antoine Loignon - <https://www.lognoz.com>
