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

const ChoiceButton = styled.button`
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

const NFTMintingSimulator = () => {
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
        NFT Minting Simulator
      </h3>
      <p
        style={{
          color: '#FFFFFF',
          fontSize: '1rem',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        You minted a Neon NFT for 0.5 SOL! It’s now in your wallet—check it out on Magic Eden!
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

const Level2 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [choiceMade, setChoiceMade] = useState(false);
  const [showWriteup, setShowWriteup] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [actionFeedback, setActionFeedback] = useState({ message: '', isSuccess: true });
  const [options, setOptions] = useState([]);

  const questions = [
    {
      question: "What’s an NFT on Solana?",
      answers: [
        { text: "A unique digital asset", isCorrect: true },
        { text: "A type of currency", isCorrect: false },
      ],
      feedback: {
        correct: "NFTs are unique tokens.",
        incorrect: "NFTs are unique, not currencies.",
      },
    },
    {
      question: "What’s a popular NFT marketplace on Solana?",
      answers: [
        { text: "Magic Eden", isCorrect: true },
        { text: "Uniswap", isCorrect: false },
      ],
      feedback: {
        correct: "Magic Eden is a top marketplace.",
        incorrect: "Uniswap is on Ethereum.",
      },
    },
    {
      question: "Why are Solana NFTs affordable?",
      answers: [
        { text: "Low fees ($0.00025)", isCorrect: true },
        { text: "High transaction costs", isCorrect: false },
      ],
      feedback: {
        correct: "Low fees make Solana NFTs affordable.",
        incorrect: "Solana has low fees, not high costs.",
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
        choices: quizStep === 0 ? [...playerState.choices, 'learned-nft-basics'] : playerState.choices,
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
    if (choice === 'send-sol') {
      updatePlayerState({
        sol: playerState.sol - 1,
        nfts: playerState.nfts + 1,
        choices: [...playerState.choices, 'send-sol', 'learned-nft'],
      });
      setActionFeedback({ message: 'You sent 1 SOL and got a Neon NFT! Safe choice.', isSuccess: true });
    } else {
      const dealSuccess = Math.random() > 0.3; // 70% chance of success
      if (dealSuccess) {
        updatePlayerState({
          nfts: playerState.nfts + 1,
          knowledgePoints: playerState.knowledgePoints + 2,
          choices: [...playerState.choices, 'ask-for-deal', 'learned-nft', 'negotiation-success'],
        });
        setActionFeedback({ message: 'Nice deal! You got a Neon NFT for free and learned a trick! +2 Knowledge', isSuccess: true });
      } else {
        updatePlayerState({
          choices: [...playerState.choices, 'ask-for-deal-fail', 'learned-nft'],
        });
        setActionFeedback({ message: 'The trader walked away—no deal this time. Better luck next time!', isSuccess: false });
      }
    }
    // Removed playSound('victory')
    setTimeout(() => {
      setChoiceMade(true);
      setActionFeedback({ message: '', isSuccess: true });
    }, 1000);
  };

  const isLevelComplete = playerState.choices.includes('learned-nft') && playerState.choices.includes('learned-nft-basics') && (playerState.choices.includes('send-sol') || playerState.choices.includes('ask-for-deal') || playerState.choices.includes('ask-for-deal-fail'));

  return (
    <LevelContainer role="main" aria-label="Level 2: Neon Market">
      <LevelTitle>Level 2: Neon Market</LevelTitle>
      <StoryText>
        Zara: "Not bad, Wallet Holder! Now let’s make you an NFT Collector. First, learn about NFTs."
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore} aria-label="Learn about NFTs">
          Learn About NFTs
        </QuizButton>
      ) : (
        <LearnMoreSection>
          {showWriteup && quizStep === 0 && (
            <LearnMoreText>
              NFTs on Solana are unique digital assets—think art like Solana Monkey Business or game items like Star Atlas. They’re stored on the blockchain, tradeable on markets like Magic Eden, often costing just 1-2 SOL. In 2023, Solana’s NFT market saw over $1B in trading volume—cheap fees make it a hub for creators! Be careful—scams can lead to losing your NFT if you’re not cautious.
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
              <StoryText>Zara: "Great! A trader offers you an NFT. Pay 1 SOL or negotiate? Negotiating might fail!"</StoryText>
              <ChoiceButton onClick={() => handleChoice('send-sol')} aria-label="Send 1 SOL for NFT" disabled={actionFeedback.message !== ''}>
                Send 1 SOL
              </ChoiceButton>
              <ChoiceButton onClick={() => handleChoice('ask-for-deal')} aria-label="Ask for a better deal" disabled={actionFeedback.message !== ''}>
                Ask for a Deal
              </ChoiceButton>
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
          <p>Level 2 Complete! You’re now an NFT Collector—well done!</p>
          <NFTMintingSimulator />
          <ProceedButton to="/level3" onClick={() => playSound('click')} aria-label="Proceed to Level 3">
            Proceed to Level 3: Staking Hub
          </ProceedButton>
        </CompletionMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level2;
