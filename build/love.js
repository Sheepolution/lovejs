//loveJS
//A copy of the LÖVE API for Javascript

var init = function () {
	love.graphics.canvas=document.getElementById('canvas');
	love.graphics.defaultCanvas = love.graphics.canvas;
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);
	document.addEventListener("mousemove",mouseMove, false);
	document.addEventListener("mousedown",mouseDownHandler, false);
	document.addEventListener("mouseup",mouseUpHandler, false);
	love.graphics.ctx=love.graphics.canvas.getContext('2d');
	love.graphics.defaultCtx = love.graphics.ctx;
}

var love = { };

love.init = true;

love._assetsLoaded = 0;
love._assetsToBeLoaded = 0;

love.timestamp = function () {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

love.time = {now:0,dt:0,last:0};
love.time.last = love.timestamp();


//Graphics

love.graphics = {};

love.graphics.defaultCtx;

love.graphics.defaultCanvas;

love.graphics.cvs;

love.graphics.images = {};

love.graphics.color = {r:255,g:255,b:255,a:255};

love.graphics.backgroundColor = {r:0,g:0,b:0};

love.graphics.pointSize = 1;

love.graphics.fontSize = 10;

love.graphics.defaultFilter = "linear";

love.graphics.font = {};

love.graphics.preload = function (a) {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var img;
		img = new Image();
		img.src = name;
		img.onload = function(){
			love._assetsLoaded++;
		}
		this.images[name] = img;
		love._assetsToBeLoaded++;
		
	};
}


//Drawing functions

love.graphics.rectangle = function (mode,x,y,w,h) {
	this.ctx.fillRect(x,y,w,h);
	love.graphics.mode(mode);
}

love.graphics.circle = function (mode,x,y,r) {
	this.ctx.beginPath();
	this.ctx.arc(x,y,Math.abs(r),0,2*Math.PI);
	love.graphics.mode(mode)
}

love.graphics.arc = function (mode,x,y,r,a1,a2) {
	this.ctx.beginPath();
	this.ctx.lineTo(x,y);
	this.ctx.arc(x,y,Math.abs(r),a1,a2);
	this.ctx.lineTo(x,y);
	love.graphics.mode(mode);
}

love.graphics.clear = function () {
	this.ctx.fillStyle = this.rgb(this.backgroundColor.r,this.backgroundColor.b,this.backgroundColor.g);
	this.background();
	this.ctx.fillStyle = this.rgb(this.color.r,this.color.b,this.color.g);
}

love.graphics.line = function () {
	this.ctx.beginPath();
	if (typeof(arguments[0]) == "object") {
		this.ctx.moveTo(verts[0],verts[1]);
		for (var i = 0; i < verts.length-2; i+=2) {
			this.ctx.lineTo(verts[i+2],verts[i+3]);
			this.ctx.stroke();
		};
		
	}
	else {
		this.ctx.moveTo(arguments[0],arguments[1]);
		for (var i = 0; i < arguments.length-2; i+=2) {
			this.ctx.lineTo(arguments[i+2],arguments[i+3]);
			this.ctx.stroke();
		};
	}
	this.ctx.closePath();
}

love.graphics.point = function (x,y) {
	this.ctx.beginPath();
	this.ctx.arc(x,y,Math.abs(this.pointSize),0,2*Math.PI);
	love.graphics.mode("fill")
}

love.graphics.polygon = function (mode, verts) {
	this.ctx.beginPath();
	this.ctx.moveTo(verts[0],verts[1]);
	for (var i = 0; i < verts.length-2; i+=2) {
		this.ctx.lineTo(verts[i+2],verts[i+3]);
		this.ctx.stroke();
	};
	this.ctx.closePath();
	love.graphics.mode(mode);
}

love.graphics.print = function (t,x,y,r,sx,sy,ox,oy) {

	x = x || 0;
	y = y || 0;
	r = r || 0;
	sx = sx || 1;
	sy = sy || 1;
	ox = ox || 0;
	oy = oy || 0;
	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.scale(sx,sy);
	this.ctx.rotate(r);
	this.ctx.fillText(t, -ox, -oy);
	this.ctx.restore();
}

