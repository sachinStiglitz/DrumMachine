import React, { useState, useEffect } from "react";

const DrumMachine = () => {
  const [powerOn, setPowerOn] = useState(true);
  const [equalizerOn, setEqualizerOn] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [displayText, setDisplayText] = useState("");

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

  useEffect(() => {
    // Attach keydown event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Clean up the keydown event listener
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Function to play a drum sound
  const playSound = (key) => {
    if (powerOn) {
      const sound = drumSounds[key].sound;
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play();
      setDisplayText(drumSounds[key].name);
    }
  };

  // Function to handle keydown events
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (drumSounds.hasOwnProperty(key)) {
      playSound(key);
    }
  };

  // Function to toggle power state
  const togglePower = () => {
    setPowerOn(!powerOn);
    setDisplayText(powerOn ? "Power On" : "Power Off");
  };

  // Function to toggle equalizer state
  const toggleEqualizer = () => {
    setEqualizerOn(!equalizerOn);
  };

  // Function to handle volume change
  const changeVolume = (event) => {
    const value = event.target.value;
    setVolume(value);
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        <div className="row">
          <div
            className="drum-pad"
            onClick={() => playSound("Q")}
            onKeyDown={() => playSound("Q")}
            tabIndex="0"
          >
            Q
            <audio src={drumSounds["Q"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("W")}
            onKeyDown={() => playSound("W")}
            tabIndex="0"
          >
            W
            <audio src={drumSounds["W"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("E")}
            onKeyDown={() => playSound("E")}
            tabIndex="0"
          >
            E
            <audio src={drumSounds["E"].sound}></audio>
          </div>
        </div>
        <div className="row">
          <div
            className="drum-pad"
            onClick={() => playSound("A")}
            onKeyDown={() => playSound("A")}
            tabIndex="0"
          >
            A
            <audio src={drumSounds["A"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("S")}
            onKeyDown={() => playSound("S")}
            tabIndex="0"
          >
            S
            <audio src={drumSounds["S"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("D")}
            onKeyDown={() => playSound("D")}
            tabIndex="0"
          >
            D
            <audio src={drumSounds["D"].sound}></audio>
          </div>
        </div>
        <div className="row">
          <div
            className="drum-pad"
            onClick={() => playSound("Z")}
            onKeyDown={() => playSound("Z")}
            tabIndex="0"
          >
            Z
            <audio src={drumSounds["Z"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("X")}
            onKeyDown={() => playSound("X")}
            tabIndex="0"
          >
            X
            <audio src={drumSounds["X"].sound}></audio>
          </div>
          <div
            className="drum-pad"
            onClick={() => playSound("C")}
            onKeyDown={() => playSound("C")}
            tabIndex="0"
          >
            C
            <audio src={drumSounds["C"].sound}></audio>
          </div>
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
