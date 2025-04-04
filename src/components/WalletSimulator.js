import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameContext } from '../context/GameContext';
import { playSound } from './Sound';

const SimulatorContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
  background: #0d0221;
  padding: 20px;
  border: 2px solid #00ffff;
  border-radius: 10px;
  box-shadow: 0 0 15px #00ffff, inset 0 0 5px #00ffff;
  max-width: 600px;
  margin: 20px auto;
`;

const SimulatorTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  color: #ff00ff;
  text-shadow: 0 0 10px #ff00ff;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  background: #1a0d3d;
  border: 2px solid #00ffff;
  border-radius: 5px;
  padding: 8px;
  margin: 10px 0;
  width: 100%;
  box-shadow: 0 0 5px #00ffff;
`;

const SeedPhrase = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #00ffff;
  background: #1a0d3d;
  padding: 10px;
  border: 2px solid #00ffff;
  border-radius: 5px;
  margin: 10px 0;
  text-shadow: 0 0 5px #00ffff;
  word-break: break-all;
`;

const ActionButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #00ff00;
  background: transparent;
  border: 2px solid #00ff00;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
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

const WalletSimulator = () => {
  const { updatePlayerState } = useGameContext();
  const [walletName, setWalletName] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  const generateSeedPhrase = () => {
    const mockSeed = 'apple banana cherry dog elephant fox grape';
    setSeedPhrase(mockSeed);
    playSound('click');
  };

  const createWallet = () => {
    if (walletName && seedPhrase) {
      setIsWalletCreated(true);
      updatePlayerState({
        sol: 10,
        choices: ['wallet-created'],
      });
      alert('Wallet created successfully! Secure your seed phrase.');
      playSound('click');
    } else {
      alert('Please enter a wallet name and generate a seed phrase.');
    }
  };

  return (
    <SimulatorContainer>
      <SimulatorTitle>Phantom Wallet Simulator</SimulatorTitle>
      {!isWalletCreated ? (
        <>
          <p>Step 1: Name your wallet.</p>
          <InputField
            type="text"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder="Enter wallet name"
          />
          <p>Step 2: Generate a seed phrase (12 words).</p>
          <ActionButton onClick={generateSeedPhrase}>
            Generate Seed Phrase
          </ActionButton>
          {seedPhrase && (
            <SeedPhrase>
              Seed Phrase: {seedPhrase}<br />
              <strong>Warning:</strong> Never share this phrase with anyone!
            </SeedPhrase>
          )}
          <p>Step 3: Create your wallet.</p>
          <ActionButton onClick={createWallet} disabled={!seedPhrase}>
            Create Wallet
          </ActionButton>
        </>
      ) : (
        <p>
          Wallet "{walletName}" created! You’ve earned 10 SOL. Proceed to the next step.
        </p>
      )}
    </SimulatorContainer>
  );
};

export default WalletSimulator;
