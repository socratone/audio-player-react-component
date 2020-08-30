import React from 'react';

import './audioPlayer.scss';

const AudioPlayer = () => {
  return (
    <div className="audio-player">
      <div className="audio-player__range-area">
        <input type="range" className="audio-player__range" />
      </div>
      <div className="audio-player__buttons">
        <button className="audio-player__button">Pre</button>
        <button className="audio-player__button">Play</button>
        <button className="audio-player__button">Next</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