//Note: Doesn't work perfect yet with rotation.
love.graphics.printf = function (t,x,y,limit,align,r,sx,sy,ox,oy) {
	x = x || 0;
	y = y || 0;
	r = r || 0;
	sx = sx || 1;
	sy = sy || 1;
	ox = ox || 0;
	oy = oy || 0;
	this.ctx.textAlign=align;
	
	var words = t.split(' ');
    var line = '';
	
	for(var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > limit && i > 0) {
      	this.ctx.save();
		this.ctx.translate(x,y);
		this.ctx.scale(sx,sy);
		this.ctx.rotate(r);
      	this.ctx.fillText(line, -ox,-oy);
		this.ctx.restore();

        line = words[i] + ' ';
        y += this.fontSize+10*sy;
      }
      else {
        line = testLine;
      }
    }

 	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.scale(sx,sy);
	this.ctx.rotate(r);
  	this.ctx.fillText(line, -ox,-oy);
	this.ctx.restore();
	this.ctx.textAlign="left";
}

love.graphics._draw = function (img,x,y,r,sx,sy,ox,oy,kx,ky,quad) {
	if (x == null) {
		x = 0;
	}
	if (y == null) {
		y = 0;
	}
	if (r == null) {
		r = 0;
	}
	if (sx == null) {
		sx = 1;
	}
	if (sy == null) {
		sy = sx;
	}
	if (ox == null) {
		ox = 0;
	}
	if (oy == null) {
		oy = 0;
	}
	if (kx == null) {
		kx = 0;
	}
	if (ky == null) {
		ky = 0;
	}

	if (img.filter != "default") {
		this.ctx.imageSmoothingEnabled = img.filter == "linear";
	}
	else {
		this.ctx.imageSmoothingEnabled = this.defaultFilter;
	}
	this.ctx.save();
	this.ctx.transform(1,ky,kx,1,0,0);
	this.ctx.translate(x,y);
	this.ctx.scale(sx,sy);
	this.ctx.rotate(r);
	if (quad) {
		this.ctx.drawImage(img.drawable,quad.viewport.sx,quad.viewport.sy,quad.viewport.sw,quad.viewport.sh,-ox,-oy,quad.viewport.sw,quad.viewport.sh);
	}
	else{
		this.ctx.drawImage(img.drawable,-ox,-oy);
	}
	this.ctx.restore();
	this.ctx.imageSmoothingEnabled = this.defaultFilter == "linear";
}

love.graphics.draw = function (img,quad,x,y,r,sx,sy,ox,oy,kx,ky) {
	if (typeof(quad) != "object") {
		love.graphics._draw(img,quad,x,y,r,sx,sy,ox,oy,kx,ky);
	}
	else{
		love.graphics._draw(img,x,y,r,sx,sy,ox,oy,kx,ky,quad);
	}
}



//New functions
love.graphics.newImage = function (url) {
	var img;
	img = {};
	img.drawable = this.images[url].cloneNode(false);
	img.url = url;
	img.filter = "default";
	img.wrap = "clamp"

	img.typeOf = function (type) {
		return type == "Object" || type == "Drawable" || type == "Texture" || type == "Image";
	}

	img.type = function () {
		return "Image";
	}

	img.getFilter = function () {
		return (this.filter=="default") ? love.graphics.defaultFilter : this.filter;
	}
	
	img.getDimensions = function () {
		return [this.drawable.width,this.drawable.height];
	}

	img.getWidth = function () {
		return love.graphics.images[this.url].width;
	}

	img.getHeight = function () {
		return love.graphics.images[this.url].width;
	}

	img.getWrap = function () {
		return this.wrap;
	}

	img.getData = function () {

	}

	img.setFilter = function (filter) {
		switch (filter) {
			case "nearest":
			    this.filter = "nearest";
			    break;
			case "linear":
			    this.filter = "linear";
			    break;
			case null:
				this.filter = "default";
				break;
			default:
				throw("Invalid filter mode: " + filter)
				break;
		}
	}

	img.setWrap = function (wrap) {
		switch (wrap) {
			case "clamp":
			    this.wrap = "clamp";
			    break;
			case "repeat":
			    this.wrap = "repeat";
			    break;
			case null:
				this.wrap = "clamp";
				break;
			default:
				throw("Invalid filter mode: " + filter)
				break;
		}
	}

	return img;
}


love.graphics.newQuad = function (x,y,w,h,sw,sh,adw,adh) {
	var quad = {};
	quad.viewport = {sx:x,sy:y,sw:w,sh:h}

	quad.typeOf = function (type) {
		return type == "Object" || type == "Quad";
	}

	quad.type = function () {
		return "Quad";
	}

	quad.getViewport = function () {
		return [this.viewport.sx,this.viewport.sy,this.viewport.sw,this.viewport.sh];
	}

	quad.setViewport = function (x,y,w,h) {
		this.viewport = {sx:x,sy:y,sw:w,sh:h};
	}
	return quad;
}


