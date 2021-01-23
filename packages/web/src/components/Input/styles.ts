import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  position: relative;
`

export const Placeholder = styled.div`
  position: absolute;
  top: 10px;
  left: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  pointer-events: none;
`

export const PlaceholderText = styled.span`
  font-size: 16px;
  color: #bbb;
  transition: opacity 100ms;
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`

type InputProps = { validationState?: 'neutral' | 'valid' | 'invalid'; hasIcon?: boolean }

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 14px;
  padding-left: ${({ hasIcon }: InputProps) => (hasIcon ? '40px' : '14px')};
  font-size: 16px;
  color: #444;
  border: 2px solid
    ${({ validationState: vs }: InputProps) =>
      vs === 'invalid' ? '#ff8484' : vs === 'valid' ? '#5fdfa3' : '#f4f4f4'};
  border-radius: 100px;
  background: #f4f4f4;
  transition: 300ms border;

  ::placeholder {
    opacity: 0;
  }

  :focus {
    border-color: ${({ validationState }: InputProps) =>
      validationState === 'neutral' && '#422bd0'};
  }

  :not(:placeholder-shown)
    + ${Placeholder}
    > ${PlaceholderText},
    :focus
    + ${Placeholder}
    > ${PlaceholderText} {
    opacity: 0;
  }
`

export const TextAreaInput = styled(Input).attrs({ as: 'textarea' })`
  padding-top: 9px;
  resize: none;
`
