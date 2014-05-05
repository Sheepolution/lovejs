//Time

love.timestamp = function () {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

love.time = {now:0,dt:0,last:0};
love.time.last = love.timestamp();