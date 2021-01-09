import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useFormContext, UseFormMethods } from 'react-hook-form'

type FormMethodsGetterProps = {
  setFormMethods: Dispatch<SetStateAction<UseFormMethods<any> | null>>
}

/** Useful for getting form methods in a component that is outside form context. */
export const FormMethodsGetter: FC<FormMethodsGetterProps> = ({
  setFormMethods
}: FormMethodsGetterProps) => {
  const formContext = useFormContext()

  useEffect(() => {
    setFormMethods(formContext)
  }, [])

  return <></>
}
