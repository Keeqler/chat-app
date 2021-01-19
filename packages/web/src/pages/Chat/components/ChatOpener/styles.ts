import styled from 'styled-components'
import { HorizontalSeparator } from '../HorizontalSeparator'

export const HistoryChat = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 10px;
  position: relative;
  display: flex;
  cursor: pointer;
  transition: height 300ms, background 300ms;

  :hover {
    height: 92px;
    background: #f8f9ff;
  }
`

export const Inner = styled.div`
  width: 100%;
  height: 48px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LeftSide = styled.div`
  max-width: calc(100% - 60px);
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`

export const NameAndLastMessage = styled.div`
  max-width: calc(100% - 60px);
  margin-left: 8px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

export const LastMessage = styled.span`
  font-size: 14px;
  color: #a7a7a7;
`

export const Time = styled.span`
  align-self: baseline;
  font-size: 12px;
  font-weight: 500;
  color: #a7a7a7;
`

export const BottomBorder = styled(HorizontalSeparator)`
  ${HistoryChat}:last-child > & {
    display: none;
  }
`
