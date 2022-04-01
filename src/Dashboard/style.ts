/**
 * Package import
 */
import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@oclock/crumble';

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

export const DisableApril: React.FC<any> = styled.button`
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: ${({ theme }: ContainerProps) => theme.text._5};
`;
