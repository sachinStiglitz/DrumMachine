import React, { useState, useEffect } from 'react';

const drumPadData = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const DrumPad = ({ padData, onClick }) => {
  const { keyTrigger, id, url } = padData;

  const handlePadClick = () => {
    onClick(id);
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === padData.keyCode) {
        handlePadClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [padData]);

  return (
    <div className="drum-pad" id={id} onClick={handlePadClick}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
};

const App = () => {
  const [displayText, setDisplayText] = useState('');

  const handlePadClick = (padId) => {
    setDisplayText(padId);
  };

  return (
    <div id="drum-machine" className="container">
      <div id="display">{displayText}</div>
      <div id="drum-pads">
        {drumPadData.map((pad) => (
          <DrumPad key={pad.id} padData={pad} onClick={handlePadClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
