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

const Level3 = () => {
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
        choices: [...playerState.choices, 'learned-staking'],
      });
      alert('Correct! Staking helps secure the Solana network and earns you rewards. You’ve earned 2 SOL and 5 Knowledge Points!');
      setQuizCompleted(true);
    } else {
      alert('Not quite! Staking on Solana helps secure the network, not buy NFTs. Try again!');
    }
    playSound('click');
  };

  const handleChoice = (choice) => {
    if (choice === 'stake-sol') {
      if (playerState.sol >= 5) {
        updatePlayerState({
          sol: playerState.sol - 5,
          badges: [...playerState.badges, 'Staker'],
          choices: [...playerState.choices, 'stake-sol'],
        });
        alert('You’ve staked 5 SOL and earned a Staker badge! Rewards will accrue over time.');
      } else {
        alert("You don't have enough SOL! You need at least 5 SOL to stake.");
      }
    } else {
      updatePlayerState({
        choices: [...playerState.choices, 'learn-more'],
      });
      alert('Zara explains: Staking SOL supports the Solana network and earns you rewards!');
    }
    playSound('click');
  };

  return (
    <LevelContainer>
      <LevelTitle>Level 3: The Staking Hub</LevelTitle>
      <StoryText>
        Zara: "Great job at the market! Now let’s visit the Staking Hub. Staking is a way to support the Solana network while earning rewards. Want to learn how it works?"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore}>
          Learn More About Staking
        </QuizButton>
      ) : (
        <LearnMoreSection>
          <LearnMoreText>
            Staking on Solana is like lending your SOL to help keep the network secure and fast. In return, you earn rewards—kind of like interest in a savings account! When you stake your SOL, you give it to a validator (a computer that processes transactions on Solana). The more SOL you stake, the more you can earn, and you’re helping make Solana stronger and more decentralized. It’s a win-win!
          </LearnMoreText>
          {!quizCompleted && (
            <>
              <StoryText>Zara: "Let’s see what you’ve learned! What does staking do on Solana?"</StoryText>
              <QuizButton onClick={() => handleQuizAnswer(true)}>
                Helps secure the network
              </QuizButton>
              <QuizButton onClick={() => handleQuizAnswer(false)}>
                Lets you buy NFTs
              </QuizButton>
            </>
          )}
        </LearnMoreSection>
      )}
      <div>
        <ChoiceButton onClick={() => handleChoice('stake-sol')}>
          Stake 5 SOL
        </ChoiceButton>
        <ChoiceButton onClick={() => handleChoice('learn-more')}>
          Learn More About Staking
        </ChoiceButton>
      </div>
      <NavigationButton to="/level4" onClick={() => playSound('click')}>
        Proceed to Level 4
      </NavigationButton>
      <Inventory />
    </LevelContainer>
  );
};

export default Level3;
