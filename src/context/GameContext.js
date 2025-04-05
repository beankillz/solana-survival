import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [playerState, setPlayerState] = useState(() => {
    const saved = localStorage.getItem('solanaSurvivalState');
    return saved ? JSON.parse(saved) : {
      sol: 0,
      nfts: 0,
      badges: [],
      choices: [],
      knowledgePoints: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('solanaSurvivalState', JSON.stringify(playerState));
  }, [playerState]);

  const updatePlayerState = (newState) => {
    setPlayerState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <GameContext.Provider value={{ playerState, updatePlayerState }}>
      {children}
    </GameContext.Provider>
  );
};

// Add PropTypes validation
GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGameContext = () => useContext(GameContext);
