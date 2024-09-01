'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

const EditBudgetPage = () => {
  const [budgets, setBudgets] = useState<string[]>([]) // Armazena a lista de orçamentos
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null) // Armazena o orçamento selecionado
  const [formData, setFormData] = useState({
    saldo: '',
    limite: '',
    metaEconomia: '',
    categorias: [{ nome: '', valor: '' }],
  })
  const [errors, setErrors] = useState({
    saldoError: '',
    limiteError: '',
    metaEconomiaError: '',
  })
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Busca os orçamentos já criados no backend
    const fetchBudgets = async () => {
      try {
        // Aqui o pessoal do backend implementará a chamada para buscar os orçamentos
        const storedBudgets = await fetch('/api/budgets') // Exemplo de endpoint
          .then(response => response.json())
          .then(data => data.budgets || []);

        setBudgets(storedBudgets)
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error)
      }
    }

    fetchBudgets()
  }, [])

  const handleBudgetSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setSelectedBudget(selected)
    
    // Aqui você carregaria os dados do orçamento selecionado do backend
    fetch(`/api/budget/${selectedBudget}`) // Exemplo de endpoint
      .then(response => response.json())
      .then(data => {
        setFormData({
          saldo: data.saldo || '',
          limite: data.limite || '',
          metaEconomia: data.metaEconomia || '',
          categorias: data.categorias || [{ nome: '', valor: '' }],
        })
      })
      .catch(error => console.error('Erro ao carregar orçamento:', error))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target
    if (name.startsWith('categoria') && index !== undefined) {
      const updatedCategorias = [...formData.categorias]
      updatedCategorias[index][name.replace('categoria', '')] = value
      setFormData({ ...formData, categorias: updatedCategorias })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const validateForm = () => {
    let valid = true
    let saldoError = ''
    let limiteError = ''
    let metaEconomiaError = ''

    // Verificação do saldo
    if (isNaN(Number(formData.saldo)) || Number(formData.saldo) < 0) {
      saldoError = 'O saldo deve ser um número não negativo.'
      valid = false
    }

    // Verificação do limite
    if (formData.limite && isNaN(Number(formData.limite))) {
      limiteError = 'O limite deve ser um número.'
      valid = false
    }

    // Verificação da meta de economia
    if (formData.metaEconomia && isNaN(Number(formData.metaEconomia))) {
      metaEconomiaError = 'A meta de economia deve ser um número.'
      valid = false
    }

    setErrors({
      saldoError,
      limiteError,
      metaEconomiaError,
    })

    return valid
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setIsConfirmationVisible(true)
    }
  }

  const handleConfirm = () => {
    // Aqui você pode enviar os dados para o backend ou realizar qualquer ação necessária
    console.log('Dados do orçamento editado:', formData)
    router.push('/home')
  }

  const handleCancel = () => {
    setIsConfirmationVisible(false)
  }

  const handleGoBack = () => {
    router.push('/home')
  }

  const addCategoria = () => {
    setFormData({
      ...formData,
      categorias: [...formData.categorias, { nome: '', valor: '' }],
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-0.5">
        <button
          onClick={handleGoBack}
          className="flex space-x-1 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Voltar
        </button>
      </Header>

      <div className="flex w-full flex-1 items-center justify-center bg-transparent">
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Editar Orçamento
          </h1>
          {budgets.length > 0 ? (
            <div>
              <label
                htmlFor="selectBudget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Selecione um orçamento <span className="text-red-500">*</span>
              </label>
              <select
                id="selectBudget"
                className="w-full mb-6 rounded-md border border-gray-300 p-2"
                value={selectedBudget || ''}
                onChange={handleBudgetSelection}
              >
                <option value="" disabled>
                  -- Escolha um orçamento --
                </option>
                {budgets.map((budget, index) => (
                  <option key={index} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
              {selectedBudget && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="saldo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Saldo Inicial <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="saldo"
                      name="saldo"
                      type="text"
                      required
                      className="mt-1 w-full rounded-md border border-gray-300 p-2"
                      value={formData.saldo}
                      onChange={handleChange}
                    />
                    {errors.saldoError && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.saldoError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="limite"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Limite de Gastos
                    </label>
                    <input
                      id="limite"
                      name="limite"
                      type="text"
                      placeholder="Opcional"
                      className="mt-1 w-full rounded-md border border-gray-300 p-2"
                      value={formData.limite}
                      onChange={handleChange}
                    />
                    {errors.limiteError && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.limiteError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="metaEconomia"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Meta de Economia
                    </label>
                    <input
                      id="metaEconomia"
                      name="metaEconomia"
                      type="text"
                      placeholder="Opcional"
                      className="mt-1 w-full rounded-md border border-gray-300 p-2"
                      value={formData.metaEconomia}
                      onChange={handleChange}
                    />
                    {errors.metaEconomiaError && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.metaEconomiaError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Limites por Categoria 
                    </label>
                    {formData.categorias.map((categoria, index) => (
                      <div
                        key={index}
                        className="mt-2 flex items-center space-x-4"
                      >
                        <input
                          name={`categoriaNome${index}`}
                          type="text"
                          placeholder="Nome da Categoria (Opcional)"
                          className="w-full rounded-md border border-gray-300 p-2"
                          value={categoria.nome}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <input
                          name={`categoriaValor${index}`}
                          type="text"
                          placeholder="Limite (Opcional)"
                          className="w-full rounded-md border border-gray-300 p-2"
                          value={categoria.valor}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addCategoria}
                      className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <span className="text-xl">+</span>{' '}
                      <span className="ml-1">Adicionar Categoria</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Confirmar Edição
                  </button>
                </form>
              )}
            </div>
          ) : (
            <p className="text-center text-xl font-semibold text-red-500">
              Nenhum orçamento encontrado. Crie um novo orçamento primeiro.
            </p>
          )}
        </div>
      </div>

      {isConfirmationVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Confirmar Edição de Orçamento
            </h2>
            <p className="mb-4 text-gray-700">Saldo Inicial: R$ {formData.saldo}</p>
            <p className="mb-4 text-gray-700">
              Limite de Gastos: R$ {formData.limite || '0'}
            </p>
            <p className="mb-4 text-gray-700">
              Meta de Economia: R$ {formData.metaEconomia || '0'}
            </p>
            {formData.categorias.map((categoria, index) => (
              <p key={index} className="mb-4 text-gray-700">
                Categoria {categoria.nome}: R$ {categoria.valor || '0'}
              </p>
            ))}
            <div className="flex space-x-4">
              <button
                onClick={handleConfirm}
                className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancel}
                className="w-full rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditBudgetPage
