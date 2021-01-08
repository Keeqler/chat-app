import styled, { keyframes } from 'styled-components'

import { StandardButton } from '@/components/Button'

type ButtonProps = { loading: boolean }

export const Button = styled(StandardButton).attrs({ type: 'submit' })`
  margin-top: 40px;
  cursor: ${({ loading }: ButtonProps) => (loading ? 'default' : 'pointer')};
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
