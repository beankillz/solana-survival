import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useGameContext } from '../context/GameContext';
import Inventory from '../components/Inventory';
import { playSound } from '../components/Sound';

const colors = {
  solanaTeal: '#00FFA3',
  solanaPurple: '#9945FF',
  solanaDark: '#141414',
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LevelContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  background: ${colors.solanaDark};
  padding: 30px;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 15px;
  box-shadow: 0 0 20px ${colors.solanaTeal};
  max-width: 700px;
  margin: 30px auto;
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 15px;
    margin: 15px;
    max-width: 100%;
  }
`;

const LevelTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: ${colors.solanaPurple};
  text-shadow: 0 0 15px ${colors.solanaPurple};
  margin-bottom: 25px;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  color: #FFFFFF;
  line-height: 1.6;
  margin-bottom: 25px;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

const LearnMoreSection = styled.div`
  background: rgba(0, 255, 163, 0.1);
  padding: 15px;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 8px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    padding: 10px;
    margin-bottom: 15px;
  }
`;

const LearnMoreText = styled.p`
  font-size: 1rem;
  color: ${colors.solanaTeal};
  line-height: 1.5;
  margin-bottom: 15px;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
`;

const QuizButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${colors.solanaTeal};
  background: transparent;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  text-shadow: 0 0 5px ${colors.solanaTeal};
  transition: all 0.3s ease;
  min-width: 120px;
  min-height: 44px;

  &:hover {
    color: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    text-shadow: 0 0 10px ${colors.solanaPurple};
    box-shadow: 0 0 15px ${colors.solanaPurple};
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 8px 16px;
    margin: 8px;
    min-width: 100px;
  }
`;

const ActionButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${colors.solanaTeal};
  background: transparent;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  text-shadow: 0 0 5px ${colors.solanaTeal};
  transition: all 0.3s ease;
  min-width: 120px;
  min-height: 44px;

  &:hover {
    color: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    text-shadow: 0 0 10px ${colors.solanaPurple};
    box-shadow: 0 0 15px ${colors.solanaPurple};
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 8px 16px;
    margin: 8px;
    min-width: 100px;
  }
`;

const FeedbackMessage = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: ${(props) => (props.isCorrect ? '#00FF00' : '#FF0000')};
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin: 8px 0;
  }
`;

const ActionFeedbackMessage = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: ${(props) => (props.isSuccess ? '#00FF00' : '#FF0000')};
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin: 8px 0;
  }
`;

const ProceedButton = styled(Link)`
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.solanaDark};
  background: ${colors.solanaTeal};
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 12px 24px;
  margin: 20px 0;
  text-decoration: none;
  text-shadow: 0 0 5px ${colors.solanaDark};
  box-shadow: 0 0 15px ${colors.solanaTeal};
  transition: all 0.3s ease;
  min-width: 150px;
  text-align: center;

  &:hover {
    background: ${colors.solanaPurple};
    border-color: ${colors.solanaPurple};
    color: #FFFFFF;
    text-shadow: 0 0 10px #FFFFFF;
    box-shadow: 0 0 20px ${colors.solanaPurple};
    transform: scale(1.05);
  }
  &:focus {
    outline: 2px solid ${colors.solanaPurple};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 10px 20px;
    margin: 15px 0;
    min-width: 120px;
  }
`;

const CompletionMessage = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  color: ${colors.solanaTeal};
  text-shadow: 0 0 10px ${colors.solanaTeal};
  padding: 15px;
  border: 2px dashed ${colors.solanaTeal};
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 10px;
    margin: 15px 0;
  }
`;

