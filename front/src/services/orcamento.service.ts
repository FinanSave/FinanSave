import { getUserIdByToken } from '@/utils/getUserIdByToken'
import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}` + '/orcamento/'

const backendAPI = axios.create({
  baseURL: backendURL,
})

interface OrcamentoFormData {
  saldo: string
  limite: string
  metaEconomia: string
}

export async function criarOrcamento(
  token: string,
  formData: OrcamentoFormData,
) {
  const userId = getUserIdByToken(token)

  try {
    const requestData = {
      user_id: userId,
      saldo: Number(formData.saldo),
      limite_gastos: Number(formData.limite),
      meta_economia: Number(formData.metaEconomia),
    }

    const orcamentoCriado = await backendAPI.post('criar/', requestData)
    return orcamentoCriado
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao criar orçamento >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}

export async function getOrcamento(token: string) {
  const userId = getUserIdByToken(token)

  try {
    const response = await backendAPI.get(`buscar/${userId}/`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao buscar orçamento >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return null
  }
}

export async function editarOrcamento(
  token: string,
  formData: OrcamentoFormData,
) {
  const userId = getUserIdByToken(token)

  try {
    const requestData = {
      saldo: Number(formData.saldo),
      limite_gastos: Number(formData.limite),
      meta_economia: Number(formData.metaEconomia),
    }

    const orcamentoEditado = await backendAPI.put(
      `atualizar/${userId}/`,
      requestData,
    )
    return orcamentoEditado
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao editar orçamento >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}
