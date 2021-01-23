import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-left: 4px solid #fff;
  border-radius: 12px;
`

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Title = styled.span`
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 700;
  color: #313131;
`

export const Description = styled.span`
  font-size: 14px;
  color: #a7a7a7;
`
