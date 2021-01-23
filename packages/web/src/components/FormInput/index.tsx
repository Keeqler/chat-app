import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputLabel } from '@/components/InputLabel'

import { Input } from '../Input'
import * as s from './styles'

type Props = {
  name: string
  label?: string
  icon?: string
  errorDisplayDisabled?: boolean
  isRequired?: boolean
  isTextArea?: boolean
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const FormInput = ({
  name,
  placeholder,
  label,
  icon,
  errorDisplayDisabled,
  isRequired,
  isTextArea,
  style,
  ...props
}: Props) => {
  const { register, errors, formState } = useFormContext()

  const valueIsValid = !errors[name]
  const fieldIsTouched = formState.touched[name]
  let validationState: 'neutral' | 'valid' | 'invalid'

  if (errorDisplayDisabled) {
    validationState = 'neutral'
  } else if (valueIsValid && fieldIsTouched) {
    validationState = 'valid'
  } else if (!valueIsValid) {
    validationState = 'invalid'
  } else {
    validationState = 'neutral'
  }

  return (
    <s.Field style={style}>
      {!!label && (
        <InputLabel>
          {label} {isRequired && <span style={{ color: '#FF8484' }}>*</span>}
        </InputLabel>
      )}

      <Input
        name={name}
        placeholder={placeholder}
        icon={icon}
        validationState={validationState}
        isTextArea={isTextArea}
        ref={register}
        {...(props as any)}
      />

      {!errorDisplayDisabled && !!errors[name] && (
        <s.ErrorMessage>{errors[name].message}</s.ErrorMessage>
      )}
    </s.Field>
  )
}
