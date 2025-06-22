import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  styledContainer?: typeof StyledButton;
};

export default function Button({ styledContainer, ...props }: Props) {
  return <StyledButton type="button" {...props} as={styledContainer} />;
}
