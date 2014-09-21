loveJS
=============

A copy of the LÖVE API into javascript.


Installation
---

Download the ```love.js``` in the ```build``` folder.

	<script type="text/javascript" src="love.js"></script>

If you're a beginner with javascript, here's what your ```index.html``` should look like:

```html
<head>
    <meta charset='utf-8'>
    <title>Game</title>
    <!-- The order in which files are loaded is important! love.js first! -->
    <script type="text/javascript" src="love.js"></script>
    <!-- main.js is the file where you put in love.update and love.draw (see usage) -->
    <script type="text/javascript" src="main.js"></script>
</head>
<body>
    <canvas style="border:1px solid #000000;" id="canvas" width="1024" height="768"></canvas>
</body>
</html>
```

love.js and main.js should be in the same folder as index.html


Usage
---

Put this in your main.js

```javascript
//Preload images here
love.graphics.preload();

//Preload audio here
love.audio.preload();

//Called when preloading is done
love.load = function () {
    
}

//The main updater
love.update = function (dt) {

}

//The draw loop
love.draw = function () {
	
}

//Configure canvas width and height
love.config = function (t) {
	t.width = 800;
	t.height = 600;
}

//Initialize love
love.run();
```

Look in the example folder for a better explanation.


Modules
---
All the modules and their functions that are currently implemented. If a module/function is not here, it's not available (yet).


## Graphics

**preload( url )**

*Note: Custom function, use it to preload images*

**arc( mode, x, y, radius, angle1, angle2 )**

*Note: Missing segments*

**circle( mode, x, y, radius )**

*Note: Missing segments*

**clear( )**

**draw( drawable [, quad ], x, y, r, sx, sy, ox, oy, kx, ky )**

**line( x1, y1, x2, y2, ... )** or **line( [x,y,x,y,x,y...] )**

**point( x, y )**

**polygon( mode, [x,y,x,y,x,y...] )**

**print( text, x, y, r, sx, sy, ox, oy, kx, ky )**

**printf( text, x, y, limit, align, r, sx, sy, ox, oy, kx, ky )**

**rectangle( mode, x, y, width, height )**

**newImage( file )**

*Note: There is no imageData*

**image.type( )**

**image.typeOf( )**

**image.getFilter( )**

*Note: See [setDefaultFilter()](https://github.com/DaanHaaz/lovescript#setdefaultfilter-filter-)*
**image.getWrap( )**

**image.getDimensions( )**

**image.getWidth( )**

**image.getHeight( )**

**image.setFilter( )**

*Note: See [setDefaultFilter()](https://github.com/DaanHaaz/lovescript#setdefaultfilter-filter-)*
**image.setWrap( wrap )**

**newQuad( x, y, width, height )**

*Note: Missing reference width/height*

**quad.type( )**

**quad.typeOf( )**

**quad.getViewport( )**

**quad.setViewport( x, y, width, height )**

**newFont( font, size )**

*Note: Font needs to be loaded in html, you only give the name here.*

**font.type( )**

**font.typeOf( type )**

**font.getFilter( )**

*Note: See [setDefaultFilter()](https://github.com/DaanHaaz/lovescript#setdefaultfilter-filter-)*

**font.setFilter( filter )**

*Note: See [setDefaultFilter()](https://github.com/DaanHaaz/lovescript#setdefaultfilter-filter-)*

**newCanvas( width, height )**

**canvas:type( )**

**canvas:typeOf( type )**

**canvas:getWidth( )**

**canvas:getHeight( )**

**canvas:getFilter( )**

**canvas:setFilter( )**

**getColor( )**

**getBackgroundColor( )**

**getBlendMode( )**

**getFont( )**

**getPointSize( )**

**getLineWidth( )**

**getScissor( )**

**getCanvas( )**

**getDefaultFilter( )**

*Note: See [setDefaultFilter()](https://github.com/DaanHaaz/lovescript#setdefaultfilter-filter-)*

**setBackgroundColor( r, g, b )**

**setBlendMode( mode )**

*Note: Works only with html5 canvas blend modes*

**setColor( r, g, b, a )**

*Note: Doesn't work with images*

**setDefaultFilter( filter )**

*Note: Cannot filter scaling up and down separately, missing anisotropy*

**setFont( font )**

**setLineWidth( width )**

**setPointSize( size )**

**setScissor( x, y, width, height )**

**setCanvas( canvas )**

**pop( )**

**push( )**

**rotate( )**

**scale( )**

**shear( )**

**translate( )**

**getWidth( )**

**getHeight( )**

**getDimensions( )**

## Audio

*Note: Everything is in the seconds unit*

**newSource( file )**

*Note: Missing static*

**source.type( )**

**source.typeOf( )**

**source.getPitch( )**

**source.getVolume( )**

**source.isLooping( )**

**source.isPaused( )**

**source.isPlaying( )**

**source.isStopped( )**

**source.pause( )**

**source.play( )**

**source.resume( )**

**source.rewind( )**

**source.seek( offset )**

**source.setLooping( loop )**

**source.setPitch( pitch )**

**source.setVolume( volume )**

**source.stop( )**

**source.tell( )**

**pause( source )**

*Note: Giving no arguments does not make all audio pause, stop, rewind or resume.*

**play( source )**

**resume( source )**

**rewind( source )**

**stop( source )**

##Keyboard

**isDown( key, ... )**

**keypressed( key )**

*Note: Missing isrepeat*

**keyreleased( key )**

##Mouse

**getX( )**

**getY( )**

**isDown( button, ... )**

**mousepressed( x, y, button )**

**mousereleased( x, y, button )**

##Filesystem

**read( name )**

**write( name, data )**

**exists( name )**

**remove( name )**

**setIdentity( name )**

License
-----
loveJS is released under the [MIT License](http://opensource.org/licenses/MIT)