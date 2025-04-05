import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from './assets/images/NEON_CITY.jpg';
import backgroundMusic from './assets/sounds/darkshadow.mp3';
import logo from './assets/images/solanaLogo.png';
import { GameProvider } from './context/GameContext';
import ProgressMap from './components/ProgressMap';
import styled, { keyframes } from 'styled-components';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import Level5 from './pages/Level5';

const colors = {
  solanaTeal: '#00FFA3',
  solanaPurple: '#9945FF',
  solanaDark: '#141414',
  solanaGray: '#D3D3D3',
  white: '#FFFFFF',
  neonPink: '#FF00E5', // Added for gradient effect
  neonBlue: '#00E5FF', // Added for gradient effect
};

const pulse = keyframes`
  0% { box-shadow: 0 0 10px ${colors.solanaTeal}; }
  50% { box-shadow: 0 0 20px ${colors.solanaTeal}; }
  100% { box-shadow: 0 0 10px ${colors.solanaTeal}; }
`;

const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px ${colors.solanaTeal}, 0 0 10px ${colors.solanaTeal}, 0 0 15px ${colors.solanaPurple}; }
  50% { text-shadow: 0 0 10px ${colors.solanaTeal}, 0 0 20px ${colors.solanaTeal}, 0 0 30px ${colors.solanaPurple}; }
  100% { text-shadow: 0 0 5px ${colors.solanaTeal}, 0 0 10px ${colors.solanaTeal}, 0 0 15px ${colors.solanaPurple}; }
`;

const flicker = keyframes`
  0% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
  100% { opacity: 1; }
`;

const underlineGlow = keyframes`
  0% { transform: scaleX(0); }
  50% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
`;

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
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  animation: ${pulse} 2s infinite;
`;

const MuteButton = styled.button`
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
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
  max-width: 800px;
`;

const TechieHeader = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: ${colors.solanaTeal};
  text-shadow: 0 0 20px ${colors.solanaTeal}, 0 0 40px ${colors.solanaTeal};
  margin: 0 0 40px;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${neonGlow} 3s infinite;
  text-align: center;
  background: linear-gradient(45deg, ${colors.solanaTeal}, ${colors.solanaPurple});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const WelcomeMessage = styled.p`
  font-size: 1.5rem;
  color: ${colors.solanaPurple};
  text-shadow: 0 0 10px ${colors.solanaPurple};
  margin: 20px 0;
  max-width: 600px;
  text-align: center;
`;

const StartButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
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
  }
`;

const Footer = styled.footer`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem; /* Larger font size */
  font-weight: 900; /* Extra bold */
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  margin-top: 40px;
  padding: 15px 30px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: linear-gradient(145deg, rgba(0, 229, 255, 0.1), rgba(255, 0, 229, 0.1)); /* Glass-like background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border for glass effect */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 229, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.5); /* Inner glow and shadow for depth */
  backdrop-filter: blur(5px); /* Glass effect */
  animation: ${flicker} 5s infinite; /* Flickering neon effect */
  transition: transform 0.3s ease, background 0.5s ease;

  /* Gradient text */
  background: linear-gradient(45deg, ${colors.neonBlue}, ${colors.neonPink});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Glow and shadow */
  text-shadow: 0 0 10px ${colors.neonBlue}, 0 0 20px ${colors.neonPink};

  /* Glowing underline effect */
  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, ${colors.neonBlue}, ${colors.neonPink});
    box-shadow: 0 0 10px ${colors.neonBlue}, 0 0 20px ${colors.neonPink};
    animation: ${underlineGlow} 3s infinite;
  }

  /* Hover effect */
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(145deg, rgba(0, 229, 255, 0.2), rgba(255, 0, 229, 0.2));
    text-shadow: 0 0 15px ${colors.neonBlue}, 0 0 30px ${colors.neonPink};
    background: linear-gradient(45deg, ${colors.neonPink}, ${colors.neonBlue});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    font-size: 1.3rem; /* Adjusted for mobile */
    padding: 10px 20px;
    margin-top: 20px;
    &:after {
      width: 70%;
    }
  }
`;

const Home = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3;
      if (!isMuted) audio.play().catch((e) => console.log('Audio failed:', e));
      else audio.pause();
    }
  }, [isMuted]);

  return (
    <HomeContainer>
      <audio ref={audioRef} src={backgroundMusic} aria-hidden="true" />
      <TechieHeader>Solana Survival</TechieHeader>
      <WelcomeMessage>
        Welcome to Solana City! Embark on a journey to master Phantom Wallet and explore Solana’s ecosystem.
      </WelcomeMessage>
      <StartButton to="/level1" aria-label="Start Solana Survival Journey">Boot Up</StartButton>
      <Footer>C25 - Back to Basics by Access Protocol</Footer>
    </HomeContainer>
  );
};

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
      if (!isMuted) audio.play().catch((e) => console.log('Audio failed:', e));
      else audio.pause();
    }
  }, [isMuted]);

  return (
    <GameProvider>
      <Router>
        <AppContainer>
          <Header>
            <Logo src={logo} alt="Solana Logo" />
            <MuteButton
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </MuteButton>
          </Header>
          <audio ref={audioRef} src={backgroundMusic} aria-hidden="true" />
          <ProgressMap />
          <AppRoutes />
        </AppContainer>
      </Router>
    </GameProvider>
  );
}

export default App;
