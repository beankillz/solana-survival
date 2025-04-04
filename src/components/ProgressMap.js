import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  background: ${(props) => (props.active ? '#00ff00' : '#cccccc')};
  border: 2px solid ${(props) => (props.active ? '#00ff00' : '#666666')};
  box-shadow: ${(props) => (props.active ? '0 0 15px #00ff00' : 'none')};
  transition: all 0.3s ease;
`;

const LevelLabel = styled.span`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${(props) => (props.active ? '#00ff00' : '#cccccc')};
  text-shadow: ${(props) => (props.active ? '0 0 8px #00ff00' : 'none')};
  margin-top: 8px;
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
        <div key={level.path} style={{ textAlign: 'center' }}>
          <LevelDot active={location.pathname === level.path} />
          <br />
          <LevelLabel active={location.pathname === level.path}>
            {level.label}
          </LevelLabel>
        </div>
      ))}
    </MapContainer>
  );
};

export default ProgressMap;
