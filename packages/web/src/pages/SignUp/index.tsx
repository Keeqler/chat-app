import { useState } from 'react'
import * as yup from 'yup'

import { BoxLayout } from '@/components/BoxLayout'
import { Input } from '@/components/Input'
import { StandardButton } from '@/components/Button'
import { Form } from '@/components/Form'

import { ImageInput } from './components/ImageInput'
import * as s from './styles'

type Inputs = { username: string; password: string; passwordConfirmation: string }

const schema = yup.object().shape<Inputs>({
  username: yup
    .string()
    .required('This field is required')
    .max(20, 'Username must be shorter or equal to 20 characters'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, 'Password must be longer or equal to 6 characters'),
  passwordConfirmation: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), ''], 'Password confirmation does not match your password')
})

export const SignUp = () => {
  const [image, setImage] = useState<File | null>(null)

  async function handleSubmit() {
    //
  }

  return (
    <BoxLayout title="Sign up" subtitle="Start chatting now!">
      <Form onSubmit={handleSubmit} schema={schema}>
        <s.FormInner>
          <ImageInput image={image} setImage={setImage} />

          <s.Bottom>
            <Input label="Username" name="username" isRequired />
            <Input label="Password" name="password" type="password" isRequired />
            <Input
              label="Password confirmation"
              name="passwordConfirmation"
              type="password"
              isRequired
            />
            <StandardButton style={{ marginTop: 40 }}>Start chatting now</StandardButton>
          </s.Bottom>
        </s.FormInner>
      </Form>
    </BoxLayout>
  )
}
