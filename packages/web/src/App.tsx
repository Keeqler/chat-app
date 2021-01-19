import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import { GlobalStyle } from '@/components/GlobalStyle'
import { ToastContainer } from '@/components/ToastContainer'

import { Route } from './components/Route'
import { HomePage } from './pages/Home'
import { SignUpPage } from './pages/SignUp'
import { SignInPage } from './pages/SignIn'
import { ChatPage } from './pages/Chat'
import { NotFoundPage } from './pages/404'
import { useAuth } from './store/auth'
import { User } from './types'

const App = () => {
  const authStore = useAuth(state => state)

  useEffect(() => {
    const isAuthenticated = !!authStore.jwt

    if (!isAuthenticated) {
      const lsJwt = localStorage.getItem('jwt')

      if (lsJwt) {
        const user = jwt.decode(lsJwt) as User

        authStore.signIn(lsJwt, user)
      }
    }
  }, [])

  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <BrowserRouter>
        <Switch>
          <Route component={HomePage} path="/" exact />
          <Route component={SignUpPage} path="/signUp" />
          <Route component={SignInPage} path="/signIn" />
          <Route component={ChatPage} path="/app" requiresAuth />
          <Route component={NotFoundPage} path="*" />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
