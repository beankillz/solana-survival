import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';

// Define colors locally to match Solana branding
const colors = {
  solanaTeal: '#00FFA3',
  solanaDark: '#141414',
};

const InventoryContainer = styled.div`
  font-family: 'Orbitron', sans-serif;
  color: ${colors.solanaTeal};
  background: ${colors.solanaDark};
  padding: 15px;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 8px;
  box-shadow: 0 0 15px ${colors.solanaTeal};
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  max-width: 700px;
  margin: 30px auto;
`;

const InventoryItem = styled.span`
  font-size: 1.1rem;
  text-shadow: 0 0 8px ${colors.solanaTeal};
`;

const Inventory = () => {
  const { playerState } = useGameContext();
  return (
    <InventoryContainer role="complementary" aria-label="Player Inventory">
      <InventoryItem>SOL: {playerState.sol.toFixed(2)}</InventoryItem>
      <InventoryItem>NFTs: {playerState.nfts}</InventoryItem>
      <InventoryItem>Badges: {playerState.badges.length}</InventoryItem>
      <InventoryItem>Knowledge: {playerState.knowledgePoints}</InventoryItem>
    </InventoryContainer>
  );
};

export default Inventory;
