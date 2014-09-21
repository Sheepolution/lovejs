//Audio

love.audio = {};

love.audio.sources = {};

love.masterVolume = {};

love.audio.preload = function () {
	for (var i = 0; i < arguments.length; i++) {
		var name = arguments[i];
		var source;
		source = new Audio();
		source.src = name;
		source.oncanplaythrough = function(){
			love._assetsLoaded++;
		}
		love.audio.sources[name] = source;
		love._assetsToBeLoaded++;
	}
}

//Recorder functions

love.audio.play = function (source) {
	source.audio.play();
	source.stopped = false;
	source.playing = true;
}

love.audio.stop = function (source) {
	source.audio.pause();
	source.stopped = true;
	source.playing = false;
	source.audio.currentTime = 0;
}

love.audio.rewind = function (source) {
	source.audio.currentTime = 0;
}

love.audio.pause = function (source) {
	source.audio.pause();
	source.playing = false;
}

love.audio.resume = function (source) {
	if (source.audio.currentTime > 0) {
		source.audio.play();
		source.playing = true;
	}
}

//New functions

love.audio.newSource = function (url) {

	var source;
	source = {};
	source.audio = new Audio();
	source.audio.src = url;

	source.stopped = false;
	source.playing = false;

	source.type = function () {
		return "Source";
	}

	source.typeOf = function (type) {
		return type == "Object" || type == "Source";
	}

	source.play = function () {
		this.audio.play();
		this.stopped = false;
		this.playing = true;
	}

	source.stop = function () {
		this.audio.pause();
		this.stopped = true;
		this.audio.currentTime = 0;
	}

	source.pause = function () {
		this.audio.pause();
		this.audio.playing = false;
	}

	source.resume = function () {
		if (this.audio.currentTime>0) {
			this.audio.play();
			this.playing = true;
		}
	}

	source.rewind = function () {
		this.audio.currentTime = 0;
	}

	source.getVolume = function () {
		return this.audio.volume;
	}

	source.setVolume = function (volume) {
		this.audio.volume = volume;
	}

	source.isLooping = function () {
		return this.audio.loop;
	}

	source.setLooping = function (loop) {
		this.audio.loop = loop;
	}

	source.isPlaying = function () {
		return this.audio.playing;
	}

	source.isPaused = function () {
		return this.audio.paused;
	}

	source.isStopped = function () {
		return this.stopped;
	}

	source.setPitch = function (pitch) {
		this.audio.playbackRate = pitch;
	}

	source.getPtich = function () {
		return this.audio.playbackRate;
	}

	source.seek = function (position) {
		this.audio.currentTime = position;
	}

	source.tell = function () {
		return this.audio.currentTime;
	}

	return source;
}