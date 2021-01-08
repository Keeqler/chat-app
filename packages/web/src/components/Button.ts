import styled from 'styled-components'

export const StandardButton = styled.button`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  border-radius: 100px;
  color: #fff;
  background: #422bd0;
  transition: background 300ms;

  :hover {
    background: #5246ff;
  }
`

export const OutlinedButton = styled(StandardButton)`
  border: 3px solid #422bd0;
  color: #422bd0;
  background: #fff;

  :hover {
    color: #fff;
    background: #422bd0;
  }
`
