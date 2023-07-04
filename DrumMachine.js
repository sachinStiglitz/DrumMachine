import React, { useState } from 'react';

const DrumMachine = () => {
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

  const [powerOn, setPowerOn] = useState(true);
  const [displayText, setDisplayText] = useState('Power On');

  // Function to play a drum sound
  const playSound = (key) => {
    if (powerOn) {
      const sound = drumSounds[key].sound;
      sound.currentTime = 0;
      sound.play().then(() => {
        setDisplayText(drumSounds[key].name);
      });
    }
  };

  // Function to handle keydown events
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (drumSounds.hasOwnProperty(key)) {
      playSound(key);
    }
  };

  // Attach keydown event listener to the document
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Rest of the component code...

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        <div className="row">
          <button className="drum-pad" onClick={() => playSound('Q')}>Q</button>
          <button className="drum-pad" onClick={() => playSound('W')}>W</button>
          <button className="drum-pad" onClick={() => playSound('E')}>E</button>
        </div>
        <div className="row">
          <button className="drum-pad" onClick={() => playSound('A')}>A</button>
          <button className="drum-pad" onClick={() => playSound('S')}>S</button>
          <button className="drum-pad" onClick={() => playSound('D')}>D</button>
        </div>
        <div className="row">
          <button className="drum-pad" onClick={() => playSound('Z')}>Z</button>
          <button className="drum-pad" onClick={() => playSound('X')}>X</button>
          <button className="drum-pad" onClick={() => playSound('C')}>C</button>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
