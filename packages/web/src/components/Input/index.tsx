import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react'

import * as s from './styles'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder?: string
  icon?: string
  name?: string
  validationState?: 'neutral' | 'valid' | 'invalid'
  isRequired?: boolean
  isTextArea?: boolean
  inputRef?: RefObject<HTMLInputElement>
}

export const Input = ({
  placeholder,
  icon,
  name,
  isTextArea,
  validationState,
  inputRef,
  ...props
}: Props) => (
  <s.Container>
    <s.Input
      name={name}
      type={isTextArea ? 'textarea' : 'text'}
      placeholder="."
      validationState={validationState}
      ref={inputRef}
      {...(props as any)}
    />

    <s.Placeholder>
      {icon && <s.Icon src={icon} />} {placeholder}
    </s.Placeholder>
  </s.Container>
)
