import React from 'react'; // Add this import
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
  React.useEffect(() => { // Now React is defined
    if (play) {
      playSound(type);
    }
  }, [play, type]);

  return null;
};

export { Sound, playSound };
