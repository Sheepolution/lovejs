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


love.keyboard.isDown = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (love.keyboard.keysDown[arguments[i]]) {
			return true;
		}
	}
	return false;
}