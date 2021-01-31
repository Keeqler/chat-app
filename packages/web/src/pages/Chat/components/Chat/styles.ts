import styled from 'styled-components'

export const Chat = styled.div`
  max-height: calc(100vh - 40px);
  margin-left: 20px;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-radius: 12px;
  border-top-right-radius: 80px;
  background: #fff;

  @media screen and (max-width: 940px) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 0;
  }
`

export const GoBackButton = styled.button.attrs({ type: 'button' })`
  width: 30px;
  height: 25.9px;
  position: absolute;
  top: 31px;
  left: 31px;
  background-size: cover;
  background-image: url('assets/go-back.svg');
  z-index: 1293857923;

  @media screen and (min-width: 940px) {
    display: none;
  }
`

export const Recipient = styled.div`
  width: 100%;
  margin: 0 auto;
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

export const MessagesFadeWrapper = styled.div`
  width: 100%;
  height: 0;
  position: relative;
`

export const MessagesFade = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(0deg, #00000000 0%, #fff 100%);
  z-index: 1829471298478174;
`

export const Messages = styled.div`
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow-y: auto;
`

type MessageProps = { incoming?: boolean }

export const Message = styled.div`
  max-width: 80%;
  margin-bottom: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: ${({ incoming }: MessageProps) => (incoming ? 'flex-start' : 'flex-end')};
  align-self: ${({ incoming }: MessageProps) => (incoming ? 'flex-start' : 'flex-end')};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ incoming }: MessageProps) => (incoming ? '#585858' : '#fff')};
  background: ${({ incoming }: MessageProps) => (incoming ? '#ECECEC' : '#a294fc')};

  span {
    margin-top: 2px;
    /* align-self: flex-end; */
    font-size: 10px;
    font-weight: 500;
    color: ${({ incoming }: MessageProps) => (incoming ? '#A7A7A7' : ' #F1EFFF')};
  }
`

export const FormContainer = styled.div`
  width: 100%;
  padding: 10px;
`

export const FormInner = styled.div`
  display: flex;
  flex-direction: row;
`
