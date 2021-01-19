import { useState } from 'react'
import { UseFormMethods } from 'react-hook-form'
import * as yup from 'yup'
import jwt from 'jsonwebtoken'

import { BoxLayout } from '@/components/BoxLayout'
import { FormInput } from '@/components/FormInput'
import { Form } from '@/components/Form'
import { FormSubmitButton } from '@/components/FormSubmitButton'
import { FormMethodsGetter } from '@/components/FormMethodsGetter'
import { showErrorToast, showSuccessToast } from '@/toasts'
import { api } from '@/services/api'
import { useAuth } from '@/store/auth'
import { User } from '@/types'

import { ImageInput } from './components/ImageInput'
import * as s from './styles'

type Inputs = { username: string; password: string; passwordConfirmation: string }
type SuccessResponse = { jwt: string }

const schema = yup.object().shape<Inputs>({
  username: yup
    .string()
    .required('This field is required.')
    .max(40, 'Username must be shorter or equal to 40 characters.'),
  password: yup
    .string()
    .required('This field is required.')
    .min(6, 'Password must be longer or equal to 6 characters.'),
  passwordConfirmation: yup
    .string()
    .required('This field is required.')
    .oneOf([yup.ref('password'), ''], 'Password confirmation does not match your password.')
})

export const SignUpPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [formMethods, setFormMethods] = useState<UseFormMethods<Inputs> | null>(null)
  const signIn = useAuth(state => state.signIn)

  async function handleSubmit(inputs: Inputs) {
    if (!formMethods) return

    const formData = new FormData()

    formData.append('username', inputs.username)
    formData.append('password', inputs.password)

    if (image) {
      formData.append('avatar', image)
    }

    try {
      const response = await api.post<SuccessResponse>('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const token = response.data.jwt
      const decodedToken = jwt.decode(token) as User

      signIn(token, decodedToken)
      showSuccessToast('You have successfully signed up!')
    } catch (error) {
      const errorCode = error?.response?.data?.error as string | undefined

      if (errorCode && errorCode === 'USERNAME_TAKEN') {
        formMethods.setError('username', {
          message: 'This username is already taken.',
          shouldFocus: true
        })

        return
      }

      showErrorToast('Sorry, something went wrong.')
    }
  }

  return (
    <BoxLayout title="Sign up" subtitle="Start chatting now!">
      <Form onSubmit={handleSubmit} schema={schema}>
        <FormMethodsGetter setFormMethods={setFormMethods} />

        <s.FormInner>
          <ImageInput image={image} setImage={setImage} />

          <s.Bottom>
            <FormInput label="Username" name="username" isRequired />
            <FormInput label="Password" name="password" type="password" isRequired />
            <FormInput
              label="Password confirmation"
              name="passwordConfirmation"
              type="password"
              isRequired
            />
            <FormSubmitButton>Start chatting now</FormSubmitButton>
          </s.Bottom>
        </s.FormInner>
      </Form>
    </BoxLayout>
  )
}
