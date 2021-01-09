import styled from 'styled-components'

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px 20px;
  background: #422bd0;
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

export const Title = styled.h1`
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

export const Subtitle = styled.span`
  font-size: 16px;
  color: #a7a7a7;
`
