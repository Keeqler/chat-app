import * as s from './styles'

type ToastProps = { borderColor: string; icon: string; title: string; description: string }

export const Toast = ({ borderColor, icon, title, description }: ToastProps) => (
  <s.Container style={{ borderLeftColor: borderColor }}>
    <s.Icon src={icon} />

    <s.Content>
      <s.Title>{title}</s.Title>
      <s.Description>{description}</s.Description>
    </s.Content>
  </s.Container>
)
