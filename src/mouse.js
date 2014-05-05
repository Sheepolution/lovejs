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