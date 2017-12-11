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
<!-- With data-action -->
<input type="text" name="xs_username" class="exemple" data-action="action/ajax-01.html.php" >

<!-- With action -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
</form>

<!-- Overwrite action -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username">
  <input type="text" name="xs_phone" data-action="action/ajax-02.html.php">
</form>
```

To create a group, you can use `data-group` attribute.
```html
<input type="text" name="xs_username" data-group="xs_username,xs_token">
<input type="hidden" name="xs_token" value="D3YrsxHKPM" data-group="xs_username,xs_token">
```

```js
{
  "xs_username": "a",
  "xs_token": "D3YrsxHKPM"
}
```

If you want to use `contenteditable` as form element, you can use `data-name` attribute. 
```html
<div contenteditable="true" class="textarea" data-name="xs_content"></div>
```

## Advanced Options

If you want to catch data return by autosave before send ajax request, you can set `before` function. It can be usefull for validating your field. You'll need to return `true` if you want to procceed the ajax call.
```js
$(".exemple").autosave({
  before : function (parameter) {
    return true;
  }
});
```

You can treat your ajax data return and forward to your fail function if update MySQL request didn't succeed. 

For use `fail` function you need to set a function as this options. Autosave will call it if ajax request not working or if you forward your success function to this one. 
```js
var func = {
  success : function (data, parameter) {
    if (!data)
      func.fail(parameter);
  },
  fail : function (parameter) {
    var element = $(".retry");
    parameter.retry(element);
  }
};

$(".exemple").autosave(func);
```

## Author
Marc-Antoine Loignon - <https://www.lognoz.com>
