'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/middlewares/auth'
import {
  AiOutlineLineChart,
  AiOutlineEdit,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineDollarCircle,
  AiOutlineBell,
  AiOutlineFileText,
} from 'react-icons/ai' // Removi o AiOutlinePlusCircle
import { getOrcamento } from '@/services/orcamento.service'

const HomePage = () => {
  const router = useRouter()
  useAuth()

  // Estados para armazenar os dados do orçamento
  const [balance, setBalance] = useState<number | null>(null)
  const [expensesLimit, setExpensesLimit] = useState<number | null>(null)
  const [spendingGoal, setSpendingGoal] = useState<number | null>(null)

  useEffect(() => {
    // Simulação de busca dos dados do backend
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const budgetData = await getOrcamento(token)

        console.log('Dados do orçamento:', budgetData)

        setBalance(budgetData.saldo)
        setExpensesLimit(budgetData.limite_gastos)
        setSpendingGoal(budgetData.meta_economia)
      } catch (error) {
        console.error('Erro ao buscar os dados do orçamento:', error)
      }
    }

    fetchBudgetData()
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
    router.push('/expense')
  }

  const handleSpending = () => {
    router.push('/spending')
  }

  const handleReminder = () => {
    router.push('/reminder')
  }

  const handleReport = () => {
    router.push('/report')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-8">
      <header className="mb-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-700">
          👋 Bem-vindo ao Finansave
        </h1>
      </header>

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
          Meta de Gastos:{' '}
          {spendingGoal === null || spendingGoal === undefined
            ? 'Não registrado ainda'
            : `R$ ${spendingGoal}`}
        </p>
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
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
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
          <span>Gasto</span>
        </button>
        <button
          onClick={handleSpending}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-700"
        >
          <AiOutlineDollarCircle className="text-xl" />
          <span>Despesa</span>
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
          <span>Relatório</span>
        </button>
      </section>
    </div>
  )
}

export default HomePage
