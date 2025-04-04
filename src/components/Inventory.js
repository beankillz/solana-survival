import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';

const InventoryContainer = styled.div`
  font-family: 'Orbitron', sans-serif;
  color: #00ffff;
  background: #0d0221;
  padding: 15px;
  border: 2px solid #00ffff;
  border-radius: 8px;
  box-shadow: 0 0 15px #00ffff, inset 0 0 5px #00ffff;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  max-width: 700px;
  margin: 30px auto;
`;

const InventoryItem = styled.span`
  font-size: 1.1rem;
  text-shadow: 0 0 8px #00ffff;
`;

const Inventory = () => {
  const { playerState } = useGameContext();

  return (
    <InventoryContainer>
      <InventoryItem>SOL: {playerState.sol}</InventoryItem>
      <InventoryItem>NFTs: {playerState.nfts}</InventoryItem>
      <InventoryItem>Badges: {playerState.badges.length}</InventoryItem>
      <InventoryItem>Knowledge: {playerState.knowledgePoints}</InventoryItem>
    </InventoryContainer>
  );
};

export default Inventory;
