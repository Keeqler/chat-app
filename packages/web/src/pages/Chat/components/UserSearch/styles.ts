import styled from 'styled-components'

type UserSearchProps = { hasResults: boolean }

export const UserSearch = styled.div`
  width: 100%;
  margin-bottom: ${({ hasResults }: UserSearchProps) => (hasResults ? '20px' : '0')};
`

export const Top = styled.div`
  width: 100%;
  padding: 0 10px;
  padding-top: 10px;
`

export const ChatOpeners = styled.div`
  width: 100%;
  margin-top: 6px;
`
