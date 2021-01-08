import * as yup from 'yup'

import { Input } from '@/components/Input'
import { BoxLayout } from '@/components/BoxLayout'
import { Form } from '@/components/Form'

import * as s from './styles'
import { FormSubmitButton } from '@/components/FormSubmitButton'

type Inputs = { username: string; password: string }

async function handleSubmit(inputs: Inputs) {
  console.log(inputs)
}

const schema = yup.object().shape({
  username: yup.string().required('This field is required').max(20, 'Invalid username'),
  password: yup.string().required('This field is required').min(6, 'Invalid password')
})

export const SignIn = () => {
  return (
    <BoxLayout title="Sign in" subtitle="Start chatting now!">
      <s.Content>
        <s.MessageBalloonIcon src="assets/message-balloon.svg" />

        <Form onSubmit={handleSubmit} schema={schema}>
          <Input label="Username" name="username" isRequired />
          <Input label="Password" name="password" type="password" isRequired />
          <FormSubmitButton>Start chatting now</FormSubmitButton>
        </Form>
      </s.Content>
    </BoxLayout>
  )
}
