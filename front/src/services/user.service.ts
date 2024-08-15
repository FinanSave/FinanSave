import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

export async function userLogin(login: string, senha: string) {
  const requestData = {
    login,
    senha,
  }

  try {
    const response = await backendAPI.post('/login/', requestData)
    const token = response.data.token

    return token
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao fazer login >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }

    return null
  }
}

export async function userRegister(
  firstName: string,
  lastName: string,
  login: string,
  email: string,
  senha: string,
) {
  const requestData = {
    nome: firstName + ' ' + lastName,
    login,
    email,
    senha,
  }

  try {
    await backendAPI.post('user/cadastrar/', requestData)
    return true
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao fazer registro >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }

    return false
  }
}
