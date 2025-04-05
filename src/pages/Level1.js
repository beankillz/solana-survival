import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useGameContext } from '../context/GameContext';
import Inventory from '../components/Inventory';
import WalletSimulator from '../components/WalletSimulator';
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

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Level1 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [showWriteup, setShowWriteup] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [options, setOptions] = useState([]);

  const questions = [
    {
      question: "What’s Phantom Wallet?",
      answers: [
        { text: "A Solana blockchain tool", isCorrect: true },
        { text: "A physical coin vault", isCorrect: false },
      ],
      feedback: {
        correct: "Phantom is a blockchain tool.",
        incorrect: "Phantom isn’t a vault.",
      },
    },
    {
      question: "What app can Phantom connect to?",
      answers: [
        { text: "Orca", isCorrect: true },
        { text: "Serum on Ethereum", isCorrect: false },
      ],
      feedback: {
        correct: "Phantom connects to Orca.",
        incorrect: "Serum isn’t on Ethereum.",
      },
    },
    {
      question: "Why is your seed phrase important?",
      answers: [
        { text: "It secures your wallet", isCorrect: true },
        { text: "It’s just a backup", isCorrect: false },
      ],
      feedback: {
        correct: "Seed phrases are critical!",
        incorrect: "Seed phrases aren’t optional!",
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
        sol: quizStep === 0 ? playerState.sol + 2 : playerState.sol,
        knowledgePoints: playerState.knowledgePoints + 3,
        choices: quizStep === 0 ? [...playerState.choices, 'learned-wallet'] : playerState.choices,
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

  const isLevelComplete = playerState.choices.includes('wallet-created') && quizStep >= questions.length;

  return (
    <LevelContainer role="main" aria-label="Level 1: Welcome to Solana City">
      <LevelTitle>Level 1: Phantom Gateway</LevelTitle>
      <StoryText>
        Zara: "Hey, newbie! I’m Zara, your Solana guide. Let’s get you set up as a Wallet Holder—don’t mess this up!"
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore} aria-label="Learn about Phantom Wallet">
          Learn About Phantom
        </QuizButton>
      ) : (
        <LearnMoreSection>
          {showWriteup && quizStep === 0 && (
            <LearnMoreText>
              Phantom Wallet is your portal to Solana—fast (50,000 TPS), cheap ($0.00025 fees). It holds SOL, NFTs, and connects to apps like Orca (a DEX for swapping tokens) and Magic Eden (an NFT marketplace). For example, you can buy an NFT for 2 SOL on Magic Eden in under a second! Secure your seed phrase—it’s your lifeline! In 2022, over $100M in crypto was stolen due to seed phrase leaks.
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
          ) : null}
        </LearnMoreSection>
      )}
      <WalletSimulator />
      {isLevelComplete && (
        <CompletionMessage>
          <p>Level 1 Complete! You’re now a Wallet Holder—nice start!</p>
          <ProceedButton to="/level2" onClick={() => playSound('click')} aria-label="Proceed to Level 2">
            Proceed to Level 2: Neon Market
          </ProceedButton>
        </CompletionMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level1;
