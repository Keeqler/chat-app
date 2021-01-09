import * as yup from 'yup'

export const AuthValidators = {
  store: {
    body: yup.object().shape({
      username: yup.string().required().max(40),
      password: yup.string().required().min(6).max(40)
    })
  }
}
