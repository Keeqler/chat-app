import styled from 'styled-components'

export const Field = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`

type InputProps = { validationState: 'neutral' | 'valid' | 'invalid' }

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 14px;
  font-size: 16px;
  color: #444;
  border: 2px solid
    ${({ validationState: vs }: InputProps) =>
      vs === 'neutral' ? '#f4f4f4' : vs === 'valid' ? '#5fdfa3' : '#ff8484'};
  border-radius: 100px;
  background: #f4f4f4;
  transition: 300ms border;

  :focus {
    border-color: ${({ validationState }: InputProps) =>
      validationState === 'neutral' && '#422bd0'};
  }

  [type='textarea'] {
    height: 216px;
    padding: 8px 12px;
    resize: none;
  }
`

export const ErrorMessage = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: #ff8484;
`
