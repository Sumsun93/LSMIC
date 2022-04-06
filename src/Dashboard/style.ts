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
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Alert = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.5rem;
  color: ${({ theme }) => theme.danger.main};
`;
