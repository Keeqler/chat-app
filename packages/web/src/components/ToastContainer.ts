import styled from 'styled-components'
import { ToastContainer as _ToastContainer } from 'react-toastify'

export const ToastContainer = styled(_ToastContainer)`
  .Toastify__toast {
    padding: 0;
    border-radius: 12px;
    background: #fff;
  }

  .Toastify__progress-bar {
    visibility: hidden;
  }

  .Toastify__close-button {
    display: none;
  }
`
