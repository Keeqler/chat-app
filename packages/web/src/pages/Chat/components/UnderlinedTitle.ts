import styled from 'styled-components'

import { UnderlinedTitle as _UnderlinedTitle } from '@/components/UnderlinedTitle'

export const UnderlinedTitle = styled(_UnderlinedTitle).attrs({ as: 'span' })`
  font-size: 16px;
  font-weight: 700;

  ::after {
    height: 4px;
    bottom: 2px;
  }
`
