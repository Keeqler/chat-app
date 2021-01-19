import styled from 'styled-components'

export const Chat = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border-top-right-radius: 140px;
  background: #fff;
`

export const Recipient = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const RecipientRight = styled.div`
  display: flex;
  flex-direction: column;
`

type RecipientStatusProps = { status: 'online' | 'offline' }

export const RecipientStatus = styled.div`
  padding: 2px 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  border-radius: 100px;
  color: ${({ status }: RecipientStatusProps) => (status === 'online' ? '#5FDFA3' : '#A7A7A7')};
  background: ${({ status }: RecipientStatusProps) =>
    status === 'online' ? '#E0FFF1' : '#F4F4F4'};
`

export const RecipientStatusCircle = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  border-radius: 50%;
  background: ${({ status }: RecipientStatusProps) =>
    status === 'online' ? '#5FDFA3' : '#A7A7A7'};
`

export const Messages = styled.div`
  width: 100%;
  flex: 1;
`

export const MessageInputContainer = styled.div`
  width: 100%;
  padding: 10px;
`
