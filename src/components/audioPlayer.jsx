import React, { useEffect, useState } from 'react';

import './audioPlayer.scss';

let context, audio, source;

let durationSeconds;
let timer;

const range = React.createRef();

let seconds = 0;
const AudioPlayer = () => {
  const [isloaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    context = new AudioContext();
    fetch('../audio.mp3')
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        durationSeconds = decodedAudio.duration;
        range.current.min = 0;
        range.current.max = durationSeconds * 1000;
        range.current.value = 0;

        console.log('duration:', durationSeconds);
        audio = decodedAudio; // audio 변수에 mp3 파일을 불러온다.
        activatePlayer();
      });
  }, []);

  const activatePlayer = () => {
    setIsLoaded(true);
  };

  const playSound = () => {
    setIsPlaying(true);
    console.log('play');
    source = context.createBufferSource();
    source.buffer = audio;
    source.connect(context.destination); // 버퍼에 추가한 오디오를 최종 output인 destination에 연결한다.
    source.start(context.currentTime, seconds); // 재생

    timer = setInterval(() => {
      console.log('seconds:', seconds);
      seconds += 0.5;
      range.current.value = seconds * 1000;
    }, 500);
  };

  const handlePlayButton = () => {
    playSound();
  };

  const handlePauseButton = () => {
    console.log('pause');
    setIsPlaying(false);
    source.stop();
    clearInterval(timer);
  };

  const handleMouseDownRange = () => {
    handlePauseButton();
  };

  const handleMouseUpRange = (e) => {
    const { value } = e.target;
    seconds = Math.round(+value / 1000);
    playSound();
  };

  return (
    <div className="audio-player">
      <div className="audio-player__range-area">
        <input
          type="range"
          ref={range}
          className="audio-player__range"
          onMouseDown={handleMouseDownRange}
          onMouseUp={handleMouseUpRange}
          disabled={!isloaded}
        />
      </div>
      <div className="audio-player__buttons">
        <button className="audio-player__button" disabled={!isloaded}>
          Pre
        </button>
        {!isPlaying && (
          <button
            className="audio-player__button"
            onClick={handlePlayButton}
            disabled={!isloaded}
          >
            Play
          </button>
        )}
        {isPlaying && (
          <button
            className="audio-player__button"
            onClick={handlePauseButton}
            disabled={!isloaded}
          >
            Pause
          </button>
        )}
        <button className="audio-player__button" disabled={!isloaded}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
