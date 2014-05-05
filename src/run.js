//Run

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