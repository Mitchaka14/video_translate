import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import NavBar from './components/NavBar';
import NavContent from './components/NavContent';
import "react-video-seek-slider/styles.css";
import { VideoSeekSlider } from "react-video-seek-slider";
import { IconButton, Slider, Divider } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import logo from './icon.png' 

const App = () => {
  const [activeSection, setActiveSection] = useState('settings'); // start with 'settings' as active section
  const player = useRef();
  const previewImage = useRef("");
  const interval = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoFile, setVideoFile] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4");

  useEffect(() => {
    if (player.current) {
      player.current.load();
    }
  }, [videoFile]);

  const [timeCodes, setTimeCodes] = useState([
    { fromMs: 0, description: "This is a very long first part label you could use" },
    { fromMs: 130000, description: "This is the second part" },
    { fromMs: 270000, description: "One more part label" },
    { fromMs: 440000, description: "Final battle" },
    { fromMs: 600000, description: "Cast " }
  ]);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      player.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  
  const handlePlayPause = () => {
    if (isPlaying) {
      player.current.pause();
      handlePause();
    } else {
      player.current.play();
      handlePlay();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleMuteUnmute = () => {
    player.current.muted = !player.current.muted;
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (event, newValue) => {
    player.current.volume = newValue / 100;
    setVolume(newValue);
  };
  
  const handleSkip = () => {
    const currentTimeMs = player.current.currentTime * 1000;
    let nextPart = null;

    // Find the next part according to the currentTime
    for (let i = 0; i < timeCodes.length; i++) {
      if (timeCodes[i].fromMs > currentTimeMs) {
        nextPart = timeCodes[i].fromMs / 1000; // Convert ms to seconds
        break;
      }
    }

    if (nextPart !== null) {
      player.current.currentTime = nextPart;
      setCurrentTime(nextPart * 1000); // Update currentTime state in ms
    }
  };
  const handleRewind = () => {
    const currentTimeMs = player.current.currentTime * 1000;
    let prevPart = null;

    // Find the previous part according to the currentTime
    for (let i = timeCodes.length - 1; i >= 0; i--) {
      if (timeCodes[i].fromMs < currentTimeMs) {
        prevPart = timeCodes[i].fromMs / 1000; // Convert ms to seconds
        break;
      }
    }

    if (prevPart !== null) {
      player.current.currentTime = prevPart;
      setCurrentTime(prevPart * 1000); // Update currentTime state in ms
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#a6277d',
      },
      background: {
        default: '#fff',
      },
      action: {
        active: '#ffffff', // or whatever white shade you need
      },
    },

  });

  const handleTimeChange = useCallback((time, offsetTime) => {
    if (!player.current?.currentTime) {
      return;
    }

    player.current.currentTime = time / 1000;
    setCurrentTime(time);

    console.log({ time, offsetTime });
  }, []);

  const handlePlay = () => {
    interval.current = setInterval(() => {
      setCurrentTime((player.current?.currentTime || 0) * 1000);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(interval.current);
  };

  const handleDataLoaded = () => {
    setMaxTime((player.current?.duration || 0) * 1000);
  };

  const handleProgress = () => {
    const buffer = player?.current?.buffered;

    if (((buffer?.length > 0 && player.current?.duration) || 0) > 0) {
      let currentBuffer = 0;
      const inSeconds = player.current?.currentTime || 0;

      for (let i = 0; i < buffer.length; i++) {
        if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
          currentBuffer = i;
          break;
        }
      }

      setProgress(buffer.end(currentBuffer) * 1000 || 0);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  const updatePreviewImage = (hoverTime) => {
    const url = `https://via.placeholder.com/140x60?text=${hoverTime}`;
    const image = document.createElement("img");
    image.src = url;

    image.onload = () => {
      previewImage.current = url;
    };
  };

  const handleGettingPreview = useCallback(
    (hoverTime) => {
      // FIND AND RETURN LOADED!!! VIDEO PREVIEW ACCORDING TO the hoverTime TIME
      console.log({ hoverTime, maxTime });
      updatePreviewImage(hoverTime, maxTime);

      return previewImage.current;
    },
    [maxTime]
  );

  useEffect(() => {
    if (!player) {
      return;
    }

    player.current?.addEventListener("play", handlePlay);
    player.current?.addEventListener("pause", handlePause);
    player.current?.addEventListener("loadeddata", handleDataLoaded);
    player.current?.addEventListener("progress", handleProgress);
  }, [player]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
      <div className="header">
          <img src={logo} alt="VoiceVerse - Video Editor" style={{ float: 'left', height: '35px', width: '85px' }}/> <b>VoiceVerse VideoTranslate ElevenLabs Hackathon</b>
        </div>
        <div className="main-content">
          <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <NavContent activeSection={activeSection} setVideoFile={setVideoFile} />
          <div className="video-area"> 
            <div className="video-preview">
              <video
                controls={false}
                autoPlay={false}
                ref={player}
              >
                <source src={videoFile} type="video/mp4" />
              </video>
            </div>
          </div> 
        </div>
  <div className="sliders-area">
  <div className="video-controller">
  <IconButton onClick={handlePlayPause} >
    {isPlaying ? <Pause color="action" /> : <PlayArrow color="action"/>}
  </IconButton>
  <IconButton onClick={handleRewind}>
    <SkipPrevious color="action" />
  </IconButton>

  <IconButton onClick={handleSkip}>
    <SkipNext color="action" />
  </IconButton>

  <span>
          {formatTime(currentTime / 1000)} / {formatTime(maxTime / 1000)}
        </span>
        <IconButton onClick={handleMuteUnmute}>
    {isMuted ? <VolumeOff color="action"/> : <VolumeUp color="action"/>}
  </IconButton>
  <span style={{ width: '100px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '5px', padding: '0 10px' }}>
    <Slider min={0} max={100} value={volume} onChange={handleVolumeChange} />
  </span>
  <IconButton onClick={handleFullScreen}>
  {isFullScreen ? <Fullscreen color="action"/> : <Fullscreen color="action"/>}
</IconButton>

</div>
<Divider />
    {/* First slider */}
    <div className="slider-container">
    <VideoSeekSlider 
     max={maxTime}
    currentTime={currentTime}
    bufferTime={progress}
    onChange={handleTimeChange}
    limitTimeTooltipBySides={true}
    secondsPrefix="00:"
    minutesPrefix="0:"
    getPreviewScreenUrl={handleGettingPreview}
    timeCodes={timeCodes}
    
  />
   
    </div>
    
    
  </div>

        <footer>
          Copyright 2023 - VoiceVerse
        </footer>
      </div>
    </ThemeProvider>
  );

}

export default App;
