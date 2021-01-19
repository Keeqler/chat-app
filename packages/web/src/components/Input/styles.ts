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
  font-size: 16px;
  color: #bbb;
  pointer-events: none;
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

  :not(:placeholder-shown) + ${Placeholder}, :focus + ${Placeholder} {
    opacity: 0;
  }

  [type='textarea'] {
    height: 216px;
    padding: 8px 12px;
    resize: none;
  }
`
