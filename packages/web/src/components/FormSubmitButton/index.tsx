import { ReactNode, useContext } from 'react'

import { FormLoadingContext } from '@/contexts'

import * as s from './styles'

type Props = { children: ReactNode }

export const FormSubmitButton = ({ children }: Props) => {
  const loading = useContext(FormLoadingContext)

  return (
    <s.Button loading={loading}>
      {!loading && children}
      {loading && <s.LoadingCircle src="assets/loading.svg" />}
    </s.Button>
  )
}
