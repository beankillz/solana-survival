import React, { useState, useEffect } from 'react';
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

const VoteButton = styled.button`
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

const VictoryMessage = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  color: ${colors.solanaTeal};
  text-shadow: 0 0 15px ${colors.solanaTeal};
  padding: 20px;
  border: 2px solid ${colors.solanaTeal};
  border-radius: 10px;
  margin: 10px 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 15px;
  }
`;

const ShareButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${colors.solanaDark};
  background: ${colors.solanaTeal};
  border: 2px solid ${colors.solanaTeal};
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 15px;
  cursor: pointer;
  text-shadow: 0 0 5px ${colors.solanaDark};
  box-shadow: 0 0 15px ${colors.solanaTeal};
  transition: all 0.3s ease;
  min-width: 150px;

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
    font-size: 0.9rem;
    padding: 8px 16px;
    min-width: 120px;
  }
`;

const ProposalImpactViewer = ({ vote }) => {
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
        Proposal Impact Viewer
      </h3>
      <p
        style={{
          color: '#FFFFFF',
          fontSize: '1rem',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {vote === 'yes'
          ? 'Funding the Neon Market will increase NFT trading volume by 10% but raise fees by 0.0001 SOL.'
          : 'Not funding the Neon Market keeps fees low but slows NFT market growth.'}
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

const Level5 = () => {
  const { playerState, updatePlayerState } = useGameContext();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState('');
  const [showWriteup, setShowWriteup] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [actionFeedback, setActionFeedback] = useState({ message: '', isSuccess: true });
  const [options, setOptions] = useState([]);

  const questions = [
    {
      question: "What’s governance on Solana?",
      answers: [
        { text: "Voting on proposals", isCorrect: true },
        { text: "Staking for rewards", isCorrect: false },
      ],
      feedback: {
        correct: "Governance means voting.",
        incorrect: "Governance isn’t staking.",
      },
    },
    {
      question: "What do governance proposals do?",
      answers: [
        { text: "Shape the ecosystem", isCorrect: true },
        { text: "Only create NFTs", isCorrect: false },
      ],
      feedback: {
        correct: "Proposals shape the ecosystem.",
        incorrect: "Proposals aren’t about NFTs only.",
      },
    },
    {
      question: "Does your vote matter?",
      answers: [
        { text: "Yes, every vote counts", isCorrect: true },
        { text: "No, it’s just symbolic", isCorrect: false },
      ],
      feedback: {
        correct: "Votes matter!",
        incorrect: "Votes do matter!",
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
        choices: quizStep === 0 ? [...playerState.choices, 'learned-governance-basics'] : playerState.choices,
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

  const handleVote = (vote) => {
    updatePlayerState({
      badges: [...playerState.badges, 'Governor'],
      choices: [...playerState.choices, vote === 'yes' ? 'voted-yes' : 'voted-no', 'learned-governance'],
    });
    setVoteChoice(vote);
    setActionFeedback({ message: `You voted ${vote === 'yes' ? 'Yes' : 'No'}! Governance badge earned.`, isSuccess: true });
    // Removed playSound('victory')
    setTimeout(() => {
      setHasVoted(true);
      setActionFeedback({ message: '', isSuccess: true });
    }, 1000);
  };

  const isLevelComplete = playerState.choices.includes('learned-governance') && playerState.choices.includes('learned-governance-basics') && (playerState.choices.includes('voted-yes') || playerState.choices.includes('voted-no'));

  // Play victory sound when VictoryMessage is shown
  useEffect(() => {
    if (isLevelComplete) {
      playSound('victory');
    }
  }, [isLevelComplete]);

  const shareTweet = `I scored ${playerState.knowledgePoints} in Solana Survival by @veryblvkman and @Accessprotocol! #SolanaHackathon`;

  return (
    <LevelContainer role="main" aria-label="Level 5: Governance Council">
      <LevelTitle>Level 5: Governance Council</LevelTitle>
      <StoryText>
        Zara: "Final stop, Trader! You’ve grown from a newbie to a true Solana Citizen—I’m proud of you. Let’s make you a Governor with one last lesson on governance."
      </StoryText>
      {!showLearnMore ? (
        <QuizButton onClick={handleLearnMore} aria-label="Learn about governance">
          Learn About Governance
        </QuizButton>
      ) : (
        <LearnMoreSection>
          {showWriteup && quizStep === 0 && (
            <LearnMoreText>
              Governance on Solana lets you vote on proposals to shape the ecosystem. For example, in 2022, the community voted to increase transaction fees slightly to improve network stability. Your vote helps decide the future of projects like new markets or upgrades—every vote counts!
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
          ) : !hasVoted ? (
            <>
              <StoryText>Zara: "Great! Now, vote on a proposal: Should we fund a new Neon Market? Your past negotiation skills might influence the outcome!"</StoryText>
              <VoteButton onClick={() => handleVote('yes')} aria-label="Vote Yes" disabled={actionFeedback.message !== ''}>
                Vote Yes
              </VoteButton>
              <VoteButton onClick={() => handleVote('no')} aria-label="Vote No" disabled={actionFeedback.message !== ''}>
                Vote No
              </VoteButton>
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
          <p>Level 5 Complete! You’re now a Governor—congratulations, Solana Citizen!</p>
          <ProposalImpactViewer vote={voteChoice} />
          <VictoryMessage>
            <h3>Congratulations, Survivor!</h3>
            <p>You’ve completed Solana Survival!</p>
            <p>Survival Score: {playerState.knowledgePoints} - {playerState.knowledgePoints >= 25 ? 'Solana Pro' : 'Solana Novice'}</p>
            <p>Your Achievements:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {playerState.badges.map((badge, index) => (
                <li key={index} style={{ color: colors.solanaTeal, margin: '5px 0' }}>
                  🏆 {badge}
                </li>
              ))}
            </ul>
            <ShareButton
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTweet)}`, '_blank');
                playSound('click');
              }}
              aria-label="Share your score on Twitter"
            >
              Share Your Score
            </ShareButton>
          </VictoryMessage>
        </CompletionMessage>
      )}
      <Inventory />
    </LevelContainer>
  );
};

export default Level5;
