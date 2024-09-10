'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/middlewares/auth'
import {
  AiOutlineLineChart,
  AiOutlineEdit,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineBell,
  AiOutlineFileText,
} from 'react-icons/ai'
import { getOrcamento } from '@/services/orcamento.service'
import { LogOut } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const HomePage = () => {
  const router = useRouter()
  useAuth()

  // Estados para armazenar os dados do orçamento
  const [balance, setBalance] = useState<number | null>(null)
  const [expensesLimit, setExpensesLimit] = useState<number | null>(null)
  const [spendingGoal, setSpendingGoal] = useState<number | null>(null)
  const [limitExceeded, setLimitExceeded] = useState<boolean>(false)
  const [haveBudget, setHaveBudget] = useState<boolean>(false)

  // Adicionar estado para o lembrete
  const [reminder, setReminder] = useState<string | null>(null)

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const budgetData = await getOrcamento(token)

        setHaveBudget(true)

        setBalance(budgetData?.saldo || null)
        setExpensesLimit(budgetData?.limite_gastos || null)
        setSpendingGoal(budgetData?.meta_economia || null)

        if (budgetData && budgetData.limite_gastos > budgetData.saldo) {
          setLimitExceeded(true)
        } else {
          setLimitExceeded(false)
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do orçamento:', error)
      }
    }

    fetchBudgetData()

    // // Função para verificar lembretes
    // const checkReminder = async () => {
    //   try {
    //     const token = localStorage.getItem('authToken') || ''
    //     const reminderData = await getReminderData(token)

    //     // Exemplo de verificação de lembrete
    //     if (reminderData && reminderData.timeLeft <= 24 * 60 * 60 * 1000) {
    //       // 24 horas em milissegundos
    //       setReminder(`Lembrete: Pagar ${reminderData.gasto} em 24 horas.`)
    //     } else {
    //       setReminder(null)
    //     }
    //   } catch (error) {
    //     console.error('Erro ao verificar lembretes:', error)
    //   }
    // }

    // // Verificação periódica de lembrete a cada minuto
    // const reminderInterval = setInterval(() => {
    //   checkReminder()
    // }, 60000)

    // // Limpar o intervalo quando o componente for desmontado
    // return () => clearInterval(reminderInterval)
  }, [])

  const handleCreateBudget = () => {
    router.push('/create-budget')
  }

  const handleEditBudgets = () => {
    router.push('/edit-budgets')
  }

  const handleEntry = () => {
    router.push('/entry')
  }

  const handleExpense = () => {
    router.push('/expense') // Leva para a tela de gastos
  }

  const handleReminder = () => {
    router.push('/reminder')
  }

  const handleReport = () => {
    // Função de exportar PDF
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['Saldo Atual', 'Limite de Gastos', 'Meta de Economia']],
      body: [
        [
          balance || 'Não registrado',
          expensesLimit || 'Não registrado',
          spendingGoal || 'Não registrado',
        ],
      ],
    })
    doc.save('orcamento.pdf')
  }

  const handleLogOff = () => {
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-8">
      <div className="mb-8 flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-700">
          👋 Bem-vindo ao Finansave
        </h1>
        <button
          onClick={handleLogOff}
          className="flex space-x-1 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          <LogOut /> <span>Logout</span>
        </button>
      </div>

      {/* Exibe lembrete, se houver */}
      {reminder && (
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-yellow-800">
          {reminder}
        </div>
      )}

      <section className="mb-8 w-full max-w-4xl rounded-lg bg-yellow-300 p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Seu Orçamento</h2>
        <p className="mt-4 text-lg text-gray-800">
          Saldo Atual:{' '}
          {balance === null || balance === undefined
            ? 'Não registrado ainda'
            : `R$ ${balance}`}
        </p>
        <p className="mt-2 text-lg text-gray-800">
          Limite de gastos:{' '}
          {expensesLimit === null || expensesLimit === undefined
            ? 'Não registrado ainda'
            : `R$ ${expensesLimit}`}
        </p>
        <p className="mt-2 text-lg text-gray-800">
          Meta de Economia:{' '}
          {spendingGoal === null || spendingGoal === undefined
            ? 'Não registrado ainda'
            : `R$ ${spendingGoal}`}
        </p>

        {limitExceeded && (
          <p className="mt-4 text-lg font-semibold text-red-600">
            Atenção: O limite de gastos excede o saldo disponível! Por favor,
            ajuste seu orçamento.
          </p>
        )}
      </section>

      <section className="mb-8 flex w-full max-w-4xl items-center rounded-lg bg-white p-6 shadow-lg">
        <AiOutlineLineChart className="mr-4 text-4xl text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Sobre o Finansave
          </h2>
          <p className="mt-2 text-gray-600">
            Nossa plataforma completa para você com Controle de Gastos,
            Planejamento de Orçamento e Relatórios Personalizados.
          </p>
        </div>
      </section>

      <section className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={handleCreateBudget}
          disabled={haveBudget}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <AiOutlineEdit className="text-xl" />
          <span>Criar Orçamento</span>
        </button>
        <button
          onClick={handleEditBudgets}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-green-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-700"
        >
          <AiOutlineEdit className="text-xl" />
          <span>Editar Orçamentos</span>
        </button>
        <button
          onClick={handleEntry}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-teal-700"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <span>Entrada</span>
        </button>
        <button
          onClick={handleExpense}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
        >
          <AiOutlineMinusCircle className="text-xl" />
          <span>Gastos</span>
        </button>
        <button
          onClick={handleReminder}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-yellow-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-yellow-700"
        >
          <AiOutlineBell className="text-xl" />
          <span>Lembrete</span>
        </button>
        <button
          onClick={handleReport}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-gray-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-700"
        >
          <AiOutlineFileText className="text-xl" />
          <span> Dashboard </span>
        </button>
      </section>
    </div>
  )
}

export default HomePage
