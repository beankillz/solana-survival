import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';
import { playSound } from './Sound';
import { Connection, PublicKey } from '@solana/web3.js';

const colors = {
  solanaTeal: '#00FFA3',
  solanaPurple: '#9945FF',
  solanaDark: '#141414',
  solanaGray: '#D3D3D3',
};

const SimulatorContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  background: ${colors.solanaDark};
  padding: 20px;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 10px;
  box-shadow: 0 0 15px ${colors.solanaTeal};
  max-width: 600px;
  margin: 20px auto;
`;

const SimulatorTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  color: ${colors.solanaPurple};
  text-shadow: 0 0 10px ${colors.solanaPurple};
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${colors.solanaTeal};
  background: transparent;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  text-shadow: 0 0 5px ${colors.solanaTeal};
  transition: all 0.3s ease;
  &:hover {
    color: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    text-shadow: 0 0 10px ${colors.solanaPurple};
    box-shadow: 0 0 15px ${colors.solanaPurple};
    transform: scale(1.05);
  }
`;

const Spinner = styled.div`
  border: 4px solid ${colors.solanaGray};
  border-top: 4px solid ${colors.solanaTeal};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const WalletSimulator = () => {
  const { updatePlayerState } = useGameContext();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  const connectRealWallet = async () => {
    setLoading(true);
    const { solana } = window;
    if (!solana) {
      alert('Please install Phantom Wallet!');
      setLoading(false);
      return;
    }
    try {
      const response = await solana.connect();
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const bal = await connection.getBalance(new PublicKey(response.publicKey));
      const sol = bal / 1e9;
      setBalance(sol);
      updatePlayerState({
        sol: sol,
        choices: ['wallet-created'],
      });
      playSound('click');
      alert('Phantom Wallet connected! Balance synced.');
    } catch (error) {
      console.error('Wallet connect failed:', error);
      alert('Connection failed. Try again!');
    }
    setLoading(false);
  };

  const createDemoWallet = () => {
    setLoading(true);
    setTimeout(() => {
      setBalance(10); // Mock 10 SOL
      updatePlayerState({
        sol: 10,
        choices: ['wallet-created', 'demo-mode'],
      });
      playSound('click');
      alert('Demo Phantom Wallet created! You’ve got 10 SOL to play with.');
      setLoading(false);
    }, 1000); // Simulate delay
  };

  return (
    <SimulatorContainer role="region" aria-label="Phantom Wallet Simulator">
      <SimulatorTitle>Phantom Wallet Simulator</SimulatorTitle>
      {balance === null ? (
        <>
          <p>Connect your Phantom Wallet or create a demo one to begin!</p>
          <ActionButton onClick={connectRealWallet} aria-label="Connect real Phantom Wallet">
            Link Phantom Wallet
          </ActionButton>
          <ActionButton onClick={createDemoWallet} aria-label="Create demo Phantom Wallet">
            Create Demo Wallet
          </ActionButton>
          {loading && <Spinner />}
        </>
      ) : (
        <p>Wallet active! Balance: {balance.toFixed(2)} SOL. Proceed to explore.</p>
      )}
    </SimulatorContainer>
  );
};

export default WalletSimulator;
