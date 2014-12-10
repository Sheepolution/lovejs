//loveJS
//A copy of the LÖVE API for Javascript

var init = function () {
	love.graphics.canvas=document.getElementById('canvas');
	love.graphics.defaultCanvas = love.graphics.canvas;
	document.addEventListener("keydown",love.keyboard._downHandler, false);
	document.addEventListener("keyup",love.keyboard._upHandler, false);
	document.addEventListener("mousemove",love.mouse._move, false);
	document.addEventListener("mousedown",love.mouse._downHandler, false);
	document.addEventListener("mouseup",love.mouse._upHandler, false);
	document.addEventListener("mousewheel",love.mouse._wheelHandler, false);
	love.graphics.ctx=love.graphics.canvas.getContext('2d');
	love.graphics.defaultCtx = love.graphics.ctx;
}

var love = {};

love.init = true;

love._assetsLoaded = 0;
love._assetsToBeLoaded = 0;