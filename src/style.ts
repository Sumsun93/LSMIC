/**
 * Package import
 */
import styled from '@emotion/styled';

/**
 * Local import
 */
export const Version = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text._4};
  
  a {
    margin-left: .3rem;
    color: ${({ theme }) => theme.info.main};
  }
`;

export const TooltipContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
