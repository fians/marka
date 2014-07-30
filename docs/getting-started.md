---
layout: page
title: Getting Started - Marka
---

Getting Started
===============

Marka is designed to be easy to use and integrated with
your website. Download the <a href="https://github.com/fians/marka" target="_blank">latest version of Marka</a>, 
put the files on your html file, and it's
ready to use.

~~~markup
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
        <link rel="stylesheet" href="/path/to/marka.min.js">
        <script src="/path/to/marka.min.css"></script>
    </head>
    <body>
    </body>
</html>
~~~

Initialize Marka
----------------

Before set the icon you wan to use, you need initialize
Marka instance on the icon element you want to set up.

~~~markup
<i id="icon"></i>

<script>
    var m = new Marka('#icon');
</script>
~~~

You can also pass jQuery element on Marka parameter,
like this,

~~~markup
<i id="icon"></i>

<script>
    var m = new Marka($('#icon'));
</script>
~~~

Or if you want to set multiple icon,

~~~markup
<i class="icon"></i>
<i class="icon"></i>
<i class="icon"></i>

<script>
    var m = new Marka('.icon');
</script>
~~~

But, remember. When you initialize multiple 
element in one Marka instance, all those element
will be at same Marka instance, which means
when you set icon, color, size, or rotation 
with that instance, they (elements) will 
transform to same state simultaneously. So, it's
better to create Marka instance for each element.

Example:

~~~markup
<i id="toggleAccordion"></i>
<i id="toggleModal"></i>

<script>
    var accordionIcon = new Marka('#toggleAccordion');
    var modalIcon = new Marka('#toggleModal');
</script>
~~~

Set Icon
--------

Marka currently have [11 icons](/icons.html) ready to use, 
and you can see all those icons here. To set icon 
you can use `set()` on Marka instance.

~~~javascript
var m = new Marka('#icon');
m.set('circle');
~~~

When you need to transform to another icon, just
apply `set()` to that instance again.

~~~javascript
var m = new Marka('#icon');
m.set('circle');

// Change after 3 second
setTimeout(function() {
    m.set('square');
}, 3000);
~~~

Color it
---------

By default, Marka set black `#000000` as default color
of any icon. There is two ways to overide the default color
of your icon, using CSS directly or Marka API, `color()`.

When you set icon on Marka instance, Marka will append 
some `<i>` inside your icon. So if you want to color 
your icon directly with CSS, you need to set `background-color`
or `background` of `<i>` element inside your icon.

Example:

~~~css
#icon i {
    background: #ffffff;
}

/* Or */
#icon i {
    background-color: #ffffff;
}
~~~

If you dont want to get your hand dirty to write some 
CSS for each icon. Marka provides you simple `color()`
function which can be chained alongside other function on 
Marka instance.

Example:

~~~javascript
var m = new Marka('#icon');
m.set('times').color('#ffffff');

// Transform color after 3 second
setTimeout(function() {
    m.color('#ff00000');
}, 3000);
~~~

Change size
-----------

Because created with HTML element, every Marka icon
is scalable, so you can change to every size you want.
Just like when you want to change the color, you 
can change icon size directly with CSS or using `size()`
function.

You have to make sure `width` and `height` at
same value when you want to change size the icon with 
CSS. Because when `width` and `height` value is not same,
your icon probably will be broken.

Example:

~~~css
/* Wrong! */
#icon {
    width:20px;
    height:25px;
}

/* Correct! */
#icon {
    width: 20px;
    height: 20px;
}
~~~

With `size()`, you can change size of your icon without
talk directly with CSS.

~~~javascript
var m = new Marka('#icon');
m.set('circle').size(20); // Set icon size to 20px;

// Transform to larger icon after 3 second
setTimeout(function() {
    m.size(30);
}, 3000);
~~~

Rotate it
---------

Marka allows you to change direction of your icon
with `rotate()` function. The direction can be 'up',
'down', 'left', or 'right' and very useful if you
combine it with arrow icon.

Example:

~~~javascript
var m = new Marka('#icon');
m.set('arrow').rotate('left');

// or down
m.rotate('down');

// or right
m.rotate('right');

// or up again
m.rotate('up');
~~~