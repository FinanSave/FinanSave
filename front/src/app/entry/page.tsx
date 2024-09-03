'use client'

import React, { useState, useEffect } from 'react'
import {
  AiOutlinePlusCircle,
  AiOutlineCalendar,
  AiOutlineDelete,
} from 'react-icons/ai'

import Header from '@/components/Header'
import BackHomeButton from '@/components/BackHomeButton'
import useAuth from '@/middlewares/auth'

const EntryPage = () => {
  useAuth()

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [entries, setEntries] = useState<string[]>([]) // Armazena as entradas recuperadas do backend
  const [selectedEntry, setSelectedEntry] = useState<string>('')
  const [entryAmount, setEntryAmount] = useState<string>('')
  const [entryDate, setEntryDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const categories = ['Salário', 'Freelance', 'Investimentos', 'Outros'] // Exemplo de lista de categorias

  useEffect(() => {
    // Simulação de busca das entradas do backend (deve ser substituído pela chamada real ao backend)
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await fetch('/api/entries').then((res) =>
          res.json(),
        )

        setEntries(fetchedEntries) // Assume que o backend retorna um array de strings com os IDs ou nomes das entradas
      } catch (error) {
        console.error('Erro ao buscar entradas:', error)
        setEntries([]) // Em caso de erro, define as entradas como uma lista vazia
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
    setEntryAmount('')
    setEntryDate('')
    setCategory('')
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

  const handleScheduleEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validação do valor da entrada (Extensão 2a)
    const amount = parseFloat(entryAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para a entrada.')
      return
    }

    // Validação da data da entrada (Extensões 3a e 3b)
    const selectedDate = new Date(entryDate)
    const currentDate = new Date()
    if (selectedDate <= currentDate) {
      alert(
        'A data é para hoje ou no passado. A entrada será registrada agora.',
      )
      // Tratar como registro imediato da entrada, integrando com o backend
    } else {
      alert('A data é futura. A entrada será agendada.')
      // Tratar como agendamento da entrada, integrando com o backend
    }

    // Registro da entrada com base na data e valor (Aqui deve ser integrado com o backend)
    console.log('Agendando/Registrando entrada:', {
      amount,
      entryDate,
      category,
    })

    // Fechar modal e resetar formulário
    handleCloseScheduleModal()
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
          onClick={handleOpenScheduleModal}
          className="flex transform items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
        >
          <AiOutlineCalendar className="text-xl" />
          <span>Agendar Entradas</span>
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

      {/* Modal para Agendar Entradas */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Agendar Entradas
            </h2>
            {/* Conteúdo do Modal */}
            <form onSubmit={handleScheduleEntry}>
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
                  onClick={handleCloseScheduleModal}
                  className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
                      <option key={entry} value={entry}>
                        {entry}
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
    </div>
  )
}

export default EntryPage
