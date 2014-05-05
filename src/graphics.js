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