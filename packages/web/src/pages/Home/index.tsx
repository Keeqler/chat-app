import { Link } from 'react-router-dom'

import { BoxLayout } from '@/components/BoxLayout'
import { OutlinedButton, StandardButton } from '@/components/Button'

import * as s from './styles'

export const Home = () => (
  <BoxLayout title="Hi there!">
    <s.Buttons>
      <Link to="/signIn">
        <OutlinedButton>I already have an account</OutlinedButton>
      </Link>

      <Link to="/signUp">
        <StandardButton>I don&apos;t have an account</StandardButton>
      </Link>
    </s.Buttons>
  </BoxLayout>
)
