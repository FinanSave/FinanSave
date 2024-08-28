import axios from 'axios'

const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const backendAPI = axios.create({
  baseURL: backendURL,
})

export async function registrarGasto(nome: string, categoria: string, user_id: string, valor: number, quer_ser_lembrado: boolean, recorrente = false, mensagem = '') {
    const requestData = {
      nome,
      categoria,
      user_id,
      valor,
      quer_ser_lembrado,
      recorrente,
      mensagem
    };
  
    try {
      await backendAPI.post('movimentacao/criar/gasto/', requestData);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao registrar gasto >>', error.response?.data.error);
      } else {
        console.error('Erro inesperado >>', String(error));
      }
      return false;
    }
  }
  
  export async function registrarEntrada(nome: string, categoria: string, user_id: string, valor: number, quer_ser_lembrado: boolean, recorrente: boolean, mensagem = '') {
    const requestData = {
      nome,
      categoria,
      user_id,
      valor,
      quer_ser_lembrado,
      recorrente,
      mensagem
    };
  
    try {
      await backendAPI.post('movimentacao/criar/entrada/', requestData);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao registrar entrada >>', error.response?.data.error);
      } else {
        console.error('Erro inesperado >>', String(error));
      }
      return false;
    }
  }
  
  export async function buscarMovimentacoes() {
    try {
      const response = await backendAPI.get('movimentacao/buscar/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações >>', error);
      return [];
    }
  }

  export async function buscarMovimentacaoTipo(tipo: string) {
    try {
      const response = await backendAPI.get(`movimentacao/buscar/tipo/${tipo}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações por tipo >>', error);
      return [];
    }
  }
  
  export async function buscarMovimentacaoOrcamentoId(orcamentoId: string) {
    try {
      const response = await backendAPI.get(`movimentacao/buscar/orcamento_id/${orcamentoId}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações por orçamento ID >>', error);
      return [];
    }
  }
  
  export async function buscarMovimentacaoCategoria(categoria: string) {
    try {
      const response = await backendAPI.get(`movimentacao/buscar/categoria/${categoria}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações por categoria >>', error);
      return [];
    }
  }

  export async function buscarMovimentacaoRecorrente(recorrente: boolean) {
    try {
      const response = await backendAPI.get(`movimentacao/buscar/recorrente/${recorrente}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar movimentações por status recorrente >>', error);
      return [];
    }
  }
  
  export async function atualizarMovimentacao(id: number, nome: string, categoria: string, orcamento_id: string, tipo: string, valor: number, data: string, quer_ser_lembrado: boolean, recorrente: boolean) {
    const requestData = {
        nome,
        categoria,
        orcamento_id,
        tipo,
        valor,
        data,
        quer_ser_lembrado,
        recorrente
    };
  
    try {
      await backendAPI.put(`movimentacao/atualizar/${id}/`, requestData);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao atualizar movimentação >>', error.response?.data.error);
      } else {
        console.error('Erro inesperado >>', String(error));
      }
      return false;
    }
  }
  
  export async function deletarMovimentacao(id: number) {
    try {
      await backendAPI.delete(`movimentacao/deletar/${id}/`);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao deletar movimentação >>', error.response?.data.error);
      } else {
        console.error('Erro inesperado >>', String(error));
      }
      return false;
    }
  }