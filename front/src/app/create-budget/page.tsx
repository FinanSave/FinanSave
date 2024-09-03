'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import BackHomeButton from '@/components/BackHomeButton'
import Header from '@/components/Header'
import useAuth from '@/middlewares/auth'
import { criarOrcamento } from '@/services/orcamento.service'

const CreateBudgetPage = () => {
  useAuth()

  const [formData, setFormData] = useState({
    saldo: '',
    limite: '',
    metaEconomia: '',
  })

  const [errors, setErrors] = useState({
    saldoError: '',
    limiteError: '',
    metaEconomiaError: '',
  })
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [hasBudget, setHasBudget] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verifica se já existe um orçamento no localStorage
    const budgetExists = localStorage.getItem('hasBudget')
    if (budgetExists) {
      setHasBudget(true)
    }
  }, [])

  const formatCurrency = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    const numericValue = parseFloat(cleanedValue) / 100
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }
    return ''
  }

  const convertToNumber = (formattedValue: string) => {
    const numericValue = parseFloat(
      formattedValue.replace(/[R$.\s]/g, '').replace(',', '.'),
    )
    return isNaN(numericValue) ? 0 : numericValue
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = formatCurrency(value)

    setFormData({
      ...formData,
      [name]: formattedValue,
    })
  }

  const validateForm = () => {
    let valid = true
    let saldoError = ''
    let limiteError = ''
    let metaEconomiaError = ''

    // Verificação do saldo
    if (
      isNaN(convertToNumber(formData.saldo)) ||
      convertToNumber(formData.saldo) < 0
    ) {
      saldoError = 'O saldo deve ser um número não negativo.'
      valid = false
    }

    // Verificação do limite
    if (formData.limite && isNaN(convertToNumber(formData.limite))) {
      limiteError = 'O limite deve ser um número.'
      valid = false
    }

    // Verificação da meta de economia
    if (
      formData.metaEconomia &&
      isNaN(convertToNumber(formData.metaEconomia))
    ) {
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

    const adjustedFormData = {
      ...formData,
      limite: formData.limite === '' ? '0' : formData.limite,
      metaEconomia: formData.metaEconomia === '' ? '0' : formData.metaEconomia,
    }

    setFormData(adjustedFormData)

    if (validateForm()) {
      setIsConfirmationVisible(true)
    }
  }

  const handleConfirm = async () => {
    const dataToSubmit = {
      saldo: convertToNumber(formData.saldo).toString(),
      limite: convertToNumber(formData.limite).toString(),
      metaEconomia: convertToNumber(formData.metaEconomia).toString(),
    }

    if (hasBudget) {
      alert('Você já criou um orçamento. Não é possível criar outro.')
      return
    }

    console.log('Dados do orçamento:', dataToSubmit)
    const token = localStorage.getItem('authToken') || ''

    const orcamentoCriado = await criarOrcamento(token, dataToSubmit)

    console.log(orcamentoCriado)

    localStorage.setItem('hasBudget', 'true')

    router.push('/home')
  }

  const handleCancel = () => {
    setIsConfirmationVisible(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Header className="mb-0.5">
        <BackHomeButton />
      </Header>

      <div className="flex w-full flex-1 items-center justify-center bg-transparent">
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-center text-4xl font-extrabold text-transparent">
            Criar Orçamento
          </h1>
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
                <p className="mt-1 text-sm text-red-500">{errors.saldoError}</p>
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

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>

      {isConfirmationVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Confirmar Orçamento
            </h2>
            <p className="mb-4 text-gray-700">
              Saldo Inicial: R$ {formData.saldo}
            </p>
            <p className="mb-4 text-gray-700">
              Limite de Gastos: R$ {formData.limite || '0'}
            </p>
            <p className="mb-4 text-gray-700">
              Meta de Economia: R$ {formData.metaEconomia || '0'}
            </p>
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

export default CreateBudgetPage