love.graphics.newFont = function (fnt,size) {
	font = {};
	font.size = size;
	font.name = fnt;
	font.filter = "default";

	font.typeOf = function (type) {
		return type == "Object" || type == "Font";
	}

	font.type = function () {
		return "Font";
	}

	font.getFilter = function () {
		return (this.filter=="default") ? love.graphics.defaultFilter : this.filter;
	}

	font.setFilter = function (filter) {
		switch (filter) {
			case "nearest":
			    this.filter = "nearest";
			    break;
			case "linear":
			    this.filter = "linear";
			    break;
			case null:
				this.filter = "default";
				break;
			default:
				throw("Invalid filter mode: " + filter)
				break;
		}
	}

	return font;
}

love.graphics.newCanvas = function (w,h) {
	var canvas;
	canvas = {};
	canvas.drawable = document.createElement('canvas');
	canvas.context = canvas.drawable.getContext('2d');
	canvas.filter = "linear";
	canvas.drawable.width = w || this.drawable.width;
	canvas.drawable.height = h || this.drawable.height;

	canvas.type = function () {
		return "Canvas";
	}

	canvas.typeOf = function (type) {
		return type == "Object" || type == "Drawable" || type == "Texture" || type == "Canvas";
	}

	canvas.getWidth = function () {
		return this.drawable.width;
	}

	canvas.getHeight = function () {
		return this.drawable.height;
	}

	canvas.getWidth = function () {
		return [this.drawable.width,this.drawable.height];
	}

	canvas.getFilter = function () {
		return this.filter;
	}

	canvas.setFilter = function (filter) {
		switch (filter) {
			case "nearest":
			    this.filter = "nearest";
			    break;
			case "linear":
			    this.filter = "linear";
			    break;
			case null:
				this.filter = "default";
				break;
			default:
				throw("Invalid filter mode: " + filter)
				break;
		}
	}

	return canvas
}


//Set functions

love.graphics.setDefaultFilter = function (filter) {
	switch (filter) {
	case "nearest":
	    this.defaultFilter = "nearest";
	    break;
	case "linear":
	    this.defaultFilter = "linear";
	    break;
	default:
		throw("Invalid filter mode: " + filter)
		break;
	}
	this.ctx.imageSmoothingEnabled = this.defaultFilter == "linear";
}


love.graphics.setColor = function (r,g,b,a) {
	//TODO: Accept arrays
	if (typeof(r)=="object") {
		this.color.r = r[0] || this.color.r;
		this.color.g = g[1] || this.color.g;
		this.color.b = b[2] || this.color.b;
		this.color.a = a[3] || this.color.a;
	}
	else {
		this.color.r = r;
		this.color.g = g;
		this.color.b = b;
		this.color.a = a;
	}
	
	
	this.ctx.fillStyle = this.rgb(r,g,b);
	this.ctx.strokeStyle = this.rgb(r,g,b);
	this.ctx.globalAlpha = a/255;
}

love.graphics.setBackgroundColor = function (r,g,b) {
	this.backgroundColor.r = r.toString(16);
	this.backgroundColor.g = g.toString(16);
	this.backgroundColor.b = b.toString(16);
	if (this.backgroundColor.r.length == 1){
		this.backgroundColor.r = this.backgroundColor.r + '0';
	}
	if (this.backgroundColor.g.length == 1){
		this.backgroundColor.g = this.backgroundColor.g + '0';
	}
	if (this.backgroundColor.b.length == 1){
		this.backgroundColor.b = this.backgroundColor.b + '0';
	}
}

love.graphics.setLineWidth = function (s) {
	this.ctx.lineWidth = s+1;
}

love.graphics.setPointSize = function (s) {
	this.pointSize = s;
}

love.graphics.setFont = function (fnt) {
	this.font = fnt;
	this.ctx.font = this.font.size + "pt " + this.font.name
}

love.graphics.setBlendMode = function (mode) {
	this.ctx.globalCompositeOperation = mode;
}

love.graphics.setCanvas = function (cvs) {
	if (cvs==null) {
		this.ctx = this.defaultCtx;
		this.canvas = this.defaultCanvas;
		this.cvs = null;

	}
	else{
		this.ctx = cvs.context;
		this.canvas = cvs.drawable;
		this.cvs = cvs;
	}
}


//Get functions
love.graphics.getDefaultFilter = function () {
	if (this.ctx.imageSmoothingEnabled) {
		return "linear";
	}
	else {
		return "nearest";
	}
}

love.graphics.getColor = function () {
	return [this.color.r,this.color,g,this.color.b,this.color.a];
}

