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
$(".exemple").autosave();
```
Here somes basics exemples:
```html
<input type="text" name="xs_username" placeholder="Username" class="exemple"
       data-action="action/ajax-01.html.php" >
```

```html
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
  <input type="text" name="xs_name" value="" placeholder="Name">
  <input type="text" name="xs_phone" value="" placeholder="Phone">
</form>
```

```html
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" value="" placeholder="Username">
  <input type="text" name="xs_name" value="" placeholder="Name">
  <input type="text" name="xs_phone" value="" placeholder="Phone" 
         data-action="action/ajax-02.html.php">
</form>
```

```html
<form action="action/ajax-01.html.php" method="post" class="exemple">
  <input type="text" name="xs_username" id="xs_username" value=""
         placeholder="Username" data-group="xs_username,xs_token,xs_page">
         
  <input type="hidden" name="xs_token" id="xs_token"
         value="a(XZ=96dC8DXtEe\*YH\r6LSCzE]X$"
         data-group="xs_username,xs_token,xs_page">
         
  <input type="hidden" name="xs_page" id="xs_page" value="index.html"
         data-group="xs_username,xs_token,xs_page">
</form>
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
