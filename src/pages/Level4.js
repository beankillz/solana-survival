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

const Level4 = () => {
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
        choices: [...playerState.choices, 'learned-trading'],
      });
      alert('Correct! Trading on Solana lets you buy and sell NFTs in marketplaces. You’ve earned 2 SOL and 5 Knowledge Points!');
      setQuizCompleted(true);
    } else {
      alert('Not quite! Trading on Solana involves buying and selling digital items like NFTs, not staking. Try again!');
    }
    playSound('click');
  };

  const handleChoice = (choice) => {
    if (choice === 'sell-nft') {
      if (playerState.nfts >= 1) {
        updatePlayerState({
          nfts: playerState.nfts - 1,
          sol: playerState.sol + 8,
          choices: [...playerState.choices, 'sell-nft'],
        });
        alert('You sold your NFT for 8 SOL! Great trade.');
      } else {
        alert("You don't have any NFTs to sell!");
      }
    } else {
      if (playerState.nfts >= 1) {
        updatePlayerState({
          nfts: playerState.nfts - 1,
          badges: [...playerState.badges, 'Trader'],
          choices: [...playerState.choices, 'barter-nft'],
        });
        alert('You bartered your NFT for a Trader badge! Nice deal.');
      } else {
        alert("You don't have any NFTs to barter!");
      }
    }
    playSound('click');
  };

  return (
    <LevelContainer>
      <LevelTitle>Level 4: The NFT Bazaar</LevelTitle>
      <StoryText>
        Zara: "Welcome to the NFT Bazaar! This is where people trade NFTs on Solana. A collector is offering 8 SOL for your NFT, or you can barter it for a Trader badge. Let’s learn about trading first!"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore}>
          Learn More About Trading
        </QuizButton>
      ) : (
        <LearnMoreSection>
          <LearnMoreText>
            Trading on Solana means buying and selling digital items like NFTs in marketplaces. It’s like a big online flea market! You can use your Phantom Wallet to trade NFTs for SOL or other items. Solana’s fast and low-cost transactions make trading smooth and affordable. Always check the value of your NFT before trading to get the best deal!
          </LearnMoreText>
          {!quizCompleted && (
            <>
              <StoryText>Zara: "What does trading on Solana involve?"</StoryText>
              <QuizButton onClick={() => handleQuizAnswer(true)}>
                Buying and selling NFTs
              </QuizButton>
              <QuizButton onClick={() => handleQuizAnswer(false)}>
                Staking SOL for rewards
              </QuizButton>
            </>
          )}
        </LearnMoreSection>
      )}
      <div>
        <ChoiceButton onClick={() => handleChoice('sell-nft')}>
          Sell NFT for 8 SOL
        </ChoiceButton>
        <ChoiceButton onClick={() => handleChoice('barter-nft')}>
          Barter NFT for a Trader Badge
        </ChoiceButton>
      </div>
      <NavigationButton to="/level5" onClick={() => playSound('click')}>
        Proceed to Level 5
      </NavigationButton>
      <Inventory />
    </LevelContainer>
  );
};

export default Level4;
