import styled from 'styled-components'

export const UnderlinedTitle = styled.h1`
  position: relative;
  z-index: 1;

  ::after {
    content: '';
    width: 60%;
    height: 6px;
    position: absolute;
    bottom: 6px;
    left: 0;
    background: #a294fc;
    z-index: -1;
  }
`
