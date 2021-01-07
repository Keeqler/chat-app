import * as yup from 'yup'

export const MessageValidators = {
  index: {
    query: yup.object().shape({
      with: yup.number().required().min(0)
    })
  }
}
