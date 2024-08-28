import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

export interface Movimentacao {
    d?: number; // ????????
    nome: string
    categoria: 'Transporte' | 'Comida' | 'Roupas' | 'Lazer' | 'Outros'
    valor: number        // Usando number para refletir o tipo DecimalField
    quer_ser_lembrado: boolean
    recorrente: boolean
    created_at?: string
    updated_at?: string
  }
  
export async function criarLembrete(movimentacao: Movimentacao, mensagem: string) {
    const requestData = {
      movimentacao,
      mensagem,
    }
  
    try {
      await backendAPI.post('lembrete/cadastrar/', requestData)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao criar lembrete >>', error.response?.data.error)
      } else {
        console.error('Erro inesperado >>', String(error))
      }
      return false
    }
  }
  
  export async function buscarLembretes() {
    try {
      const response = await backendAPI.get('lembrete/')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar lembretes >>', error)
      return []
    }
  }
  
  export async function atualizarLembrete(movimentacao: Movimentacao, mensagem: string) {
    const requestData = {
      mensagem,
    }
  
    try {
      await backendAPI.put(`lembrete/atualizar/${movimentacao}/`, requestData)
      return true
    } catch (error) {
      console.error('Erro ao atualizar lembrete >>', error)
      return false
    }
  }
  
  export async function deletarLembrete(movimentacao: Movimentacao) {
    try {
      await backendAPI.delete(`lembrete/deletar/${movimentacao}/`)
      return true
    } catch (error) {
      console.error('Erro ao deletar lembrete >>', error)
      return false
    }
  }
  