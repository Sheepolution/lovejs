//loveJS
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

love._assetsLoaded = 0;
love._assetsToBeLoaded = 0;