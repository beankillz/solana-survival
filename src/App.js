import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/images/NEON_CITY.jpg';
import backgroundMusic from './assets/sounds/darkshadow.mp3';
import logo from './assets/images/solanaLogo.png';
import { GameProvider } from './context/GameContext';
import ProgressMap from './components/ProgressMap';
import styled from 'styled-components';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import Level5 from './pages/Level5';

// Solana-inspired color palette
const colors = {
  solanaTeal: '#00FFA3',
  solanaPurple: '#9945FF',
  solanaDark: '#141414',
  solanaGray: '#D3D3D3',
  white: '#FFFFFF',
};

const AppContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.white};
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center; /* Re-added for fallback centering */
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const TechieHeader = styled.h1`
  font-family: 'Exo 2', sans-serif;
  font-size: 3rem; /* Increased from 2.5rem */
  font-weight: 900; /* Bumped to max boldness */
  color: ${colors.solanaPurple};
  text-shadow: 0 0 20px ${colors.solanaPurple}, 0 0 40px ${colors.solanaPurple}; /* Doubled shadow intensity */
  margin: 20px 0 40px; /* Adjusted for spacing */
  letter-spacing: 2px; /* Added for impact */
  text-transform: uppercase; /* Ensures all caps for emphasis */
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: ${colors.solanaTeal};
  text-shadow: 0 0 10px ${colors.solanaTeal};
  margin: 20px 0;
`;

const StartButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: ${colors.solanaTeal};
  background: transparent;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  text-decoration: none;
  text-shadow: 0 0 5px ${colors.solanaTeal};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    text-shadow: 0 0 10px ${colors.solanaPurple};
    box-shadow: 0 0 15px ${colors.solanaPurple};
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid ${colors.solanaPurple};
    outline-offset: 2px;
    box-shadow: 0 0 15px ${colors.solanaPurple};
  }
`;

const MuteButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${colors.solanaTeal};
  background: transparent;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  text-shadow: 0 0 5px ${colors.solanaTeal};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    text-shadow: 0 0 10px ${colors.solanaPurple};
    box-shadow: 0 0 15px ${colors.solanaPurple};
  }

  &:focus {
    outline: 2px solid ${colors.solanaPurple};
    outline-offset: 2px;
    box-shadow: 0 0 15px ${colors.solanaPurple};
  }
`;

const Home = () => (
  <div>
    <TechieHeader>BOOT UP FOR THE ULTIMATE SOLANA ADVENTURE!</TechieHeader>
    <HomeContainer>
      <WelcomeMessage>Welcome to Solana City! Learn to use Phantom Wallet and survive the neon jungle.</WelcomeMessage>
      <StartButton to="/level1" aria-label="Enter Solana City">Enter the City</StartButton>
    </HomeContainer>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/level1" element={<Level1 />} />
    <Route path="/level2" element={<Level2 />} />
    <Route path="/level3" element={<Level3 />} />
    <Route path="/level4" element={<Level4 />} />
    <Route path="/level5" element={<Level5 />} />
  </Routes>
);

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3;
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
          <Logo src={logo} alt="Solana City Logo" />
          <audio ref={audioRef} src={backgroundMusic} aria-hidden="true" />
          <MuteButton
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
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
