# QUICK AUTOSAVE
Making good form that improves user experience is not supposed to be hard to do. Many web developers prefer to prioritize time production over quality. With Autosave, improved user experience will never be as easy and as quick.

<a href="https://www.lognoz.com/quick-autosave/">
  <img width="550" src="https://www.lognoz.com/quick-autosave/asset/img/presentation.png" alt="Demo">
</a>

## Install
You can get it on npm.
```
npm install quick-autosave
```
Or if you're not into package managment, just [download a ZIP](https://github.com/lognoz/autosave/archive/master.zip) file.

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
There are two ways to create a DOM element that can be used by Quick Autosave. The library uses the `action` by default or the `data-action` of your selector for your ajax call. You can also overwrite the ajax call by using `data-action` on your form element (`input`, `select`, `textarea`).

```html
<!-- With data-action -->
<input type="text" name="xs_username" class="exemple" data-action="action/ajax-01.html.php" >

<!-- With action -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
</form>

<!-- Overwrite action for xs_phone -->
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username">
  <input type="text" name="xs_phone" data-action="action/ajax-02.html.php">
</form>
```

To create a group, you can use the `data-group` attribute.
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

If you want to use `contenteditable` as form element, you can use the `data-name` attribute. 
```html
<div contenteditable="true" class="textarea" data-name="xs_content"></div>
```

## Advanced Options

If you want to catch data returned by Quick Autosave before sending ajax request, you can set `before` function. It can be useful to validate your form content. You will need to return `true` if you want to procceed the ajax call.
```js
$(".exemple").autosave({
  before : function (parameter) {
    return true;
  }
});
```

You can process your ajax data return. If MySQL update request is not successful, you can forward it to your fail function . 

To use `fail` function, you need to set a function as an option. Quick Autosave will call it if ajax request is not working or if you forward your success function to this one. 

To improve user experience, you can use `parameter` send as arguments for output retry message and a link that will resend the ajax request. For instance, if you want to use it, you will simply need `parameter.retry` function and send a jQuery selector.

```js
var func = {
  success : function (data, parameter) {
    if (!data)
      func.fail(parameter);
  },
  fail : function (parameter) {
    parameter.retry($(".retry"));
  }
};

$(".exemple").autosave(func);
```

Autosave will send an object to your custom function `before`, `success` and `fail`.

***parameter.action***<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ajax page called define with your action attribute.

***parameter.before***<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Element value before the update.

***parameter.data***<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Value list of element updated.

***parameter.retry***<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function that can be use to output a "try again" message.

***parameter.target***<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jQuery selector updated.

## Author
Marc-Antoine Loignon - <https://www.lognoz.com>
