import styled, { keyframes } from 'styled-components'

import { StandardButton } from '@/components/Button'

type ButtonProps = { isLoading: boolean }

export const Button = styled(StandardButton).attrs({ type: 'submit' })`
  margin-top: 40px;
  cursor: ${({ isLoading }: ButtonProps) => (isLoading ? 'default' : 'pointer')};
`

export const Text = styled.span`
  color: #fff;
`

const spin = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
`

export const LoadingCircle = styled.img`
  width: 34px;
  height: 34px;
  animation: ${spin} 800ms linear infinite;
`
