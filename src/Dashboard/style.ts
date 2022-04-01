/**
 * Package import
 */
import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@oclock/crumble';
import { keyframes } from '@emotion/react';

/**
 * Styled components
 */
type ContainerProps = {
    theme?: any;
    isAvailable: boolean;
}

export const Container: React.FC<ContainerProps> = styled.div`
  min-height: 100vh;
  display: flex;
  text-align: initial;
  background-color: ${({  isAvailable }: ContainerProps) => isAvailable ? '#f0f' : 'transparent'};
`;

const rainbow = keyframes`
  0% {
    color: #ff0000;
  }
  25% {
    color: #ff7f00;
  }
  50% {
    color: #ffff00;
  }
  75% {
    color: #00ff00;
  }
  100% {
    color: #0000ff;
  }
`;

export const DisableApril: React.FC<any> = styled.button(({ theme }: any) => ({
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    color: theme.text._5,
}), ({ enabled }) => enabled && ({
    fontSize: '2rem',
    animation: `${rainbow} 2s linear infinite`,
}));
