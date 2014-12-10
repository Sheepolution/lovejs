//Mouse

love.mouse = {};
love.mouse.x = 0;
love.mouse.y = 0;
love.mouse.buttonsDown = [];
love.mouse.constant = {
	0:"l",
	1:"m",
	2:"r",
	4:"wu",
	5:"wd"
};

love.mouse._move = function (event) {
	love.mouse.x = event.clientX-9;
	love.mouse.y = event.clientY-9;
}

love.mouse._downHandler = function (event) {
	var mousepressed = love.mouse.constant[event.button];
	love.mouse.buttonsDown[mousepressed] = true;
	if (love.mousepressed) {
		love.mousepressed(event.clientX,event.clientY,mousepressed);
	}
}

love.mouse._upHandler = function (event) {
	var mousereleased = love.mouse.constant[event.button];
	love.mouse.buttonsDown[mousereleased] = false;
	if (love.mousereleased) {
		love.mousereleased(event.clientX,event.clientY,mousereleased);
	}
}

love.mouse._wheelHandler = function (event) {
	event.preventDefault();
	var mousepressed = love.mouse.constant[event.wheelDelta > 0 ? 4 : 5];
	if (love.mousepressed) {
		love.mousepressed(event.clientX,event.clientY,mousepressed);
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

love.mouse.setCursor = function (cursor) {
	document.getElementById("canvas").style.cursor=cursor;
}