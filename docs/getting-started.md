
@situs-include(./layouts/page-header.html)
@situs-data({
    "title": "Getting Started - Marka"
})

Getting Started
===============

Marka is designed to be easy to use and integrated with
your website. Download the <a href="https://github.com/fians/marka/releases" target="_blank">latest version of Marka</a> 
or you can install it via Bower with `bower install marka`, 
put the files on your html file, and it's
ready to use.

~~~markup
<!DOCTYPE html>
<html>
    <head>
        <title>My Website</title>
        <link rel="stylesheet" href="/path/to/marka.min.css">
        <script src="/path/to/marka.min.js"></script>
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

Marka currently have [36 icons](./icons.html) ready to use, 
and you can see all those icons here. If you feel you didn't
need all Marka icons, you can [customize marka.css](./customize.html) to pick 
icons based on your needs. To set icon 
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
of any icon. You can overide the default color
of your icon, using `color()`.

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
is scalable. You can change to every size you want 
using `size()` function.

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

@situs-include(./layouts/page-footer.html)