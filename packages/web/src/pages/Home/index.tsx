import { Link } from 'react-router-dom'

import { BoxLayout } from '@/components/BoxLayout'
import { OutlinedButton, StandardButton } from '@/components/Button'

import * as s from './styles'

export const Home = () => (
  <BoxLayout title="Hi there!">
    <s.Content>
      <s.Buttons>
        <Link to="/signIn">
          <OutlinedButton>Log in</OutlinedButton>
        </Link>

        <Link to="/signUp">
          <StandardButton>Register</StandardButton>
        </Link>
      </s.Buttons>
    </s.Content>
  </BoxLayout>
)
