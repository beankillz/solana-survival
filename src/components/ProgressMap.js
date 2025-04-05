import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Solana-inspired colors (consistent with App.js)
const colors = {
  solanaTeal: '#00FFA3',
  solanaPurple: '#9945FF',
  solanaDark: '#141414',
  solanaGray: '#D3D3D3',
};

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 40px;
`;

const LevelDot = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${(props) => (props.active ? colors.solanaTeal : colors.solanaGray)};
  border: 2px solid ${(props) => (props.active ? colors.solanaTeal : colors.solanaDark)};
  box-shadow: ${(props) => (props.active ? `0 0 15px ${colors.solanaTeal}` : 'none')};
  transition: all 0.3s ease;
`;

const LevelLabel = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${(props) => (props.active ? colors.solanaTeal : colors.solanaGray)};
  text-shadow: ${(props) => (props.active ? `0 0 8px ${colors.solanaTeal}` : 'none')};
  margin-top: 8px;
`;

const LevelLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid ${colors.solanaPurple};
    outline-offset: 2px;
  }
`;

const ProgressMap = () => {
  const location = useLocation();
  const levels = [
    { path: '/', label: 'Start' },
    { path: '/level1', label: 'Level 1' },
    { path: '/level2', label: 'Level 2' },
    { path: '/level3', label: 'Level 3' },
    { path: '/level4', label: 'Level 4' },
    { path: '/level5', label: 'Level 5' },
  ];

  return (
    <MapContainer>
      {levels.map((level) => (
        <LevelLink key={level.path} to={level.path} aria-label={`Go to ${level.label}`}>
          <LevelDot active={location.pathname === level.path} />
          <LevelLabel active={location.pathname === level.path}>
            {level.label}
          </LevelLabel>
        </LevelLink>
      ))}
    </MapContainer>
  );
};

export default ProgressMap;
