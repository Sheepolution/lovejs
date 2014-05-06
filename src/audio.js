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
	};
}

//Recorder functions
love.audio.play = function (audio) {
	this.sources[audio.url].play()
	audio.stop = false;
	audio.playing = true;
}

love.audio.stop = function (audio) {
	this.sources[audio.url].pause()
	audio.stopped = true;
	this.sources[audio.url].currentTime = 0;
}

love.audio.rewind = function (audio) {
	this.sources[audio.url].currentTime = 0;
}

love.audio.pause = function (audio) {
	this.sources[audio.url].pause()
}

love.audio.resume = function (audio) {
	if (this.sources[audio.url].currentTime > 0) {
		this.sources[audio.url].play();
		audio.playing = true;
	}
}


//New functions
love.audio.newSource = function (url) {

	var source;
	source = {};
	source.url = url;

	source.stopped = false;
	source.playing = false;


	source.play = function () {
		love.audio.sources[source.url].play();
		source.stop = false;
		source.playing = true;
	}

	source.getVolume = function () {
		return source.volume;
	}

	source.setVolume = function (volume) {
		source.volume = volume;
	}

	source.isLooping = function () {
		return source.loop;
	}

	source.setLooping = function (loop) {
		source.loop = loop;
	}

	source.isPlaying = function () {
		return source.playing;
	}

	source.isPaused = function () {
		return source.paused;
	}

	source.isStopped = function () {
		return source.stopped;
	}

	source.stop = function () {
		source.pause();
		source.stop = true;
		source.currentTime = 0;
	}

	source.setPitch = function (pitch) {
		source.playbackRate = pitch;
	}

	source.getPtich = function () {
		return source.playbackRate;
	}

	source.seek = function (position) {
		source.currentTime = position;
	}

	source.tell = function () {
		return source.currentTime;
	}

	return source;
}