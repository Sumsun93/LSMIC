/**
 * Package import
 */
import styled from '@emotion/styled';

/**
 * Styled component
 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid ${({ theme }) => theme.text._7};
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  align-self: center;
  margin-left: 2rem;
`;

export const Content = styled.div`
  width: 100%;
  padding: 1rem 2rem 4rem;
`;
