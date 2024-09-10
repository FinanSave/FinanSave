import { getUserIdByToken } from '@/utils/getUserIdByToken'
import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

export interface MovimentacaoInterface {
  nome: string
  categoria: string
  valor: number
  dataMovimentacao: string
  querSerLembrado?: boolean
  recorrente?: boolean
  mensagem?: string
}

export async function registrarGasto(
  nome: string,
  categoria: string,
  userId: string,
  valor: number,
  querSerLembrado: boolean,
  recorrente = false,
  mensagem = '',
) {
  const requestData = {
    nome,
    categoria,
    userId,
    valor,
    querSerLembrado,
    recorrente,
    mensagem,
  }

  try {
    await backendAPI.post('movimentacao/criar/gasto/', requestData)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao registrar gasto >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}

export async function registrarEntrada(
  entryData: MovimentacaoInterface,
  token: string,
) {
  const requestData = {
    nome: entryData.nome,
    categoria: entryData.categoria,
    user_id: getUserIdByToken(token),
    valor: entryData.valor,
    data_movimentacao: entryData.dataMovimentacao,
    quer_ser_lembrado: entryData.querSerLembrado,
    recorrente: entryData.recorrente,
    mensagem: entryData.mensagem,
  }

  try {
    await backendAPI.post('movimentacao/criar/entrada/', requestData)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao registrar entrada >>', error.response?.data.error)
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}

export async function buscarMovimentacoes() {
  try {
    const response = await backendAPI.get('movimentacao/buscar/')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar movimentações >>', error)
    return []
  }
}

export async function buscarMovimentacaoTipo(tipo: string, token: string) {
  const userId = getUserIdByToken(token)

  try {
    const response = await backendAPI.get(
      `movimentacao/buscar/tipo/${tipo}/${userId}/`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar movimentações por tipo >>', error)
    return []
  }
}

export async function buscarMovimentacaoOrcamentoId(orcamentoId: string) {
  try {
    const response = await backendAPI.get(
      `movimentacao/buscar/orcamento_id/${orcamentoId}/`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar movimentações por orçamento ID >>', error)
    return []
  }
}

export async function buscarMovimentacaoCategoria(categoria: string) {
  try {
    const response = await backendAPI.get(
      `movimentacao/buscar/categoria/${categoria}/`,
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar movimentações por categoria >>', error)
    return []
  }
}

export async function buscarMovimentacaoRecorrente(recorrente: boolean) {
  try {
    const response = await backendAPI.get(
      `movimentacao/buscar/recorrente/${recorrente}/`,
    )
    return response.data
  } catch (error) {
    console.error(
      'Erro ao buscar movimentações por status recorrente >>',
      error,
    )
    return []
  }
}

export async function atualizarMovimentacao(
  id: number,
  nome: string,
  categoria: string,
  orcamentoId: string,
  tipo: string,
  valor: number,
  data: string,
  querSerLembrado: boolean,
  recorrente: boolean,
) {
  const requestData = {
    nome,
    categoria,
    orcamentoId,
    tipo,
    valor,
    data,
    querSerLembrado,
    recorrente,
  }

  try {
    await backendAPI.put(`movimentacao/atualizar/${id}/`, requestData)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Erro ao atualizar movimentação >>',
        error.response?.data.error,
      )
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}

export async function deletarMovimentacao(id: number) {
  try {
    await backendAPI.delete(`movimentacao/deletar/${id}/`)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Erro ao deletar movimentação >>',
        error.response?.data.error,
      )
    } else {
      console.error('Erro inesperado >>', String(error))
    }
    return false
  }
}