const StakingSimulator = ({ reward, slashed }) => {
  return (
    <div
      style={{
        border: `2px solid ${colors.solanaTeal}`,
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ color: colors.solanaPurple, fontSize: '1.2rem', marginBottom: '10px' }}>
        Staking Simulator
      </h3>
      <p
        style={{
          color: '#FFFFFF',
          fontSize: '1rem',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {slashed
          ? 'Oh no! Your validator failed, and you were slashed -0.1 SOL.'
          : `You staked 2 SOL for 30 days at 8% APY! Reward: +${reward.toFixed(2)} SOL.`}
      </p>
    </div>
  );
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Level3 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);
  const [showWriteup, setShowWriteup] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [actionFeedback, setActionFeedback] = useState({ message: '', isSuccess: true });
  const [options, setOptions] = useState([]);
  const [stakingReward, setStakingReward] = useState(0);
  const [slashed, setSlashed] = useState(false);

  const questions = [
    {
      question: "What’s staking on Solana?",
      answers: [
        { text: "Locking SOL for rewards", isCorrect: true },
        { text: "Trading SOL for NFTs", isCorrect: false },
      ],
      feedback: {
        correct: "Staking locks SOL for rewards.",
        incorrect: "Staking isn’t trading.",
      },
    },
    {
      question: "What’s the typical APY on Orca?",
      answers: [
        { text: "~8% APY", isCorrect: true },
        { text: "20% APY", isCorrect: false },
      ],
      feedback: {
        correct: "Orca offers ~8% APY.",
        incorrect: "8% APY is correct, not 20%.",
      },
    },
    {
      question: "What’s a risk of staking?",
      answers: [
        { text: "Slashing by validators", isCorrect: true },
        { text: "No risks at all", isCorrect: false },
      ],
      feedback: {
        correct: "Slashing can happen!",
        incorrect: "Slashing is a risk!",
      },
    },
  ];

  useEffect(() => {
    if (quizStep < questions.length) {
      const shuffledAnswers = shuffleArray(questions[quizStep].answers);
      setOptions(shuffledAnswers);
      setFeedback({ message: '', isCorrect: false });
    }
  }, [quizStep]);

  const handleLearnMore = () => {
    setShowLearnMore(true);
    playSound('click');
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback({ message: `${questions[quizStep].feedback.correct} +3 Knowledge!`, isCorrect: true });
      updatePlayerState({
        knowledgePoints: playerState.knowledgePoints + 3,
        choices: quizStep === 0 ? [...playerState.choices, 'learned-staking-basics'] : playerState.choices,
      });
      // Removed playSound('victory')
      setTimeout(() => {
        setQuizStep(quizStep + 1);
        setShowWriteup(false);
      }, 1000);
    } else {
      setFeedback({ message: `${questions[quizStep].feedback.incorrect} Try again!`, isCorrect: false });
      playSound('click');
      setTimeout(() => {
        setFeedback({ message: '', isCorrect: false });
      }, 1000);
    }
  };

  const handleChoice = (choice) => {
    if (choice === 'stake-sol') {
      const reward = 0.1 + Math.random() * 0.2;
      const slashedChance = Math.random() < 0.1;
      updatePlayerState({
        sol: slashedChance ? playerState.sol - 2 - 0.1 : playerState.sol - 2 + reward,
        badges: [...playerState.badges, 'Staker'],
        choices: [...playerState.choices, 'stake-sol', 'learned-staking'],
      });
      setStakingReward(reward);
      setSlashed(slashedChance);
      setActionFeedback({
        message: slashedChance ? 'Oh no! Your validator failed, and you were slashed -0.1 SOL!' : `You staked 2 SOL and earned ${reward.toFixed(2)} SOL! Staker badge earned!`,
        isSuccess: !slashedChance,
      });
    } else {
      updatePlayerState({
        knowledgePoints: playerState.knowledgePoints + 2,
        choices: [...playerState.choices, 'learn-more', 'learned-staking'],
      });
      setActionFeedback({ message: 'You learned about staking on Orca—great choice! +2 Knowledge', isSuccess: true });
    }
    // Removed playSound('victory')
    setTimeout(() => {
      setChoiceMade(true);
      setActionFeedback({ message: '', isSuccess: true });
    }, 1000);
  };

  const isLevelComplete = playerState.choices.includes('learned-staking') && playerState.choices.includes('learned-staking-basics') && (playerState.choices.includes('stake-sol') || playerState.choices.includes('learn-more'));

  return (
    <LevelContainer role="main" aria-label="Level 3: Staking Hub">
      <LevelTitle>Level 3: Staking Hub</LevelTitle>
      <StoryText>
        Zara: "You’re doing well, NFT Collector! Let’s make you a Staker—time to learn about staking."
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore} aria-label="Learn about staking">
          Learn About Staking
        </QuizButton>
      ) : (
        <LearnMoreSection>
          {showWriteup && quizStep === 0 && (
            <LearnMoreText>
              Staking on Solana lets you earn rewards by locking SOL. Orca offers pools with ~8% APY, but validators like Marinade offer up to 10%. For example, staking 10 SOL might earn you 0.8 SOL annually! Be cautious—validators can fail, leading to slashing (losing a small portion of your stake).
            </LearnMoreText>
          )}
          {quizStep < questions.length ? (
            <>
              <StoryText>Zara: "{questions[quizStep].question}"</StoryText>
              {options.map((option, index) => (
                <QuizButton
                  key={index}
                  onClick={() => handleQuizAnswer(option.isCorrect)}
                  aria-label={option.text}
                  disabled={feedback.message !== ''}
                >
                  {option.text}
                </QuizButton>
              ))}
              {feedback.message && (
                <FeedbackMessage isCorrect={feedback.isCorrect}>
                  {feedback.isCorrect ? '✔' : '✘'} {feedback.message}
                </FeedbackMessage>
              )}
            </>
          ) : !choiceMade ? (
            <>
              <StoryText>Zara: "Nice! Now, stake 2 SOL for rewards or learn more? Staking has a small slashing risk!"</StoryText>
              <ActionButton onClick={() => handleChoice('stake-sol')} aria-label="Stake 2 SOL" disabled={actionFeedback.message !== ''}>
                Stake 2 SOL
              </ActionButton>
              <ActionButton onClick={() => handleChoice('learn-more')} aria-label="Learn more about staking" disabled={actionFeedback.message !== ''}>
                Learn More
              </ActionButton>
              {actionFeedback.message && (
                <ActionFeedbackMessage isSuccess={actionFeedback.isSuccess}>
                  {actionFeedback.isSuccess ? '✔' : '✘'} {actionFeedback.message}
                </ActionFeedbackMessage>
              )}
            </>
          ) : null}
        </LearnMoreSection>
      )}
      {isLevelComplete && (
        <CompletionMessage>
          <p>Level 3 Complete! You’re now a Staker—keep it up!</p>
          <StakingSimulator reward={stakingReward} slashed={slashed} />
          <ProceedButton to="/level4" onClick={() => playSound('click')} aria-label="Proceed to Level 4">
            Proceed to Level 4: NFT Bazaar
          </ProceedButton>
        </CompletionMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level3;
