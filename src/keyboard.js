//Keyboard

love.keyboard = {};

love.keyboard.constant = {
	8: "backspace",
	9: "tab",
	13: "return",
	16: "shift",
	17: "ctrl",
	18: "alt",
	19: "pause",
	20: "capslock",
	27: "escape",
	33: "pageup",
	34: "pagedown",
	35: "end",
	36: "home",
	45: "insert",
	46: "delete",
	37: "left",
	38: "up",
	39: "right",
	40: "down",
	91: "lmeta",
	92: "rmeta",
	93: "mode",
	96: "kp0",
	97: "kp1",
	98: "kp2",
	99: "kp3",
	100: "kp4",
	101: "kp5",
	102: "kp6",
	103: "kp7",
	104: "kp8",
	105: "kp9",
	106: "kp*",
	107: "kp+",
	109: "kp-",
	110: "kp.",
	111: "kp/",
	112: "f1",
	113: "f2",
	114: "f3",
	115: "f4",
	116: "f5",
	117: "f6",
	118: "f7",
	119: "f8",
	120: "f9",
	121: "f10",
	122: "f11",
	123: "f12",
	144: "numlock",
	145: "scrolllock",
	186: ",",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
};

love.keyboard.keysDown = [];

love.keyboard._downHandler = function(event) {
	event.preventDefault();
	var keyPressed = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	if (!love.keyboard.keysDown[keyPressed]) {
		if (love.keypressed) {
			love.keypressed(keyPressed);
		}
	}
	love.keyboard.keysDown[keyPressed] = true;
}

love.keyboard._upHandler = function(event) {
	event.preventDefault();
	var keyReleased = love.keyboard.constant[event.keyCode] || String.fromCharCode(event.keyCode).toLowerCase();
	if (love.keyreleased) {
		love.keyreleased(keyReleased);
	}
	love.keyboard.keysDown[keyReleased] = false;
}


love.keyboard.isDown = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (love.keyboard.keysDown[arguments[i]]) {
			return true;
		}
	}
	return false;
}