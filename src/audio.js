//Audio

love.audio = {};

love.masterVolume = {};

//Recorder functions
love.audio.play = function (audio) {
	audio.play();
	audio.stop = false;
	audio.playing = true;
}

love.audio.stop = function (audio) {
	audio.pause();
	audio.stopped = true;
	audio.currentTime = 0;
}

love.audio.rewind = function (audio) {
	audio.currentTime = 0;
}

love.audio.pause = function (audio) {
	audio.pause();
}

love.audio.resume = function (audio) {
	if (audio.currentTime>0) {
		audio.play();
		audio.playing = true;
	}
}


//New functions
love.audio.newSource = function (url) {
	var audio = new Audio(url);

	audio.stopped = false;
	audio.playing = false;

	audio.doPlay = audio.play;

	audio.play = function () {
		audio.doPlay();
		audio.stop = false;
		audio.playing = true;
	}

	audio.getVolume = function () {
		return audio.volume;
	}

	audio.setVolume = function (v) {
		audio.volume = v;
	}

	audio.isLooping = function () {
		return audio.loop;
	}

	audio.setLooping = function (v) {
		audio.loop = v;
	}

	audio.isPlaying = function () {
		return audio.playing;
	}

	audio.isPaused = function () {
		return audio.paused;
	}

	audio.isStopped = function () {
		return audio.stopped;
	}

	audio.stop = function () {
		audio.pause();
		audio.stop = true;
		audio.currentTime = 0;
	}

	audio.setPitch = function (v) {
		audio.playbackRate = v;
	}

	audio.getPtich = function () {
		return audio.playbackRate;
	}

	audio.seek = function (v) {
		audio.currentTime = v;
	}

	audio.tell = function () {
		return audio.currentTime;
	}



	return audio;
}