import styled from 'styled-components'

export const Chat = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 380px auto;
`

export const LeftSideBar = styled.div`
  display: flex;
  flex-direction: column;
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

export const Chats = styled.div`
  width: 100%;
  flex-grow: 1;
  border-radius: 12px;
  background: #fff;
`

export const MessageBalloonIcon = styled.img.attrs({ src: 'assets/message-ballon-purple.svg' })`
  width: 100%;
  max-width: 600px;
`
