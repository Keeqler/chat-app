import { toast } from 'react-toastify'

import { Toast } from '@/components/Toast'

export const showSuccessToast = (description: string) =>
  toast(
    <Toast
      borderColor="#5fdfa3"
      icon="assets/success.svg"
      title="Success"
      description={description}
    />
  )

export const showErrorToast = (description: string) =>
  toast(
    <Toast borderColor="#ff8484" icon="assets/error.svg" title="Error" description={description} />
  )
