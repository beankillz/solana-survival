import React from 'react';
import PropTypes from 'prop-types'; // Add this import
import computerBeepsSound from '../assets/sounds/computer-beeps.wav';
import applaudClapSound from '../assets/sounds/applaud-clap.wav';

const soundMap = {
  click: computerBeepsSound,
  victory: applaudClapSound,
};

const playSound = (type) => {
  const audio = new Audio(soundMap[type] || computerBeepsSound);
  audio.play().catch((error) => {
    console.log('Audio playback failed:', error);
  });
};

const Sound = ({ play, type }) => {
  React.useEffect(() => {
    if (play) {
      playSound(type);
    }
  }, [play, type]);

  return null;
};

// Add PropTypes validation
Sound.propTypes = {
  play: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export { Sound, playSound };
