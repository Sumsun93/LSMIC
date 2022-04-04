/**
 * Package import
 */
import styled from '@emotion/styled';

/**
 * Styled components
 */
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid ${({ theme }) => theme.text._7};
  padding: 0 2rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1({
    fontSize: '2rem',
    fontWeight: 'bold',
    alignSelf: 'center',
});
