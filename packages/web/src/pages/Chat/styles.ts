import styled from 'styled-components'

export const Chat = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 940px) {
    height: 100%;
    position: relative;
    display: flex;

    .leftSideBar-enter {
      transform: translateX(-120%);
    }

    .leftSideBar-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .leftSideBar-exit {
      transform: translateX(0);
    }

    .leftSideBar-exit-active {
      transform: translateX(-120%);
      transition: transform 400ms ease;
    }

    .chat-enter {
      transform: translateX(120%);
    }

    .chat-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .chat-exit {
      transform: translateX(0);
    }

    .chat-exit-active {
      transform: translateX(120%);
      transition: transform 400ms ease;
    }
  }
`

export const LeftSideBar = styled.div`
  max-width: 380px;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  @media screen and (max-width: 940px) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const Chats = styled.div`
  width: 100%;
  flex-grow: 1;
  border-radius: 12px;
  background: #fff;
  overflow-y: auto;
`

export const NoConversations = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  color: #a7a7a7;

  strong {
    margin-bottom: 10px;
    font-size: 18px;
    color: #585858;
  }
`

export const Profile = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 12px;
  background: #fff;
`

export const ProfileMainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Welcome = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

export const WelcomeText = styled.span`
  font-size: 14px;
  color: #a7a7a7;
`

export const SignOutButton = styled.button.attrs({ type: 'button' })`
  padding: 6px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-size: 16px;
  font-weight: 700;
  color: #ff8484;
  border-radius: 100px;
  background: #ffeeee;
  transition: opacity 300ms;

  :hover {
    opacity: 0.6;
  }
`
