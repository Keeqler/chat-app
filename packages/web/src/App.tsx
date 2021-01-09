import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import { GlobalStyle } from '@/components/GlobalStyle'
import { ToastContainer } from '@/components/ToastContainer'

import { Route } from './components/Route'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Chat } from './pages/Chat'
import { NotFound } from './pages/404'
import { useAuth } from './store/auth'
import { JwtPayload } from './types'

const App = () => {
  const authStore = useAuth(state => state)

  useEffect(() => {
    const isAuthenticated = !!authStore.jwt

    if (!isAuthenticated) {
      const lsJwt = localStorage.getItem('jwt')

      if (lsJwt) {
        const user = jwt.decode(lsJwt) as JwtPayload

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
          <Route component={Home} path="/" exact />
          <Route component={SignUp} path="/signUp" />
          <Route component={SignIn} path="/signIn" />
          <Route component={Chat} path="/app" requiresAuth />
          <Route component={NotFound} path="*" />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
