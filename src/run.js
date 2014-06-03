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