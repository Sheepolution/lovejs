lovescript
=============

A copy of the LÖVE API into javascript.


Installation
-----------

    <script type="text/javascript" src="love.js"></script>


Usage
-----

	love.update = function (dt) {

	}

	love.draw = function () {
		
	}

	love.config = function (t) {
		t.width = 800;
		t.height = 600;
	}

	//Initialize love
	love.run();


Modules
-----------------
All the modules and their functions that are currently implemented. If a module/function is not here, it's not available (yet).



## Graphics

###arc( mode, x, y, radius, angle1, angle2 )
*Note: Missing segments*

###circle( mode, x, y, radius )
*Note: Missing segments*

###draw( drawable [, quad ], x, y, r, sx, sy, ox, oy )

###line( x1, y1, x2, y2, ... ) or line( [x,y,x,y,x,y...] )

###point( x, y )

###polygon( mode, [x,y,x,y,x,y...] )
###print( text, x, y, r, sx, sy, ox, oy )
###rectangle( mode, x, y, w, h )
###newFont( font, size )
*Note: Font needs to be loaded in html, you only give the name here.*
###newImage( filename )
*Note: There is no imageData*
###newQuad( x, y, width, height )
*Note: Missing reference width/height*

###getBlendMode( )
###getColor( )
###getDefaultFilter( )
*Note: See setDefaultFilter()*
###getFont( )
###getPointSize( )
###setBackgroundColor( r, g, b )
###setBlendMode( mode )
*Note: Works only with html5 canvas blend modes*
###setColor( r, g, b, a )
*Note: Doesn't work with images*
###setDefaultFilter( filter )
*Note: Cannot filter scaling up and down separately, missing anisotropy
###setFont( font )
###setLineWidth( width )
###setPointSize( size )
###pop( )
###push( )
###rotate( )
###scale( )
###shear( )
###translate( )

## Audio
*Note: Everything in seconds unit*
###newSource( file )
*Note: Missing static*
####Source.getPitch( )
####Source.getVolume( )
####Source.isLooping( )
####Source.isPaused( )
####Source.isPlaying( )
####Source.isStopped( )
####Source.pause( )
####Source.play( )
####Source.resume( )
####Source.rewind( )
####Source.seek( offset )
####Source.setLooping( loop )
####Source.setPitch( pitch )
####Source.setVolume( volume )
####Source.stop( )
####Source.tell( )

###pause( source )
*Note: No arguments does not make all audio pause, stop, rewind or resume.
###play( source )
###resume( source )
###rewind( source )
###stop( source )

##Keyboard
###isDown( key, ... )
###keypressed( key )
*Note: Missing isrepeat*
###keyreleased( key )

##Mouse
###getX( )
###getY( )
###isDown( button, ... )
###mousepressed( x, y, button )
###mousereleased( x, y, button )

License
-----
lovescript is released under the [MIT License](http://opensource.org/licenses/MIT)