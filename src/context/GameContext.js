import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [playerState, setPlayerState] = useState({
    sol: 0,
    nfts: 0,
    badges: [],
    choices: [],
    knowledgePoints: 0, // Track educational progress
  });

  const updatePlayerState = (newState) => {
    setPlayerState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <GameContext.Provider value={{ playerState, updatePlayerState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
