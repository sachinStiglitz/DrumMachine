// DrumPad component
const DrumPad = ({ drumKey, song, handleClick, url, disabled }) => {
  return (
    <button
      className={`drum-pad ${disabled ? 'disabled' : ''}`}
      id={song}
      onClick={() => handleClick(drumKey)}
      disabled={disabled}
    >
      {drumKey}
      <audio className="clip" src={url} id={drumKey} />
    </button>
  );
};

// DrumMachine component
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumPads: [
        {
          key: 'Q',
          song: 'Heater-1',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        },
        {
                    key: "W",
                    song: "Heater-2",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
                },
                {
                    key: "E",
                   song: "Heater-3",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
                },
                {
                    key: "A",
                    song: "Heater-4",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
                },
                {
                    key: "S",
                    song: "Heater-6",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
                },
                {
                    key: "D",
                    song: "Open HH",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                },
                {
                    key: "Z",
                    song: "Kick_n_Hat",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
                },
                {
                    key: "X",
                    song: "Kick",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                },
                {
                    key: "C",
                    song: "Closed HH",
                    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                }
      ],
      currentSongText: '',
      power: true, // Added power state
      volume: 0.5, // Added volume state
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleButtonClick = (drumKey) => {
    const { power, drumPads, volume } = this.state;

    if (power) {
      const pad = drumPads.find((item) => item.key === drumKey);
      if (pad) {
        const audioElement = document.getElementById(drumKey);
        audioElement.currentTime = 0;
        audioElement.volume = volume;
        audioElement.play();
        this.setState({ currentSongText: pad.song });
      }
    }
  };

  handleKeyPress = (event) => {
    const drumKey = event.key.toUpperCase();
    this.handleButtonClick(drumKey);
  };

  togglePower = () => {
    this.setState((prevState) => ({
      power: !prevState.power,
      currentSongText: prevState.power ? 'Power Off' : '',
    }));
  };

  handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    this.setState({ volume }, () => {
      const drumPads = document.querySelectorAll('.drum-pad');
      drumPads.forEach((pad) => {
        const audioElement = pad.querySelector('audio');
        audioElement.volume = volume;
      });
    });
  };

  render() {
    const { drumPads, currentSongText, power, volume } = this.state;

    return (
      <div id="drum-machine">
        <h1 className="app-title">Drum Machine App</h1>
        <div className="display-container">
          <div id="display-pads">
            {drumPads.map((item) => (
              <DrumPad
                key={item.key}
                drumKey={item.key}
                song={item.song}
                handleClick={this.handleButtonClick}
                url={item.url}
                disabled={!power}
              />
            ))}
          </div>
          <p id="display" className="current-text">
            {currentSongText}
          </p>
          <div className="controls">
            <button id="power-button" onClick={this.togglePower}>
              {power ? 'Power Off' : 'Power On'}
            </button>
            <input
              type="range"
              id="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={this.handleVolumeChange}
              disabled={!power}
            />
          </div>
        </div>
      </div>
    );
  }
}

// App component
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <DrumMachine />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
