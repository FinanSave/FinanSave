// services/gastos.service.ts

export const getGastos = async (token: string) => {
    // Simulação de uma chamada ao backend
    return new Promise<string[]>((resolve, reject) => {
      setTimeout(() => {
        // Simulando uma resposta do backend com alguns gastos
        const gastos = ['Aluguel', 'Luz', 'Água', 'Internet']
        resolve(gastos)
      }, 1000)
    })
  }
  
  export const getReminderData = async (token: string) => {
    // Simulação de uma chamada ao backend para pegar dados de lembrete
    return new Promise<{ gasto: string; timeLeft: number }>((resolve, reject) => {
      setTimeout(() => {
        // Simulação de lembrete com tempo restante de 23 horas
        const reminderData = {
          gasto: 'Aluguel',
          timeLeft: 23 * 60 * 60 * 1000 // 23 horas em milissegundos
        }
        resolve(reminderData)
      }, 1000)
    })
  }
  