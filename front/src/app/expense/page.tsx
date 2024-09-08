'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlinePlusCircle, AiOutlineCalendar, AiOutlineDelete } from 'react-icons/ai'
import Header from '@/components/Header'

const ExpensePage = () => {
  const router = useRouter()
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [expenses, setExpenses] = useState<string[]>([]) // Armazena os gastos recuperados do backend
  const [selectedExpense, setSelectedExpense] = useState<string>('')
  const [expenseAmount, setExpenseAmount] = useState<string>('')
  const [expenseDate, setExpenseDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const categories = ['Aluguel', 'Supermercado', 'Transporte', 'Outros'] // Exemplo de lista de categorias

  useEffect(() => {
    // Simulação de busca dos gastos do backend (foi só pra teste aqui, tem que substituir por uma chamada real ao backend)
    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await fetch('/api/expenses').then(res => res.json())

        setExpenses(fetchedExpenses) // Assume que o backend retorna um array de strings com os IDs ou nomes dos gastos
      } catch (error) {
        console.error('Erro ao buscar gastos:', error)
        setExpenses([]) // Em caso de erro, define os gastos como uma lista vazia
      }
    }

    fetchExpenses()
  }, [])

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false)
    resetForm()
  }

  const handleOpenScheduleModal = () => {
    setIsScheduleModalOpen(true)
  }

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false)
    resetForm()
  }

  const handleOpenRemoveModal = () => {
    setIsRemoveModalOpen(true)
  }

  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false)
  }

  const resetForm = () => {
    setExpenseAmount('')
    setExpenseDate('')
    setCategory('')
  }

  const handleRegisterExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validação do valor do gasto (Extensão 2a)
    const amount = parseFloat(expenseAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para o gasto.')
      return
    }

    // Registro do gasto com base na data e valor (integrar com o backend guys)
    console.log('Registrando gasto:', { amount, expenseDate, category })

    // Fechar modal e resetar formulário
    handleCloseRegisterModal()
  }

  const handleScheduleExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validação do valor do gasto (Extensão 2a)
    const amount = parseFloat(expenseAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para o gasto.')
      return
    }

    // Validação da data do gasto (Extensões 3a e 3b)
    const selectedDate = new Date(expenseDate)
    const currentDate = new Date()
    if (selectedDate > currentDate) {
      alert('A data é futura. O gasto será agendado.')
      // Tratar como agendamento do gasto, integrando com o backend
    } else {
      alert('A data é anterior ou igual à atual. O gasto será registrado agora.')
      // Tratar como registro imediato do gasto, integrando com o backend
    }

    // Registro ou agendamento do gasto com base na data e valor (integrar com o backend)
    console.log('Agendando/Registrando gasto:', { amount, expenseDate, category })

    // Fechar modal e resetar formulário
    handleCloseScheduleModal()
  }

  const handleRemoveExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedExpense) {
      alert('Por favor, selecione um gasto para remover.')
      return
    }

    // Remover gasto (integrar com o backend)
    console.log('Removendo gasto:', selectedExpense)

    // Fechar modal e resetar seleção
    handleCloseRemoveModal()
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-0.5">
        <h1 className="text-3xl font-bold text-blue-700 text-center mx-auto">Gerenciar Gastos</h1>
        <button
          onClick={handleGoBack}
          className="flex space-x-1 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Voltar
        </button>
      </Header>
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        <button
          onClick={handleOpenRegisterModal}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <span>Registrar Gastos</span>
        </button>
        <button
          onClick={handleOpenScheduleModal}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineCalendar className="text-xl" />
          <span>Agendar Gastos</span>
        </button>
        <button
          onClick={handleOpenRemoveModal}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          <AiOutlineDelete className="text-xl" />
          <span>Remover Gastos</span>
        </button>
      </section>

      {/* Modal para Registrar Gastos */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Registrar Gastos</h2>
            <form onSubmit={handleRegisterExpense}>
              <div className="mb-4">
                <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700">
                  Valor do Gasto <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseAmount"
                  name="expenseAmount"
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700">
                  Data do Gasto <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseDate"
                  name="expenseDate"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseRegisterModal}
                  className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
                >
                  Confirmar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Agendar Gastos */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Agendar Gastos</h2>
            <form onSubmit={handleScheduleExpense}>
              <div className="mb-4">
                <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700">
                  Valor do Gasto <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseAmount"
                  name="expenseAmount"
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700">
                  Data do Gasto <span className="text-red-500">*</span>
                </label>
                <input
                  id="expenseDate"
                  name="expenseDate"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseScheduleModal}
                  className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Confirmar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Remover Gastos */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Remover Gastos</h2>
            {expenses.length > 0 ? (
              <form onSubmit={handleRemoveExpense}>
                <div className="mb-4">
                  <label htmlFor="expenseId" className="block text-sm font-medium text-gray-700">
                    Selecione o Gasto para Remover <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="expenseId"
                    name="expenseId"
                    value={selectedExpense}
                    onChange={(e) => setSelectedExpense(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="" disabled>Selecione um gasto</option>
                    {expenses.map((expense) => (
                      <option key={expense} value={expense}>{expense}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseRemoveModal}
                    className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Remover
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-700">Nenhum gasto disponível para remover.</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseRemoveModal}
                    className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpensePage
