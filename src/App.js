import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProgressMap from './components/ProgressMap';
import logo from './assets/images/solanaLogo.png';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import Level5 from './pages/Level5';
import { GameProvider } from './context/GameContext';
import backgroundImage from './assets/images/NEON_CITY.jpg';
import backgroundMusic from './assets/sounds/darkshadow.mp3';

// Styled component for the main app container with background
const AppContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
`;

// Styled component for the title
const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
  margin-bottom: 20px;
`;

// Styled component for the welcome message
const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #00ffff;
  text-shadow: 0 0 5px #00ffff;
  margin-bottom: 40px;
`;

// Styled component for the start button
const StartButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: #00ff00;
  background: transparent;
  border: 2px solid #00ff00;
  border-radius: 5px;
  text-decoration: none;
  text-shadow: 0 0 5px #00ff00;
  transition: all 0.3s ease;

  &:hover {
    color: #cc00ff;
    border-color: #cc00ff;
    text-shadow: 0 0 10px #cc00ff;
    box-shadow: 0 0 15px #cc00ff;
    transform: scale(1.05);
  }
`;

// Styled component for the mute button
const MuteButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #00ff00;
  background: transparent;
  border: 2px solid #00ff00;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  text-shadow: 0 0 5px #00ff00;
  transition: all 0.3s ease;

  &:hover {
    color: #cc00ff;
    border-color: #cc00ff;
    text-shadow: 0 0 10px #cc00ff;
    box-shadow: 0 0 15px #cc00ff;
  }
`;

// CSS for page transitions
const PageTransition = styled.div`
  &.page-enter {
    opacity: 0;
    transform: translateX(100px);
  }
  &.page-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  }
  &.page-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.page-exit-active {
    opacity: 0;
    transform: translateX(-100px);
    transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  }
`;

// Home component
const Home = () => (
  <>
    <Title>Solana Survival: The Phantom Wallet Chronicles</Title>
    <WelcomeMessage>Welcome to Solana City! Learn to use Phantom Wallet and survive the neon jungle.</WelcomeMessage>
    <StartButton to="/level1">Enter the City</StartButton>
  </>
);

// Wrapper component to access location for transitions
const AppRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // Create a ref for the transitioning element

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="page"
        timeout={500}
        nodeRef={nodeRef} // Pass the ref to CSSTransition
      >
        <PageTransition ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/level1" element={<Level1 />} />
            <Route path="/level2" element={<Level2 />} />
            <Route path="/level3" element={<Level3 />} />
            <Route path="/level4" element={<Level4 />} />
            <Route path="/level5" element={<Level5 />} />
          </Routes>
        </PageTransition>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3; // Lower volume to avoid overpowering
      if (!isMuted) {
        audio.play().catch((error) => {
          console.log('Background music playback failed:', error);
        });
      } else {
        audio.pause();
      }
    }
  }, [isMuted]);

  return (
    <GameProvider>
      <Router>
        <AppContainer>
          <audio ref={audioRef} src={backgroundMusic} />
          <MuteButton onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? 'Unmute' : 'Mute'}
          </MuteButton>
          <ProgressMap />
          <AppRoutes />
        </AppContainer>
      </Router>
    </GameProvider>
  );
}

export default App;
