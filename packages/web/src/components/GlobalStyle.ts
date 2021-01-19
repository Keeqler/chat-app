import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    text-decoration: none;
    outline: none;
    border: none;
    color: #313131;
    background: none;
  }

  body {
    font-size: 18px;
    background: #422bd0;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    display:flex;
    flex-direction:column;
  }

  a, button {
    cursor: pointer;
  }
`
