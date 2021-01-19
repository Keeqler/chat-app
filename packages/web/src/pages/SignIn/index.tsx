import { useState } from 'react'
import { UseFormMethods } from 'react-hook-form'
import * as yup from 'yup'
import jwt from 'jsonwebtoken'

import { FormInput } from '@/components/FormInput'
import { BoxLayout } from '@/components/BoxLayout'
import { Form } from '@/components/Form'
import { FormSubmitButton } from '@/components/FormSubmitButton'
import { FormMethodsGetter } from '@/components/FormMethodsGetter'
import { api } from '@/services/api'
import { User } from '@/types'
import { showErrorToast, showSuccessToast } from '@/toasts'
import { useAuth } from '@/store/auth'

import * as s from './styles'

type Inputs = { username: string; password: string }
type SuccessResponse = { jwt: string }

const schema = yup.object().shape({
  username: yup.string().required('This field is required').max(40, 'Invalid username'),
  password: yup.string().required('This field is required').min(6, 'Invalid password')
})

export const SignInPage = () => {
  const [formMethods, setFormMethods] = useState<UseFormMethods<Inputs> | null>(null)
  const signIn = useAuth(state => state.signIn)

  async function handleSubmit(inputs: Inputs) {
    if (!formMethods) return

    try {
      const response = await api.post<SuccessResponse>('/users/auth', inputs)

      const token = response.data.jwt
      const decodedToken = jwt.decode(token) as User

      signIn(token, decodedToken)
      showSuccessToast('You have successfully signed in!')
    } catch (error) {
      const errorCode = error?.response?.data?.error as string | undefined

      if (errorCode && errorCode === 'INVALID_CREDENTIALS') {
        formMethods.setError('username', {
          message: 'Invalid username or password.',
          shouldFocus: true
        })

        formMethods.setError('password', {
          message: 'Invalid username or password.'
        })

        return
      }

      showErrorToast('Sorry, something went wrong.')
    }
  }

  return (
    <BoxLayout title="Sign in" subtitle="Start chatting now!">
      <s.Content>
        <s.MessageBalloonIcon src="assets/message-balloon.svg" />

        <Form onSubmit={handleSubmit} schema={schema}>
          <FormMethodsGetter setFormMethods={setFormMethods} />

          <FormInput label="Username" name="username" isRequired />
          <FormInput label="Password" name="password" type="password" isRequired />
          <FormSubmitButton>Start chatting now</FormSubmitButton>
        </Form>
      </s.Content>
    </BoxLayout>
  )
}
