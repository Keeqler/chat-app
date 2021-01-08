import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { GlobalStyle } from '@/components/GlobalStyle'
import { ToastContainer } from '@/components/ToastContainer'

import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'

const App = () => (
  <>
    <GlobalStyle />
    <ToastContainer />

    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={SignUp} path="/signUp" />
        <Route component={SignIn} path="/signIn" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
