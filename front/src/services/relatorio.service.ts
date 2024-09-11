import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

interface Grafico {
  user_id: number
  mes: string
}

export async function getGraficosRelatorios(requestData: Grafico) {
  try {
    const response = await backendAPI.post('/relatorio/criar/', requestData)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao buscar gráficos >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }

    return null
  }
}
