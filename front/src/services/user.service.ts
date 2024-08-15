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

  console.log('Backend URL:', backendURL)
  console.log('Request data:', requestData)

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
