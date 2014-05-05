//lovescript
//A LÖVE to javascript port

var init = function () {
	love.graphics.canvas=document.getElementById('canvas');
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);
	document.addEventListener("mousemove",mouseMove, false);
	document.addEventListener("mousedown",mouseDownHandler, false);
	document.addEventListener("mouseup",mouseUpHandler, false);
	love.graphics.ctx=love.graphics.canvas.getContext('2d');
}

var love = { };

love.timestamp = function () {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

love.time = {now:0,dt:0,last:0};
love.time.last = love.timestamp();


//Graphics

love.graphics = {};

love.graphics.color = {r:"FF",g:"FF",b:"FF"};

love.graphics.backgroundColor = {r:"00",g:"00",b:"00"};

love.graphics.pointSize = 1;


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

love.graphics.line = function (verts,y1,x2,y2) {
	this.ctx.beginPath();
	if (typeof(verts) == "object") {
		this.ctx.moveTo(verts[0],verts[1]);
		for (var i = 0; i < verts.length-2; i+=2) {
			this.ctx.lineTo(verts[i+2],verts[i+3]);
			this.ctx.stroke();
		};
		
	}
	else {
		this.ctx.moveTo(verts,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
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

love.graphics._draw = function (img,x,y,r,sx,sy,ox,oy) {
	sx = sx || 1;
	sy = sy || 1;
	ox = ox || 0;
	oy = oy || 0;

	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.scale(sx,sy);
	this.ctx.rotate(r);
	if (img.loaded) {
		this.ctx.drawImage(img,-ox,-oy);
	}
	this.ctx.restore();

}

love.graphics.draw = function (img,quad,x,y,r,sx,sy,ox,oy) {
	if (typeof(quad) != "array") {
		love.graphics._draw(img,quad,x,y,r,sx,sy,ox);
		return;
	}
	sx = sx || 1;
	sy = sy || 1;
	ox = ox || 0;
	oy = oy || 0;

	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.scale(sx,sy);
	this.ctx.rotate(r);
	if (img.loaded) {
		this.ctx.drawImage(img,quad.sx,quad.sy,quad.sw,quad.sh,-ox,-oy,quad.sw,quad.sh);
	}
	this.ctx.restore();
}



//New functions

love.graphics.newImage = function (url) {
	var img = new Image();
	img.src = url;
	img.onload = function(){
		this.loaded = true;
	}

	return img;
}

love.graphics.newQuad = function (x,y,w,h,sw,sh,adw,adh) {
	return {sx:x,sy:y,sw:w,sh:h};
}

love.graphics.newFont = function (font,size) {
	return 'normal ' + size + 'px ' + font;
}



//Set functions

love.graphics.setDefaultFilter = function (a) {
	this.ctx.imageSmoothingEnabled = a == "linear";
}

love.graphics.setColor = function (r,g,b,a) {
	this.color.r = r.toString(16);
	this.color.g = g.toString(16);
	this.color.b = b.toString(16);
	if (this.color.r.length == 1){
		this.color.r = this.color.r + '0';
	}
	if (this.color.g.length == 1){
		this.color.g = this.color.g + '0';
	}
	if (this.color.b.length == 1){
		this.color.b = this.color.b + '0';
	}
	this.ctx.fillStyle='#' + this.color.r + this.color.g + this.color.b;
	this.ctx.strokeStyle='#' + this.color.r + this.color.g + this.color.b;
	love.graphics.ctx.globalAlpha = a/255;
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
	this.ctx.fillStyle='#' + this.backgroundColor.r + this.backgroundColor.g + this.backgroundColor.b;
	this.ctx.strokeStyle='#' + this.backgroundColor.r + this.backgroundColor.g + this.backgroundColor.b;
}

love.graphics.setLineWidth = function (s) {
	this.ctx.lineWidth = s+1;
}

love.graphics.setPointSize = function (s) {
	this.pointSize = s;
}

love.graphics.setFont = function (font) {
	this.ctx.font = font;
}

love.graphics.setBlendMode = function (mode) {
	this.ctx.globalCompositeOperation = mode;
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
	return [parseInt(this.color.r,16),parseInt(this.color.g,16),parseInt(this.color.b,16)];
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
	return this.ctx.font;
}



//Coordinate System
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



//Audio

love.audio = {};

love.masterVolume = {};

//Recorder functions
love.audio.play = function (audio) {
	audio.play();
	audio.stop = false;
	audio.playing = true;
}

love.audio.stop = function (audio) {
	audio.pause();
	audio.stopped = true;
	audio.currentTime = 0;
}

love.audio.rewind = function (audio) {
	audio.currentTime = 0;
}

love.audio.pause = function (audio) {
	audio.pause();
}

love.audio.resume = function (audio) {
	if (audio.currentTime>0) {
		audio.play();
		audio.playing = true;
	}
}


//New functions
love.audio.newSource = function (url) {
	var audio = new Audio(url);

	audio.stopped = false;
	audio.playing = false;

	audio.doPlay = audio.play;

	audio.play = function () {
		audio.doPlay();
		audio.stop = false;
		audio.playing = true;
	}

	audio.getVolume = function () {
		return audio.volume;
	}

	audio.setVolume = function (v) {
		audio.volume = v;
	}

	audio.isLooping = function () {
		return audio.loop;
	}

	audio.setLooping = function (v) {
		audio.loop = v;
	}

	audio.isPlaying = function () {
		return audio.playing;
	}

	audio.isPaused = function () {
		return audio.paused;
	}

	audio.isStopped = function () {
		return audio.stopped;
	}

	audio.stop = function () {
		audio.pause();
		audio.stop = true;
		audio.currentTime = 0;
	}

	audio.setPitch = function (v) {
		audio.playbackRate = v;
	}

	audio.getPtich = function () {
		return audio.playbackRate;
	}

	audio.seek = function (v) {
		audio.currentTime = v;
	}

	audio.tell = function () {
		return audio.currentTime;
	}



	return audio;
}



//Keyboard

love.keyboard = {}

love.keyboard.constant = {
	27:"escape",
	9:"tab",
	20:"capslock",
	8:"backspace",
	13:"return",
	16:"shift",
	17:"control",
	18:"lalt",
	225:"ralt",
	91:"lgui",
	92:"rgui",
	219:"[",
	221:"]",
	220:"\\",
	186:";",
	222:"'",
	189:"-",
	187:"=",
	192:"`",
	188:",",
	190:".",
	191:"/",
	37:"left",
	38:"up",
	39:"right",
	40:"down"
};

love.keyboard.keysDown = [];

keyDownHandler = function(event) {
	var keyPressed = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	
	love.keyboard.keysDown[keyPressed] = true;
	if (love.keypressed) {
		love.keypressed(keyPressed);
	}
}

keyUpHandler = function(event) {
	var keyReleased = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	love.keyboard.keysDown[keyReleased] = false;
	if (love.keyreleased) {
		love.keyreleased(keyReleased);
	}
}


love.keyboard.isDown = function(key) {
	key = key || "";
	if (typeof(key) == "string") {
		return love.keyboard.keysDown[key];
	}
	else {
		for (var i = 0; i < key.length; i++) {
			if (love.keyboard.keysDown[key[i]]) {
				return true;
			}
		};
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

love.mouse.isDown = function (button) {
	if (typeof(button) == "string") {
		return love.mouse.buttonsDown[button];
	}
	else {
		for (var i = 0; i < button.length; i++) {
			if (love.mouse.buttonsDown[button[i]]) {
				return true;
			}
		};
	}
	return false;
}


love.run = function () {
	window.requestAnimFrame = (function() {
		var firstFrameTime = Date.now(),
		frameDuration = 1000/60;

		function myRequestAnimationFrame(callback) {
			var now = Date.now()
			nextFrameTime = Math.ceil((now - firstFrameTime) / frameDuration) * frameDuration,
			setTimeout(callback, now - nextFrameTime);
		}
	 
    	return myRequestAnimationFrame;
	})();
    if (love.graphics.ctx) {
    	if (love.config) {
    		love.config(love.graphics.canvas);
    	}

		love.loop(true);
    }
    else {
		window.requestAnimFrame(love.run);
    }
}

love.loop = function (a) {
	window.requestAnimFrame(love.loop);
	love.time.now = love.timestamp();
	love.time.dt = (love.time.now-love.time.last) / 1000;
	love.update(love.time.dt);
	love.graphics.drawloop();
	love.time.last = love.time.now;

}

love.graphics.drawloop = function (a) {
	this.clearScreen();
	this.ctx.save();
	this.ctx.fillStyle='#' + this.backgroundColor.r + this.backgroundColor.g + this.backgroundColor.b;
	this.background();
	this.ctx.fillStyle='#' + this.color.r + this.color.g + this.color.b;
	love.draw();
	this.ctx.restore();
}

window.addEventListener('load', init);




/*TODO:
Make quad work as it's supposed to work.

Have love.graphics.draw support color change by setColor.

Image.functions. Probably need to use a preloader.


Preloader to implement:

love.graphics._numPendingImageLoads = 0;
love.graphics._remoteImageCache = {};
love.graphics._allImagesLoaded = Function.prototype; // empty function
love.graphics._preloadImages = function (urls) {
  var i;
  for (i=0; i<urls.length; i++)
    this.newImage(urls[i]);
}
love.graphics.newImage = function (url) {
  var img;
  if (url in this._remoteImageCache)
    return this._remoteImageCache[url];
  img = new Image();
  img.src = url;
  this._numPendingImageLoads++;
  img.onload = function(){
    this.loaded = true;
    if (--this._numPendingImageLoads == 0)
      this._allImagesLoaded();
  }
  return img;
}

/* Use example
love.graphics._allImagesLoaded = function() {
  /* Start the game here???
}
love.graphics._preloadImages([
  'sprites.png',
  'background0.png'
]); 


*/