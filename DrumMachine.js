import React, { useState } from "react";

const DrumMachine = () => {
  const [powerOn, setPowerOn] = useState(true);
  const [equalizerOn, setEqualizerOn] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState("");

  const drumSounds = {
    Q: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      name: "Heater 1",
    },
    W: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      name: "Heater 2",
    },
    E: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      name: "Heater 3",
    },
    A: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      name: "Heater 4",
    },
    S: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      name: "Clap",
    },
    D: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      name: "Open HH",
    },
    Z: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      name: "Kick'n'Hat",
    },
    X: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      name: "Kick",
    },
    C: {
      sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      name: "Closed HH",
    },
  };

  // Function to play a drum sound
  const playSound = (key) => {
    if (powerOn) {
      const audioElement = document.getElementById(key);
      audioElement.volume = volume;
      audioElement.currentTime = 0;
      audioElement.play();
      setDisplayText(drumSounds[key].name);
    }
  };

  // Function to toggle power state
  const togglePower = () => {
    setPowerOn(!powerOn);
    setDisplayText(powerOn ? "Power Off" : "Power On");
  };

  // Function to toggle equalizer state
  const toggleEqualizer = () => {
    setEqualizerOn(!equalizerOn);
  };

  // Function to handle volume change
  const changeVolume = (event) => {
    const value = parseFloat(event.target.value);
    setVolume(value);
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        <div className="row">
          {Object.keys(drumSounds).map((key) => (
            <div
              className="drum-pad"
              key={key}
              onClick={() => playSound(key)}
            >
              {key}
              <audio id={key} src={drumSounds[key].sound}></audio>
            </div>
          ))}
        </div>
      </div>
      <div id="controls">
        <button id="powerButton" onClick={togglePower}>
          Power
        </button>
        <button id="equalizerButton" onClick={toggleEqualizer}>
          Equalizer
        </button>
        <input
          id="volumeSlider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="control-slider"
        />
      </div>
    </div>
  );
};

export default DrumMachine;
