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

love.graphics.preload = function () {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var img;
		img = new Image();
		img.onload = function(){
			love._assetsLoaded++;
		}
		img.src = name;
		this.images[name] = img;
		love._assetsToBeLoaded++;
		
	};
}

//Drawing functions

love.graphics.rectangle = function (mode,x,y,w,h) {
	this.ctx.beginPath();
	this.ctx.rect(x,y,w,h);
	love.graphics._mode(mode);
}

love.graphics.circle = function (mode,x,y,r) {
	this.ctx.beginPath();
	this.ctx.arc(x,y,Math.abs(r),0,2*Math.PI);
	love.graphics._mode(mode)
}

love.graphics.arc = function (mode,x,y,r,a1,a2) {
	this.ctx.beginPath();
	this.ctx.lineTo(x,y);
	this.ctx.arc(x,y,Math.abs(r),a1,a2);
	this.ctx.lineTo(x,y);
	love.graphics._mode(mode);
}

love.graphics.clear = function () {
	this.ctx.fillStyle = this._rgb(this.backgroundColor.r,this.backgroundColor.b,this.backgroundColor.g);
	this._background();
	this.ctx.fillStyle = this._rgb(this.color.r,this.color.b,this.color.g);
}

love.graphics.line = function () {
	this.ctx.beginPath();
	if (typeof(arguments[0]) == "object") {
		var verts = arguments[0];
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
	love.graphics._mode("fill")
}

love.graphics.polygon = function (mode, verts) {
	this.ctx.beginPath();
	var verts = arguments[0];
	this.ctx.moveTo(verts[0],verts[1]);
	for (var i = 0; i < verts.length-2; i+=2) {
		this.ctx.lineTo(verts[i+2],verts[i+3]);
		this.ctx.stroke();
	};
	this.ctx.closePath();
	love.graphics._mode(mode);
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
	this.ctx.fillText(t, -ox, -oy+this.font.size);
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
	x = x || 0;
	y = y || 0;
	r = r || 0;
	sx = sx || 1;
	sy = sy || 1;
	ox = ox || 0;
	ox = ox || 0;
	kx = kx || 0;
	ky = ky || 0;

	if (img.filter != "default") {
		this.ctx.imageSmoothingEnabled = img.filter == "linear";
		this.ctx.mozImageSmoothingEnabled = img.filter == "linear";
		this.ctx.oImageSmoothingEnabled = img.filter == "linear";;
		this.ctx.webkitImageSmoothingEnabled = img.filter == "linear";
	}
	else {
		this.ctx.imageSmoothingEnabled = this.defaultFilter == "linear";
		this.ctx.mozImageSmoothingEnabled = this.defaultFilter == "linear";
		this.ctx.oImageSmoothingEnabled = this.defaultFilter == "linear";;
		this.ctx.webkitImageSmoothingEnabled = this.defaultFilter == "linear";
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
		this.ctx.drawImage(this.images[img.url],-ox,-oy);
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
	img.drawable = new Image();
	img.drawable.src = url;
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
	this.ctx.mozImageSmoothingEnabled = this.defaultFilter == "linear";
	this.ctx.oImageSmoothingEnabled = this.defaultFilter == "linear";;
	this.ctx.webkitImageSmoothingEnabled = this.defaultFilter == "linear";
}


love.graphics.setColor = function (r,g,b,a) {
	if (typeof(r)=="object") {
		this.color.r = r[0] || this.color.r;
		this.color.g = r[1] || this.color.g;
		this.color.b = r[2] || this.color.b;
		this.color.a = r[3] || this.color.a;
		this.ctx.fillStyle = this._rgb(r[0],r[1],r[2]);
		this.ctx.strokeStyle = this._rgb(r[0],r[1],r[2]);
		this.ctx.globalAlpha = r[3]/255;
	}
	else {
		this.color.r = r;
		this.color.g = g;
		this.color.b = b;
		this.color.a = a;
		this.ctx.fillStyle = this._rgb(r,g,b);
		this.ctx.strokeStyle = this._rgb(r,g,b);
		this.ctx.globalAlpha = a/255;
	}
}

love.graphics.setBackgroundColor = function (r,g,b) {
	if (typeof(r)=="object") {
		this.backgroundColor.r = r[0] || this.backgroundColor.r;
		this.backgroundColor.g = g[1] || this.backgroundColor.g;
		this.backgroundColor.b = b[2] || this.backgroundColor.b;
	}
	else {
		this.backgroundColor.r = r;
		this.backgroundColor.g = g;
		this.backgroundColor.b = b;
	}
}

love.graphics.setLineWidth = function (s) {
	this.ctx.lineWidth = s+1;
}

love.graphics.setPointSize = function (s) {
	this.pointSize = s;
}

love.graphics.setNewFont = function (fnt,size) {
	this.setFont(this.newFont(fnt,size));
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

love.graphics.setScissor = function (x,y,w,h) {
	if (x == null) {
		this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
		this.scissor = null;
	}
	this.ctx.save();
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	this.ctx.rect(x,y,w,h);
	this.ctx.restore();
	this.ctx.clip();
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

love.graphics.getScissor = function () {
	return this.scissor;
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
	if (!sy) {
		sy = sx;
	}
	this.ctx.scale(sx,sy);
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

love.graphics._mode = function (mode) {
	if (mode=="fill") {
		this.ctx.fill();
	}
	else if (mode=="line") {
		this.ctx.stroke();
	}
}

love.graphics._clearScreen = function () {
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

love.graphics._background = function () {
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

love.graphics._rgb = function (r,g,b) {
	var x = ((r << 16) | (g << 8) | b).toString(16);
	return "#000000".substring(0, 7 - x.length) + x;
}