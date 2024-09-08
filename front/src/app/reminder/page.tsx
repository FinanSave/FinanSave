'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/middlewares/auth'
import { AiOutlineBell } from 'react-icons/ai'
import { getGastos, getReminderData } from '@/services/gastos.service'
import { LogOut } from 'lucide-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '@/components/Header'

const ReminderPage: React.FC = () => {
  const router = useRouter()
  useAuth()

  // Estados para armazenar os dados de gastos e seleção
  const [gastos, setGastos] = useState<string[]>([])
  const [selectedGasto, setSelectedGasto] = useState<string>('')

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const gastosData = await getGastos(token)

        if (gastosData.length > 0) {
          setGastos(gastosData)
        } else {
          setGastos([])
        }
      } catch (error) {
        console.error('Erro ao buscar os gastos:', error)
        setGastos([])
      }
    }

    fetchGastos()

    // Verificação periódica de lembrete
    const reminderInterval = setInterval(() => {
      checkReminder()
    }, 60000) // Verifica a cada minuto

    return () => clearInterval(reminderInterval)
  }, [])

  const checkReminder = async () => {
    const token = localStorage.getItem('authToken') || ''
    try {
      const reminderData = await getReminderData(token)

      // Exemplo: se o lembrete estiver a menos de 24 horas de distância
      if (reminderData && reminderData.timeLeft <= 24 * 60 * 60 * 1000) {
        toast.info(`Lembrete de pagamento do gasto: ${reminderData.gasto}`, {
          position: "top-right",
          autoClose: 4000,
        })
      }
    } catch (error) {
      console.error('Erro ao verificar lembrete:', error)
    }
  }

  const handleLogOff = () => {
    router.push('/')
  }

  const handleGastoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGasto(e.target.value)
  }

  const handleSetReminder = () => {
    if (selectedGasto) {
      // Enviar a solicitação ao BACKEND para configurar o lembrete
      alert(`Lembrete configurado para o gasto: ${selectedGasto}`)
    } else {
      alert('Por favor, selecione um gasto.')
    }
  }

  const handleGoBack = () => {
    router.back()
  }


  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-4">
        <h1 className="text-3xl font-bold text-blue-700 text-center mx-auto">Gerenciar Lembrete de Gastos</h1>
        <button
          onClick={handleGoBack}
          className="flex space-x-1 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Voltar
        </button>
      </Header>
      <section className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-md">
        {gastos.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Selecione um Gasto para Configurar o Lembrete
            </h2>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedGasto}
              onChange={handleGastoChange}
            >
              <option value="" disabled>
                Escolha um gasto
              </option>
              {gastos.map((gasto, index) => (
                <option key={index} value={gasto}>
                  {gasto}
                </option>
              ))}
            </select>
            <button
              onClick={handleSetReminder}
              className="mt-4 flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
            >
              <AiOutlineBell className="text-xl mr-2" />
              <span>Configurar Lembrete</span>
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-700">
            Nenhum gasto registrado. Por favor, registre um gasto antes de configurar um lembrete.
          </p>
        )}
      </section>
    </div>
  )
}

export default ReminderPage
