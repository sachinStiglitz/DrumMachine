import React, { useState } from "react";

const DrumMachine = () => {
  const [powerOn, setPowerOn] = useState(true);
  const [equalizerOn, setEqualizerOn] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState("Power On");

  const drumSounds = {
    Q: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"),
      name: "Heater 1",
    },
    W: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"),
      name: "Heater 2",
    },
    E: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"),
      name: "Heater 3",
    },
    A: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"),
      name: "Heater 4",
    },
    S: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"),
      name: "Clap",
    },
    D: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"),
      name: "Open HH",
    },
    Z: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"),
      name: "Kick'n'Hat",
    },
    X: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"),
      name: "Kick",
    },
    C: {
      sound: new Audio("https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"),
      name: "Closed HH",
    },
  };

  const playSound = (key) => {
    if (powerOn) {
      const sound = drumSounds[key].sound;
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play();
      setDisplayText(drumSounds[key].name);
    }
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
    setDisplayText(powerOn ? "Power Off" : "Power On");
  };

  const toggleEqualizer = () => {
    setEqualizerOn(!equalizerOn);
  };

  const changeVolume = (value) => {
    setVolume(value);
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        <div className="row">
          {Object.keys(drumSounds).map((key) => (
            <button
              className="drum-pad"
              id={key}
              key={key}
              onClick={() => playSound(key)}
            >
              {key}
              <audio className="clip" id={key} src={drumSounds[key].sound}></audio>
            </button>
          ))}
        </div>
      </div>
      <div id="controls">
        <button id="powerButton" className="control-button" onClick={togglePower}>
          Power
        </button>
        <button
          id="equalizerButton"
          className="control-button"
          onClick={toggleEqualizer}
        >
          Equalizer
        </button>
        <input
          id="volumeSlider"
          className="control-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DrumMachine;
