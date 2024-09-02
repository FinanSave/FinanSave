'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/middlewares/auth'
import { AiOutlineLineChart, AiOutlineEdit, AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineBell, AiOutlineFileText, AiOutlineDollarCircle } from 'react-icons/ai'

const HomePage = () => {
  const router = useRouter()
  useAuth()

  // Estados para armazenar os dados do orçamento
  const [balance, setBalance] = useState<number | null>(null)
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null)
  const [spendingGoal, setSpendingGoal] = useState<number | null>(null)

  useEffect(() => {
    // Simulação de busca dos dados do backend
    const fetchBudgetData = async () => {
      try {
        const budgetData = await fetch('/api/budget').then(res => res.json())

        setBalance(budgetData.balance)
        setTotalExpenses(budgetData.totalExpenses)
        setSpendingGoal(budgetData.spendingGoal)
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
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-blue-700">👋 Bem-vindo ao Finansave</h1>
      </header>

      <section className="w-full max-w-4xl mb-8 p-6 bg-yellow-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Seu Orçamento</h2>
        <p className="mt-4 text-lg text-gray-800">
          Saldo Atual: {balance !== null ? `R$ ${balance}` : 'Não registrado ainda'}
        </p>
        <p className="mt-2 text-lg text-gray-800">
          Valor Total de Gastos: {totalExpenses !== null ? `R$ ${totalExpenses}` : 'Não registrado ainda'}
        </p>
        <p className="mt-2 text-lg text-gray-800">
          Meta de Gastos: {spendingGoal !== null ? `R$ ${spendingGoal}` : 'Não registrado ainda'}
        </p>
      </section>

      <section className="w-full max-w-4xl mb-8 p-6 bg-white rounded-lg shadow-lg flex items-center">
        <AiOutlineLineChart className="text-blue-600 text-4xl mr-4" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Sobre o Finansave</h2>
          <p className="mt-2 text-gray-600">
            Nossa plataforma completa para você com Controle de Gastos, Planejamento de Orçamento e Relatórios Personalizados.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleCreateBudget}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineEdit className="text-xl" />
          <span>Criar Orçamento</span>
        </button>
        <button
          onClick={handleEditBudgets}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineEdit className="text-xl" />
          <span>Editar Orçamentos</span>
        </button>
        <button
          onClick={handleEntry}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <span>Entrada</span>
        </button>
        <button
          onClick={handleExpense}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineMinusCircle className="text-xl" />
          <span>Gasto</span>
        </button>
        <button
          onClick={handleSpending}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:bg-orange-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineDollarCircle className="text-xl" />
          <span>Despesa</span>
        </button>
        <button
          onClick={handleReminder}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineBell className="text-xl" />
          <span>Lembrete</span>
        </button>
        <button
          onClick={handleReport}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineFileText className="text-xl" />
          <span>Relatório</span>
        </button>
      </section>
    </div>
  )
}

export default HomePage
