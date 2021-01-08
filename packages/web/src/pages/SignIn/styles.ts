import styled from 'styled-components'

export const MessageBalloonIcon = styled.img`
  width: 100%;
  max-width: 200px;

  @media screen and (max-width: 460px) {
    max-width: 140px;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
