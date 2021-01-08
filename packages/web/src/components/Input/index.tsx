import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputLabel } from '@/components/InputLabel'

import * as s from './styles'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  label: string
  isRequired?: boolean
  isTextArea?: boolean
}

export const Input = ({ name, label, isRequired, isTextArea, ...props }: Props) => {
  const { register, errors, formState } = useFormContext()

  const valueIsValid = !errors[name]
  const fieldIsTouched = formState.touched[name]
  let validationState: 'neutral' | 'valid' | 'invalid'

  if (valueIsValid && fieldIsTouched) {
    validationState = 'valid'
  } else if (!valueIsValid) {
    validationState = 'invalid'
  } else {
    validationState = 'neutral'
  }

  return (
    <s.Field>
      <InputLabel>
        {label} {isRequired && <span style={{ color: '#FF8484' }}>*</span>}
      </InputLabel>

      <s.Input
        ref={register}
        type={isTextArea ? 'textarea' : 'text'}
        name={name}
        placeholder=""
        validationState={validationState}
        {...(props as any)}
      />

      {!!errors[name] && <s.ErrorMessage>{errors[name].message}</s.ErrorMessage>}
    </s.Field>
  )
}
