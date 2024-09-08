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
} from 'react-icons/ai'
import { getOrcamento, getReminderData } from '@/services/orcamento.service'  // Adicione aqui o serviço para lembrete
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
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)

  // Adicionar estado para o lembrete
  const [reminder, setReminder] = useState<string | null>(null)

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const budgetData = await getOrcamento(token)

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

    // Função para verificar lembretes
    const checkReminder = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const reminderData = await getReminderData(token)

        // Exemplo de verificação de lembrete
        if (reminderData && reminderData.timeLeft <= 24 * 60 * 60 * 1000) {  // 24 horas em milissegundos
          setReminder(`Lembrete: Pagar ${reminderData.gasto} em 24 horas.`)
        } else {
          setReminder(null)
        }
      } catch (error) {
        console.error('Erro ao verificar lembretes:', error)
      }
    }

    // Verificação periódica de lembrete a cada minuto
    const reminderInterval = setInterval(() => {
      checkReminder()
    }, 60000)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(reminderInterval)
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

  const handleSpending = () => {
    setIsExpenseModalOpen(true) // Abre o modal de despesas
  }

  const handleReminder = () => {
    router.push('/reminder')
  }

  const handleReport = () => {
    // Função de exportar PDF
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['Saldo Atual', 'Limite de Gastos', 'Meta de Gastos']],
      body: [[balance || 'Não registrado', expensesLimit || 'Não registrado', spendingGoal || 'Não registrado']],
    })
    doc.save('orcamento.pdf')
  }

  const handleLogOff = () => {
    router.push('/')
  }

  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false)
  }

  const handleRegisterExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica de registro de despesa vai aqui (integração com o backend)
    handleCloseExpenseModal()
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
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
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
          Meta de Gastos:{' '}
          {spendingGoal === null || spendingGoal === undefined
            ? 'Não registrado ainda'
            : `R$ ${spendingGoal}`}
        </p>

        {limitExceeded && (
          <p className="mt-4 text-lg text-red-600 font-semibold">
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
          <span>Gastos</span>
        </button>
        {/* <button
          onClick={handleSpending}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-700"
        >
          <AiOutlineDollarCircle className="text-xl" />
          <span>Despesas</span>
        </button> */}
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

      {/* Modal de Despesas */}
      {/* {isExpenseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Registrar Despesas
            </h2>
            <form onSubmit={handleRegisterExpense}>
              <div className="mb-4">
                <label
                  htmlFor="expenseAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor da Despesa <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseAmount"
                  name="expenseAmount"
                  type="number"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expenseDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data da Despesa <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseDate"
                  name="expenseDate"
                  type="date"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expenseCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Categoria <span className="text-red-500">*</span>
                </label>
                <select
                  id="expenseCategory"
                  name="expenseCategory"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="transporte">Transporte</option>
                  <option value="lazer">Lazer</option>
                  <option value="moradia">Moradia</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseExpenseModal}
                  className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Confirmar Despesa
                </button>
              </div>
            </form>
          </div>
        </div> */}
      {/* )} */}
    </div>
  )
}

export default HomePage
