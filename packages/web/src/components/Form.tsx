import { CSSProperties, ReactNode, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'

import { FormLoadingContext } from '@/contexts'

type Props = {
  onSubmit: (inputs: any) => Promise<void> | void
  schema: ObjectSchema<Record<string, any> | undefined, Record<string, any>>
  disableLoading?: boolean
  defaultValues?: Record<string, any>
  style?: CSSProperties
  children: ReactNode
}

export const Form = ({
  onSubmit,
  schema,
  disableLoading,
  defaultValues,
  style,
  children
}: Props) => {
  const [loading, setLoading] = useState(false)

  const formMethods = useForm({ resolver: yupResolver(schema), mode: 'onBlur', defaultValues })

  async function onSubmitWrapper(inputs: any) {
    if (!disableLoading) {
      if (loading) return

      setLoading(true)

      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    await onSubmit(inputs)

    if (!disableLoading) {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <FormLoadingContext.Provider value={loading}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmitWrapper)}
          style={{ width: '100%', ...style }}
        >
          {children}
        </form>
      </FormLoadingContext.Provider>
    </FormProvider>
  )
}
