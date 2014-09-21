//Utils

//Print function like in Lua
print = function () {
	var str = ""
	for (var i = 0; i < arguments.length; i++) {
		if (i<arguments.length-1) {
			str = str + arguments[i] +", ";
		}
		else {
			str = str + arguments[i];
		}
	}
	console.log(str);
}