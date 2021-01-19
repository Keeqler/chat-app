import styled from 'styled-components'

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const Box = styled.main`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-top-right-radius: 132px;
  background: #fff;
`

export const BoxTop = styled.div`
  margin-bottom: 40px;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
`

export const Subtitle = styled.span`
  font-size: 16px;
  color: #a7a7a7;
`
