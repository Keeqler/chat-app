import { ElementType } from 'react'
import { Redirect, Route as _Route, RouteProps } from 'react-router-dom'

import { useAuth } from '@/store/auth'

type Props = RouteProps & { component: ElementType; requiresAuth?: boolean }

export const Route = ({ requiresAuth, component: Component, ...props }: Props) => {
  const isAuthenticated = useAuth(state => state.jwt)

  if (!isAuthenticated && requiresAuth) {
    return <Redirect to="/" />
  }

  if (isAuthenticated && !requiresAuth) {
    return <Redirect to="/app" />
  }

  return <_Route {...props} render={renderProps => <Component {...renderProps} />} />
}
