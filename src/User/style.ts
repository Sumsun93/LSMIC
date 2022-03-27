/**
 * Package import
 */
import styled from '@emotion/styled';

/**
 * Styled component
 */
export const Container = styled.div`
  width: 400px;
  box-sizing: border-box;
  margin-left: 2rem;

  .crumble-card {
    background-color: ${({ theme }) => theme.background._3};
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-bottom: 1rem;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  picture {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
  }
  
  div {
    margin-bottom: .5rem;
  }
  
  button {
    margin: 0 .5rem;
  }
`;

export const CardTitle = styled.h2(({ theme }) => ({
    ...theme.typo.headlines.H2,
    marginBottom: '2rem',
}));

export const Buttons = styled.div`
  margin-top: 1rem;
`;
