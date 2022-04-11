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

export const Form = styled.div`
  margin-top: 2rem;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.background._2};
  box-shadow: rgb(0 0 0 / 4%) 0px 24px 32px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 0px 1px;
  border-radius: 16px;
`;

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    width: fit-content;
    margin: 0 auto 2rem auto;
    padding: 0 .3em;
    color: ${({ theme }) => theme.text._1};
`;

export const Gif = styled.img``;

export const Desc = styled.p`
  margin: 2rem 0;
`;

export const Name = styled.p`
  width: 100%;
  text-align: right;
`;
