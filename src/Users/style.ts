/**
 * Package import
 */
import { FC } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

/**
 * Styled component
 */
export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - 10rem);
  max-height: calc(100% - 10rem);
  padding: 1rem 2rem 0;
`;

export const Infos: FC<{ theme?: any }> = styled.div`
  height: 40rem;
  padding: 1rem 2rem 0;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  div {
    height: 100%;
  }
  
  textarea {
    resize: none;
    height: 100%;
    font-size: 1.2rem;
    
    color: ${({ theme }) => theme.text._1} !important;
  }
`;

export const InfosTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

type ActiveProps = {
    theme?: any
    isWorker?: boolean
}

export const Active: FC<ActiveProps> = styled.div(({ theme, isWorker }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: isWorker ? theme.info.main : theme.text._1,
    backgroundColor: isWorker ? theme.info.background : theme.primary._3,
    boxShadow: `0 0 0 3px ${isWorker ? theme.info.background : theme.primary._3}`,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    '::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: `1px solid ${isWorker ? theme.info.background : theme.primary._3}`,
        content: '""',
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const Deactive = styled.div(({ theme }) => ({
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.text._5,
    borderRadius: '50%',
    backgroundColor: theme.text._7,
    boxShadow: `0 0 0 2px ${theme.text._7}`,
}));

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
`;

export const TableContent = styled.div`
  width: 100%;
  max-height: calc(100% - 4rem);
  height: 100%;
`;

export const Filters = styled.div`
    display: flex;
    align-items: center;
  
    >button {
      margin-right: .5rem;
    }
`;

export const FilterSelect = styled.div`
  width: 10rem;
`;

export const FilterButtons = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.text._7};
  border-radius: 8px;
  overflow: hidden;
  height: 40px;
  margin: 1rem;
`;

type FilterButtonProps = {
    theme?: any
    isLast?: boolean
    isActive?: boolean
    onClick?: () => void
}

export const FilterButton: FC<FilterButtonProps> = styled.button(({ theme, isLast, isActive }) => ({
    ...theme.typo.labels.labelAdjustable,
    color: isActive ? theme.text._1 : theme.text._6,
    backgroundColor: isActive && theme.background._3,
    height: '100%',
    padding: '0 1rem',
    borderRight: `${isLast ? '0' : '1px'} solid ${theme.text._7}`,
}));

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NumberOfUsers = styled.div(({ theme }) => ({
    ...theme.typo.labels.label,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20rem',
    marginRight: '1rem',
}));

export const TableActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  button {
    margin: 0 .2rem;
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const BadgeChips = styled.div`
  background-color: ${({ color }) => color};
  height: 1rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-weight: 500;
  line-height: 170%;
  letter-spacing: .01px;
  margin: 5px
`;

export const CopyButton = styled.button(({ theme }) => ({
    color: theme.text._1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}))

export const FormCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  button {
    margin-top: .5rem;
  }
`;

export const MultiCopyText = styled.p`
  margin: 1rem 0;
`;
