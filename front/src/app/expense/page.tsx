'use client'

import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai'
import Header from '@/components/Header'
import useAuth from '@/middlewares/auth'
import {
  buscarMovimentacaoTipo,
  deletarMovimentacao,
  registrarGasto,
} from '@/services/movimentacao.service'
import BackHomeButton from '@/components/BackHomeButton'

const ExpensePage = () => {
  useAuth()

  interface Expense {
    id: number
    nome: string
    categoria: string
    orcamento_id: number
    tipo: string
    valor: string
    data_movimentacao: string
    quer_ser_lembrado: boolean
    recorrente: boolean
    mensagem: string
  }

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<number>()
  const [name, setName] = useState<string>('')
  const [expenseAmount, setExpenseAmount] = useState<string>('')
  const [expenseDate, setExpenseDate] = useState<string>('')
  const [reminder, setReminder] = useState<boolean>(false)
  const [recurrent, setRecurrent] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const categories = ['Transporte', 'Comida', 'Roupas', 'Lazer', 'Outros']

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('authToken') || ''
      const entries = await buscarMovimentacaoTipo('Saida', token)

      setExpenses(entries)
    } catch (error) {
      console.error('Erro ao buscar entradas:', error)
      setExpenses([])
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false)
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
    setName('')
    setMessage('')
    setReminder(false)
    setRecurrent(false)
  }

  // Função para formatar o valor para "R$xxx,xx"
  const formatCurrency = (value: string) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  // Função para formatar a data para "DD/MM/AAAA"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleRegisterExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validação do valor do gasto (Extensão 2a)
    const amount = parseFloat(expenseAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para o gasto.')
      return
    }

    const token = localStorage.getItem('authToken') || ''

    const expenseData = {
      nome: name,
      categoria: category,
      valor: amount,
      dataMovimentacao: expenseDate,
      querSerLembrado: reminder,
      recorrente: recurrent,
      mensagem: message,
    }

    try {
      const registeredEntry = await registrarGasto(expenseData, token)
      console.log('Entrada registrada:', registeredEntry)

      fetchExpenses()
    } catch (error) {
      console.error('Erro ao registrar entrada:', error)
    }

    // Fechar modal e resetar formulário
    handleCloseRegisterModal()
  }

  const handleRemoveExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedExpense) {
      alert('Por favor, selecione um gasto para remover.')
      return
    }

    try {
      const removedExpense = await deletarMovimentacao(selectedExpense)
      console.log('Removendo entrada:', removedExpense)

      fetchExpenses()
    } catch (error) {
      console.error('Erro ao remover entrada:', error)
    }

    // Fechar modal e resetar seleção
    handleCloseRemoveModal()
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-0.5">
        <h1 className="mx-auto text-center text-3xl font-bold text-blue-700">
          Gerenciar Gastos
        </h1>
        <BackHomeButton />
      </Header>
      <section className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={handleOpenRegisterModal}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-teal-700"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <span>Registrar Gastos</span>
        </button>
        <button
          onClick={handleOpenRemoveModal}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
        >
          <AiOutlineDelete className="text-xl" />
          <span>Remover Gastos</span>
        </button>
      </section>

      {/* Modal para Registrar Gastos */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Registrar Gastos
            </h2>
            <form onSubmit={handleRegisterExpense}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expenseAmount"
                  className="block text-sm font-medium text-gray-700"
                >
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
              <div className="mb-4 flex space-x-6">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="recorrente"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Recorrente
                  </label>
                  <input
                    id="recorrente"
                    name="recorrente"
                    type="checkbox"
                    checked={recurrent}
                    onChange={(e) => setRecurrent(e.target.checked)}
                    className="mt-1 rounded-md border-gray-300"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="querSerLembrado"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quer ser lembrado
                  </label>
                  <input
                    id="querSerLembrado"
                    name="querSerLembrado"
                    type="checkbox"
                    checked={reminder}
                    onChange={(e) => setReminder(e.target.checked)}
                    className="mt-1 rounded-md border-gray-300"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expenseDate"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full resize-none rounded-md border border-gray-300 p-2"
                  rows={4}
                />
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

      {/* Modal para Remover Gastos */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Remover Gastos
            </h2>
            {expenses.length > 0 ? (
              <form onSubmit={handleRemoveExpense}>
                <div className="mb-4">
                  <label
                    htmlFor="expenseId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Selecione o Gasto para Remover{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="expenseId"
                    name="expenseId"
                    value={selectedExpense}
                    onChange={(e) => setSelectedExpense(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="" disabled>
                      Selecione um gasto
                    </option>
                    {expenses.map((expense) => (
                      <option key={expense.id} value={expense.id}>
                        {expense.nome} - {formatCurrency(expense.valor)}
                      </option>
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
                <p className="text-gray-700">
                  Nenhum gasto disponível para remover.
                </p>
                <div className="mt-4 flex justify-end space-x-4">
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

      <div>
        <h1 className="mx-auto mt-12 text-center text-2xl font-bold text-blue-700">
          Entradas
        </h1>
        {expenses.length > 0 ? (
          <table border={1} cellPadding="10" cellSpacing="1">
            <thead>
              <tr className="text-slate-800">
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Data da Movimentação</th>
                <th>Valor</th>
                <th>Quer ser lembrado</th>
                <th>Recorrente</th>
                <th>Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  className="mx-auto text-center text-slate-800"
                  key={expense.id}
                >
                  <td>{expense.id}</td>
                  <td>{expense.nome}</td>
                  <td>{expense.categoria}</td>
                  <td>{formatDate(expense.data_movimentacao)}</td>
                  <td>{formatCurrency(expense.valor)}</td>
                  <td>{expense.quer_ser_lembrado ? 'Sim' : 'Não'}</td>
                  <td>{expense.recorrente ? 'Sim' : 'Não'}</td>
                  <td>{expense.mensagem || 'Sem mensagem'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma movimentação encontrada</p>
        )}
      </div>
    </div>
  )
}

export default ExpensePage
