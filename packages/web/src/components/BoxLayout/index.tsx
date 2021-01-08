import { ReactNode } from 'react'

import * as s from './styles'

type Props = { title: string; subtitle?: string; children: ReactNode }

export const BoxLayout = ({ title, subtitle, children }: Props) => (
  <s.LayoutContainer>
    <s.Box>
      <s.BoxTop>
        <s.Title>{title}</s.Title>

        {!!subtitle && <s.Subtitle>{subtitle}</s.Subtitle>}
      </s.BoxTop>

      {children}
    </s.Box>
  </s.LayoutContainer>
)
