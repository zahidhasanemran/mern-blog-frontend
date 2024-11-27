import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { loginFunc } from '../../../services/auth.services'

export type LoginInputs = {
  email: string
  password: string
}

export const useLogin = () => {
  const loginSubmit = async (data) => {
    try {
      const res = await loginFunc(data)
      console.log(res)
      toast.success(res?.data?.data?.message)
      return res
    } catch (error) {
      console.log(error)
      toast.warn(error?.response?.data?.message)
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginSubmit(data)
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  }
}
