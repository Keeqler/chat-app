import * as yup from 'yup'

export const UserValidators = {
  store: {
    body: yup.object().shape({
      username: yup.string().required().max(20),
      password: yup.string().required().min(6).max(40)
    })
  },
  index: {
    query: yup.object().shape({
      query: yup.string().required().max(20)
    })
  }
}
