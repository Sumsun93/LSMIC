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
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.background._4};
  // background: rgb(241, 245, 249);
`;

export const Logo = styled.img``;

export const Form = styled.form`
  margin-top: 2rem;
  width: 360px;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  background: ${({ theme }) => theme.background._2};
  box-shadow: rgb(0 0 0 / 4%) 0px 24px 32px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 0px 1px;
  border-radius: 16px;
`;

export const Inputs = styled.div`
  div {
    margin-top: 1.5rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  
  button {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    padding: 0 .3em;
    color: ${({ theme }) => theme.text._1};
`;
