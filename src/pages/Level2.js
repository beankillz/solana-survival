import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useGameContext } from '../context/GameContext';
import Inventory from '../components/Inventory';
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

const ChoiceButton = styled.button`
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

const Level2 = () => {
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
        choices: [...playerState.choices, 'learned-nft'],
      });
      alert('Correct! NFTs are unique digital items on Solana, like art or collectibles. You’ve earned 2 SOL and 5 Knowledge Points!');
      setQuizCompleted(true);
    } else {
      alert('Not quite! NFTs on Solana are unique digital items, not physical objects. Try again!');
    }
    playSound('click');
  };

  const handleChoice = (choice) => {
    if (choice === 'send-sol') {
      if (playerState.sol >= 5) {
        updatePlayerState({
          sol: playerState.sol - 5,
          nfts: playerState.nfts + 1,
          choices: [...playerState.choices, 'send-sol'],
        });
      } else {
        alert("You don't have enough SOL! You need at least 5 SOL to buy an NFT.");
      }
    } else {
      updatePlayerState({
        choices: [...playerState.choices, 'ask-for-deal'],
      });
    }
    playSound('click');
  };

  return (
    <LevelContainer>
      <LevelTitle>Level 2: The Neon Market</LevelTitle>
      <StoryText>
        Zara: "Welcome to the Neon Market! It’s a bustling place where people trade NFTs—unique digital items on Solana. A vendor is selling a rare NFT for 5 SOL. Let’s learn more about NFTs before you decide what to do!"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore}>
          Learn More About NFTs
        </QuizButton>
      ) : (
        <LearnMoreSection>
          <LearnMoreText>
            NFTs, or Non-Fungible Tokens, are special digital items on the Solana blockchain. Imagine them as one-of-a-kind trading cards—each NFT is unique and can’t be copied! On Solana, NFTs are often art, collectibles, or even tickets to events. They’re stored in your Phantom Wallet, and you can buy, sell, or trade them in markets like this one. Solana makes NFT trading fast and cheap compared to other blockchains!
          </LearnMoreText>
          {!quizCompleted && (
            <>
              <StoryText>Zara: "Quick question! What are NFTs on Solana?"</StoryText>
              <QuizButton onClick={() => handleQuizAnswer(true)}>
                Unique digital items
              </QuizButton>
              <QuizButton onClick={() => handleQuizAnswer(false)}>
                Physical trading cards
              </QuizButton>
            </>
          )}
        </LearnMoreSection>
      )}
      <div>
        <ChoiceButton onClick={() => handleChoice('send-sol')}>
          Send 5 SOL to buy the NFT
        </ChoiceButton>
        <ChoiceButton onClick={() => handleChoice('ask-for-deal')}>
          Ask for a better deal
        </ChoiceButton>
      </div>
      <NavigationButton to="/level3" onClick={() => playSound('click')}>
        Proceed to Level 3
      </NavigationButton>
      <Inventory />
    </LevelContainer>
  );
};

export default Level2;
