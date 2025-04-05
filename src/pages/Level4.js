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

const TradeButton = styled.button`
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

const TradeSimulator = () => {
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
        Trade Simulator
      </h3>
      <p
        style={{
          color: '#FFFFFF',
          fontSize: '1rem',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        You swapped 1 SOL for 100 USDC on Serum! Fee: $0.00025. Check your wallet!
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

const Level4 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [tradeMade, setTradeMade] = useState(false);
  const [showWriteup, setShowWriteup] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [actionFeedback, setActionFeedback] = useState({ message: '', isSuccess: true });
  const [options, setOptions] = useState([]);

  const questions = [
    {
      question: "What’s trading on Solana?",
      answers: [
        { text: "Swapping assets on a DEX", isCorrect: true },
        { text: "Voting on proposals", isCorrect: false },
      ],
      feedback: {
        correct: "Trading swaps assets on a DEX.",
        incorrect: "Trading isn’t voting.",
      },
    },
    {
      question: "Which DEX runs on Solana?",
      answers: [
        { text: "Serum", isCorrect: true },
        { text: "Uniswap", isCorrect: false },
      ],
      feedback: {
        correct: "Serum is on Solana.",
        incorrect: "Uniswap is on Ethereum.",
      },
    },
    {
      question: "What’s a benefit of trading on Solana?",
      answers: [
        { text: "Low fees", isCorrect: true },
        { text: "High fees", isCorrect: false },
      ],
      feedback: {
        correct: "Fees are super low!",
        incorrect: "Fees are low, not high!",
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
        choices: quizStep === 0 ? [...playerState.choices, 'learned-trading-basics'] : playerState.choices,
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

  const handleTrade = (choice) => {
    const negotiationSuccess = playerState.choices.includes('negotiation-success');
    const sellReward = negotiationSuccess ? 4 : 3;
    if (choice === 'sell-nft') {
      updatePlayerState({
        sol: playerState.sol + sellReward,
        nfts: playerState.nfts - 1,
        choices: [...playerState.choices, 'sell-nft', 'learned-trading'],
      });
      setActionFeedback({
        message: `You sold an NFT for ${sellReward} SOL on Serum! ${negotiationSuccess ? 'Your negotiation skills paid off!' : ''}`,
        isSuccess: true,
      });
    } else {
      updatePlayerState({
        nfts: playerState.nfts + 1,
        choices: [...playerState.choices, 'barter-nft', 'learned-trading'],
      });
      setActionFeedback({ message: 'You bartered for a new NFT—smart move!', isSuccess: true });
    }
    // Removed playSound('victory')
    setTimeout(() => {
      setTradeMade(true);
      setActionFeedback({ message: '', isSuccess: true });
    }, 1000);
  };

  const isLevelComplete = playerState.choices.includes('learned-trading') && playerState.choices.includes('learned-trading-basics') && (playerState.choices.includes('sell-nft') || playerState.choices.includes('barter-nft'));

  return (
    <LevelContainer role="main" aria-label="Level 4: NFT Bazaar">
      <LevelTitle>Level 4: NFT Bazaar</LevelTitle>
      <StoryText>
        Zara: {playerState.choices.includes('negotiation-success') ? "Your negotiation skills from the Neon Market are already paying off—traders respect you here!" : "Great job, Staker! Let’s make you a Trader—time to learn about trading on Solana."}
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore} aria-label="Learn about trading">
          Learn About Trading
        </QuizButton>
      ) : (
        <LearnMoreSection>
          {showWriteup && quizStep === 0 && (
            <LearnMoreText>
              Trading on Solana involves swapping assets on DEXs like Serum. Fees are low—around $0.00025—and transactions are lightning-fast! For example, you can swap 100 USDC for SOL in a liquidity pool in under a second. Watch out for slippage—price changes during trades can cost you!
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
          ) : !tradeMade ? (
            <>
              <StoryText>Zara: "Great! Now, sell an NFT or barter for a new one? Your negotiation skills might get you a better deal!"</StoryText>
              <TradeButton onClick={() => handleTrade('sell-nft')} aria-label="Sell NFT" disabled={actionFeedback.message !== ''}>
                Sell NFT
              </TradeButton>
              <TradeButton onClick={() => handleTrade('barter-nft')} aria-label="Barter for a new NFT" disabled={actionFeedback.message !== ''}>
                Barter NFT
              </TradeButton>
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
          <p>Level 4 Complete! You’re now a Trader—almost there!</p>
          <TradeSimulator />
          <ProceedButton to="/level5" onClick={() => playSound('click')} aria-label="Proceed to Level 5">
            Proceed to Level 5: Governance Council
          </ProceedButton>
        </CompletionMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level4;
