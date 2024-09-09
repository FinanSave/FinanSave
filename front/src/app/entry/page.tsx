'use client'

import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai'

import Header from '@/components/Header'
import BackHomeButton from '@/components/BackHomeButton'
import useAuth from '@/middlewares/auth'
import { buscarMovimentacaoTipo } from '@/services/movimentacao.service'

const EntryPage = () => {
  useAuth()

  interface Entry {
    id: number
    nome: string
    categoria: string
    orcamento_id: number
    tipo: string
    valor: string
    data_movimentacao: string
    quer_ser_lembrado: boolean
    recorrente: boolean
  }

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [entries, setEntries] = useState<Entry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<string>('')
  const [entryAmount, setEntryAmount] = useState<string>('')
  const [entryDate, setEntryDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const categories = ['Transporte', 'Comida', 'Roupas', 'Lazer', 'Outros']

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('authToken') || ''
        const entries = await buscarMovimentacaoTipo('Entrada', token)
        console.log('Response from API:', entries)

        setEntries(entries)
      } catch (error) {
        console.error('Erro ao buscar entradas:', error)
        setEntries([])
      }
    }

    fetchEntries()
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
    setEntryAmount('')
    setEntryDate('')
    setCategory('')
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

  const handleRegisterEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validação do valor da entrada (Extensão 2a)
    const amount = parseFloat(entryAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para a entrada.')
      return
    }

    // Registro da entrada com base na data e valor (Aqui deve ser integrado com o backend)
    console.log('Registrando entrada:', { amount, entryDate, category })

    // Fechar modal e resetar formulário
    handleCloseRegisterModal()
  }

  const handleRemoveEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedEntry) {
      alert('Por favor, selecione uma entrada para remover.')
      return
    }

    // Remover entrada (Aqui você deve integrar com o backend)
    console.log('Removendo entrada:', selectedEntry)

    // Fechar modal e resetar seleção
    handleCloseRemoveModal()
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-0.5">
        <h1 className="mx-auto text-center text-3xl font-bold text-blue-700">
          Gerenciar Entradas
        </h1>
        <BackHomeButton />
      </Header>

      <section className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {' '}
        {/* Adiciona um margin-top para afastar os modais da header */}
        <button
          onClick={handleOpenRegisterModal}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-teal-700"
        >
          <AiOutlinePlusCircle className="text-xl" />
          <span>Registrar Entradas</span>
        </button>
        <button
          onClick={handleOpenRemoveModal}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
        >
          <AiOutlineDelete className="text-xl" />
          <span>Remover Entradas</span>
        </button>
      </section>

      {/* Modal para Registrar Entradas */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Registrar Entradas
            </h2>
            {/* Conteúdo do Modal */}
            <form onSubmit={handleRegisterEntry}>
              <div className="mb-4">
                <label
                  htmlFor="entryAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor da Entrada <span className="text-red-500">*</span>
                </label>
                <input
                  id="entryAmount"
                  name="entryAmount"
                  type="number"
                  value={entryAmount}
                  onChange={(e) => setEntryAmount(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="entryDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data da Entrada <span className="text-red-500">*</span>
                </label>
                <input
                  id="entryDate"
                  name="entryDate"
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
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
                  Confirmar Entrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Remover Entradas */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Remover Entradas
            </h2>
            {/* Conteúdo do Modal */}
            {entries.length > 0 ? (
              <form onSubmit={handleRemoveEntry}>
                <div className="mb-4">
                  <label
                    htmlFor="entryId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Selecione a Entrada para Remover{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="entryId"
                    name="entryId"
                    value={selectedEntry}
                    onChange={(e) => setSelectedEntry(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    required
                  >
                    <option value="" disabled>
                      Selecione uma entrada
                    </option>
                    {entries.map((entry) => (
                      <option key={entry.id} value={entry.nome}>
                        {entry.nome}
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
                  Nenhuma entrada disponível para remover.
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
        {entries.length > 0 ? (
          <table border={1} cellPadding="10" cellSpacing="1">
            <thead>
              <tr className="text-slate-800">
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Data da Movimentação</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  className="mx-auto text-center text-slate-800"
                  key={entry.id}
                >
                  <td>{entry.id}</td>
                  <td>{entry.nome}</td>
                  <td>{entry.categoria}</td>
                  <td>{formatDate(entry.data_movimentacao)}</td>
                  <td>{formatCurrency(entry.valor)}</td>
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

export default EntryPage
