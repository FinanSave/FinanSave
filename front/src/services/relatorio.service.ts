import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

export interface Orcamento {
    id?: number; // ????????
    saldo: number;
    limite_gastos: number;
    meta_economia: number;
    created_at?: string;
    updated_at?: string;
  }
  

export async function criarRelatorio(orcamento: Orcamento) {
    const requestData = {
      orcamento,
    }
  
    try {
      await backendAPI.post('relatorio/cadastrar/', requestData)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao criar relatório >>', error.response?.data.error)
      } else {
        console.error('Erro inesperado >>', String(error))
      }
      return false
    }
  }
  
  export async function buscarRelatorios() {
    try {
      const response = await backendAPI.get('relatorio/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar relatórios >>', error)
      return []
    }
  }
  
  export async function atualizarRelatorio(orcamento: Orcamento) {
    const requestData = {
      orcamento,
    }
  
    try {
      await backendAPI.put(`relatorio/atualizar/${orcamento}/`, requestData)
      return true
    } catch (error) {
      console.error('Erro ao atualizar relatório >>', error)
      return false
    }
  }
  
  export async function deletarRelatorio(orcamento: Orcamento) {
    try {
      await backendAPI.delete(`relatorio/deletar/${orcamento}/`)
      return true
    } catch (error) {
      console.error('Erro ao deletar relatório >>', error)
      return false
    }
  }
  