love.graphics.getBackgroundColor = function () {
	return [parseInt(this.backgroundColor.r,16),parseInt(this.backgroundColor.g,16),parseInt(this.backgroundColor.b,16)];
}

love.graphics.getLineWidth = function () {
	return this.ctx.lineWidth;
}

love.graphics.getPointSize = function () {
	return this.pointsize;
}

love.graphics.getFont = function () {
	return this.font;
}

love.graphics.getCanvas = function () {
	return this.cvs;
}

love.graphics.getWidth = function () {
	return this.canvas.width;
}

love.graphics.getHeight = function () {
	return this.canvas.height;
}

love.graphics.getDimensions = function () {
	return [this.canvas.width,this.canvas.height];
}

//Coordinate System
love.graphics.origin = function () {
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

love.graphics.translate = function (x,y) {
	this.ctx.translate(x,y);
}

love.graphics.rotate = function (r) {
	this.ctx.rotate(r);
}

love.graphics.scale = function (sx,sy) {
	this.ctx.scale(sx,sy)
}

love.graphics.shear = function (kx,ky) {
	this.ctx.transform(1,ky,kx,1,0,0);
}

love.graphics.push = function () {
	this.ctx.save();
}

love.graphics.pop = function () {
	this.ctx.restore();
}



//Utils

love.graphics.mode = function (mode) {
	if (mode=="fill") {
		this.ctx.fill();
	}
	else if (mode=="line") {
		this.ctx.stroke();
	}
}

love.graphics.clearScreen = function () {
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

love.graphics.background = function () {
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

love.graphics.rgb = function (r,g,b) {
	var x = ((r << 16) | (g << 8) | b).toString(16);
	return "#000000".substring(0, 7 - x.length) + x;
}



//Audio

love.audio = {};

love.audio.sources = {};

love.masterVolume = {};

love.audio.preload = function () {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var source;
		source = new Audio();
		source.src = name;
		source.oncanplaythrough = function(){
			love._assetsLoaded++;
		}
		love.audio.sources[name] = source;
		love._assetsToBeLoaded++;
	};
}

//Recorder functions
love.audio.play = function (source) {
	source.audio.play()
	source.stopped = false;
	source.playing = true;
}

love.audio.stop = function (source) {
	source.audio.pause()
	source.stopped = true;
	source.playing = false;
	source.audio.currentTime = 0;
}

love.audio.rewind = function (source) {
	source.audio.currentTime = 0;
}

love.audio.pause = function (source) {
	source.audio.pause()
	source.playing = false;
}

love.audio.resume = function (source) {
	if (source.audio.currentTime > 0) {
		source.audio.play();
		source.playing = true;
	}
}


//New functions
love.audio.newSource = function (url) {

	var source;
	source = {};
	source.audio = new Audio();
	source.audio.src = url;

	source.stopped = false;
	source.playing = false;

	source.type = function () {
		return "Source";
	}

	source.typeOf = function (type) {
		return type == "Object" || type == "Source";
	}

	source.play = function () {
		this.audio.play();
		this.stopped = false;
		this.playing = true;
	}

	source.stop = function () {
		this.audio.pause();
		this.stopped = true;
		this.audio.currentTime = 0;
	}

	source.pause = function () {
		this.audio.pause();
		this.audio.playing = false;
	}

	source.resume = function () {
		if (this.audio.currentTime>0) {
			this.audio.play();
			this.playing = true;
		}
	}

	source.rewind = function () {
		this.audio.currentTime = 0;
	}

	source.getVolume = function () {
		return this.audio.volume;
	}

	source.setVolume = function (volume) {
		this.audio.volume = volume;
	}

	source.isLooping = function () {
		return this.audio.loop;
	}

	source.setLooping = function (loop) {
		this.audio.loop = loop;
	}

	source.isPlaying = function () {
		return this.audio.playing;
	}

	source.isPaused = function () {
		return this.audio.paused;
	}

	source.isStopped = function () {
		return this.stopped;
	}

	source.setPitch = function (pitch) {
		this.audio.playbackRate = pitch;
	}

	source.getPtich = function () {
		return this.audio.playbackRate;
	}

	source.seek = function (position) {
		this.audio.currentTime = position;
	}

	source.tell = function () {
		return this.audio.currentTime;
	}

	return source;
}



//Keyboard

love.keyboard = {}

love.keyboard.constant = {
	8: "backspace",
	9: "tab",
	13: "return",
	16: "shift",
	17: "ctrl",
	18: "alt",
	19: "pause",
	20: "capslock",
	27: "escape",
	33: "pageup",
	34: "pagedown",
	35: "end",
	36: "home",
	45: "insert",
	46: "delete",
	37: "left",
	38: "up",
	39: "right",
	40: "down",
	91: "lmeta",
	92: "rmeta",
	93: "mode",
	96: "kp0",
	97: "kp1",
	98: "kp2",
	99: "kp3",
	100: "kp4",
	101: "kp5",
	102: "kp6",
	103: "kp7",
	104: "kp8",
	105: "kp9",
	106: "kp*",
	107: "kp+",
	109: "kp-",
	110: "kp.",
	111: "kp/",
	112: "f1",
	113: "f2",
	114: "f3",
	115: "f4",
	116: "f5",
	117: "f6",
	118: "f7",
	119: "f8",
	120: "f9",
	121: "f10",
	122: "f11",
	123: "f12",
	144: "numlock",
	145: "scrolllock",
	186: ",",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
};

love.keyboard.keysDown = [];

keyDownHandler = function(event) {
	var keyPressed = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	if (!love.keyboard.keysDown[keyPressed]) {
		if (love.keypressed) {
			love.keypressed(keyPressed);
		}
	}

	love.keyboard.keysDown[keyPressed] = true;
	
}

keyUpHandler = function(event) {
	var keyReleased = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	love.keyboard.keysDown[keyReleased] = false;
	if (love.keyreleased) {
		love.keyreleased(keyReleased);
	}
}


love.keyboard.isDown = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (love.keyboard.keysDown[arguments[i]]) {
			return true;
		}
	}
	return false;
}


