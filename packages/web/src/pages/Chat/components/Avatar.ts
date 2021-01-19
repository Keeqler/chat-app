import styled from 'styled-components'

type AvatarProps = { image?: string; online?: boolean }

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  border-radius: 50%;
  background-image: ${({ image }: AvatarProps) =>
    !!image
      ? `url(${process.env.REACT_APP_API_URL}/images/${image})`
      : 'url(assets/default-avatar.svg)'};
  background-size: ${({ image }: AvatarProps) => (image ? 'cover' : 'auto')};
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e3e3e3;

  ::after {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    bottom: 0;
    right: 0;
    display: ${({ online }: AvatarProps) => (online ? 'block' : 'none')};
    border-radius: 50%;
    background: #5fdfa3;
  }
`
