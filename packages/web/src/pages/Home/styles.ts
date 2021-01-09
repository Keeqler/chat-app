import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  height: 520px;
  display: flex;

  @media screen and (max-height: 700px) {
    height: 300px;
  }
`

export const Buttons = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;

  a:first-child {
    margin-bottom: 20px;
  }
`
