import React, { useState } from 'react';
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

const VictoryMessage = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
  margin-top: 20px;
  padding: 15px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  background: #1a0d3d;
`;

const Level5 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleLearnMore = () => {
    setShowLearnMore(true);
    playSound('click');
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      updatePlayerState({
        sol: playerState.sol + 2,
        knowledgePoints: playerState.knowledgePoints + 5,
        choices: [...playerState.choices, 'learned-governance'],
      });
      alert('Correct! Governance lets you vote on Solana’s future. You’ve earned 2 SOL and 5 Knowledge Points!');
      setQuizCompleted(true);
    } else {
      alert('Not quite! Governance on Solana means voting on proposals, not trading NFTs. Try again!');
    }
    playSound('click');
  };

  const handleChoice = (choice) => {
    setHasVoted(true);
    updatePlayerState({
      badges: [...playerState.badges, 'Citizen'],
      choices: [...playerState.choices, `voted-${choice}`],
    });
    alert(`You voted ${choice === 'yes' ? 'Yes' : 'No'}! You’ve earned a Citizen badge for participating in governance.`);
    playSound('click');
  };

  React.useEffect(() => {
    if (hasVoted) {
      playSound('victory');
    }
  }, [hasVoted]);

  return (
    <LevelContainer>
      <LevelTitle>Level 5: The Governance Council</LevelTitle>
      <StoryText>
        Zara: "You’ve made it to the final challenge! The Solana community is voting on a proposal to allocate funds for a new marketplace. Before you vote, let’s learn about governance in Solana!"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore}>
          Learn More About Governance
        </QuizButton>
      ) : (
        <LearnMoreSection>
          <LearnMoreText>
            Governance on Solana is how the community decides the future of the network. It’s like a big town hall meeting! If you hold SOL, you can vote on proposals—like funding new projects or changing rules. This makes Solana decentralized, meaning no single person controls it. Your vote helps shape Solana’s future, so it’s a big responsibility!
          </LearnMoreText>
          {!quizCompleted && (
            <>
              <StoryText>Zara: "What does governance on Solana let you do?"</StoryText>
              <QuizButton onClick={() => handleQuizAnswer(true)}>
                Vote on proposals
              </QuizButton>
              <QuizButton onClick={() => handleQuizAnswer(false)}>
                Trade NFTs in markets
              </QuizButton>
            </>
          )}
        </LearnMoreSection>
      )}
      {!hasVoted ? (
        <div>
          <ChoiceButton onClick={() => handleChoice('yes')}>
            Vote Yes
          </ChoiceButton>
          <ChoiceButton onClick={() => handleChoice('no')}>
            Vote No
          </ChoiceButton>
        </div>
      ) : (
        <VictoryMessage>
          <h3>Congratulations, Survivor!</h3>
          <p>You’ve completed Solana Survival: The Phantom Wallet Chronicles!</p>
          <p>Your Achievements:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>SOL: {playerState.sol}</li>
            <li>NFTs: {playerState.nfts}</li>
            <li>Badges: {playerState.badges.join(', ') || 'None'}</li>
            <li>Knowledge Points: {playerState.knowledgePoints}</li>
          </ul>
          <p>Thank you for playing! You’re now ready to explore the real Solana ecosystem.</p>
        </VictoryMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level5;
