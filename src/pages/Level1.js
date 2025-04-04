import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useGameContext } from '../context/GameContext';
import Inventory from '../components/Inventory';
import WalletSimulator from '../components/WalletSimulator';
import { playSound } from '../components/Sound';

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LevelContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
  background: #0d0221;
  padding: 30px;
  border: 2px solid #00ffff;
  border-radius: 15px;
  box-shadow: 0 0 20px #00ffff, inset 0 0 10px #00ffff;
  max-width: 700px;
  margin: 30px auto;
  animation: ${fadeIn} 1s ease-in-out;
`;

const LevelTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #ff00ff;
  text-shadow: 0 0 15px #ff00ff, 0 0 25px #ff00ff;
  margin-bottom: 25px;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const LearnMoreSection = styled.div`
  background: #1a0d3d;
  padding: 15px;
  border: 2px solid #00ffff;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const LearnMoreText = styled.p`
  font-size: 1rem;
  color: #00ffff;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const QuizButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #00ff00;
  background: transparent;
  border: 2px solid #00ff00;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
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

const NavigationButton = styled(Link)`
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #00ff00;
  background: transparent;
  border: 2px solid #00ff00;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
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

const Level1 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleLearnMore = () => {
    setShowLearnMore(true);
    playSound('click');
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      updatePlayerState({
        sol: playerState.sol + 2,
        knowledgePoints: playerState.knowledgePoints + 5,
        choices: [...playerState.choices, 'learned-wallet'],
      });
      alert('Correct! A Phantom Wallet is your gateway to the Solana ecosystem. You’ve earned 2 SOL and 5 Knowledge Points!');
      setQuizCompleted(true);
    } else {
      alert('Not quite! A Phantom Wallet is a tool that lets you interact with Solana’s blockchain. Try again!');
    }
    playSound('click');
  };

  return (
    <LevelContainer>
      <LevelTitle>Level 1: Welcome to Solana City</LevelTitle>
      <StoryText>
        Zara: "Hey there, new citizen! I’m Zara, your guide in Solana City. To survive here, you’ll need a Phantom Wallet—it’s your key to everything in the Solana ecosystem. Let’s set one up together!"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore}>
          Learn More About Phantom Wallet
        </QuizButton>
      ) : (
        <LearnMoreSection>
          <LearnMoreText>
            A Phantom Wallet is a digital wallet designed for the Solana blockchain. Think of it like a magical backpack that holds your SOL (Solana’s currency), NFTs (digital collectibles), and more. It lets you interact with apps on Solana—like buying items, staking, or voting in governance. To use it, you need to create a wallet and secure your seed phrase—a secret set of words that keeps your wallet safe. Never share your seed phrase with anyone!
          </LearnMoreText>
          {!quizCompleted && (
            <>
              <StoryText>Zara: "Let’s test your knowledge! What is a Phantom Wallet?"</StoryText>
              <QuizButton onClick={() => handleQuizAnswer(true)}>
                A tool to interact with Solana
              </QuizButton>
              <QuizButton onClick={() => handleQuizAnswer(false)}>
                A place to store physical coins
              </QuizButton>
            </>
          )}
        </LearnMoreSection>
      )}
      <WalletSimulator />
      {playerState.choices.includes('wallet-created') && (
        <div>
          <NavigationButton to="/level2" onClick={() => playSound('click')}>
            Proceed to the Neon Market
          </NavigationButton>
        </div>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level1;
