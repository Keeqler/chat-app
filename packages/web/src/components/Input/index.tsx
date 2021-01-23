import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import * as s from './styles'

type Props = {
  icon?: string
  isTextArea?: boolean
  validationState?: 'neutral' | 'valid' | 'invalid'
} & (
  | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  | DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
)

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, icon, isTextArea, validationState, ...props }: Props, ref) => {
    const InputComponent = isTextArea ? s.TextAreaInput : s.Input

    return (
      <s.Container>
        <InputComponent
          placeholder="."
          validationState={validationState}
          hasIcon={!!icon}
          ref={ref}
          {...(props as any)}
        />

        <s.Placeholder>
          {icon && <s.Icon src={icon} />} <s.PlaceholderText>{placeholder}</s.PlaceholderText>
        </s.Placeholder>
      </s.Container>
    )
  }
)

Input.displayName = 'Input'