//Mouse

love.mouse = {};

love.mouse.buttonsDown = [];

love.mouse.x = 0;
love.mouse.y = 0;

love.mouse.constant = {
	0:"l",
	1:"m"
};

mouseMove = function (event) {
	love.mouse.x = event.clientX;
	love.mouse.y = event.clientY;
}

mouseDownHandler = function (event) {
	var mousepressed = love.mouse.constant[event.button];
	love.mouse.buttonsDown[mousepressed] = true;
	if (love.mousepressed) {
		love.mousepressed(event.clientX,event.clientY,mousepressed);
	}
}

mouseUpHandler = function (event) {
	var mousereleased = love.mouse.constant[event.button];
	love.mouse.buttonsDown[mousereleased] = false;
	if (love.mousereleased) {
		love.mousereleased(event.clientX,event.clientY,mousereleased);
	}
}

love.mouse.getX = function () {
	return love.mouse.x;
}

love.mouse.getY = function () {
	return love.mouse.y;
}

love.mouse.isDown = function () {
	for (var i = 0; i < arguments.length; i++) {
		if (love.mouse.buttonsDown[arguments[i]]) {
			return true;
		}
	}
	return false;
}


//Run
love.run = function () {
		window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame   ||  //Chromium 
			window.webkitRequestAnimationFrame ||  //Webkit
			window.mozRequestAnimationFrame    || //Mozilla Geko
			window.oRequestAnimationFrame      || //Opera Presto
			window.msRequestAnimationFrame     || //IE Trident?
			function(callback, element){ //Fallback function
				window.setTimeout(callback, 1000/60);                
			}
		})();
		
		window.cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	
	if (love._assetsLoaded == love._assetsToBeLoaded) {
		if (love.graphics.ctx) {
			if (love.config) {
				love.config(love.graphics.canvas);
			}
			love.graphics.imageSmoothingEnabled = true;
			love.graphics.ctx.strokeStyle = love.graphics.rgb(255,255,255);
			love.graphics.setFont(love.graphics.newFont("arial",10))
			love.load();
			love.loop(0);
			window.cancelAnimFrame(love.run);
		}
		else {
			window.requestAnimFrame(love.run);
		}
	}
	else {
		window.requestAnimFrame(love.run);
	}
}

love.loop = function (time) {
	love.time.dt = (time - love.time.last) / 1000;
	love.update((love.time.dt > 0) ? love.time.dt : 1/60);
	love.graphics.drawloop();
	love.time.last = time;
	window.requestAnimFrame(love.loop);
}

love.graphics.drawloop = function (a) {
	this.clearScreen();
	this.ctx.save();
	this.ctx.fillStyle = this.rgb(this.backgroundColor.r,this.backgroundColor.g,this.backgroundColor.b);
	this.background();
	this.ctx.fillStyle = this.rgb(this.color.r,this.color.g,this.color.b);
	this.ctx.strokeStyle = this.rgb(this.color.r,this.color.g,this.color.b);
	this.ctx.globalAlpha = this.color.a/255;
	love.draw();
	this.ctx.restore();
}


window.addEventListener('load', init);