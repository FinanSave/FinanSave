'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const router = useRouter()

  const handleCreateBudget = () => {
    router.push('/create-budget') // Página de criação de orçamento
  }

  const handleEditBudgets = () => {
    router.push('/edit-budgets') // Página de edição de orçamentos
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Finansave</h1>
      <p className="text-lg text-gray-700 mb-8">Aqui é onde você pode gerenciar suas atividades.</p>
      <div className="flex space-x-4">
        <button
          onClick={handleCreateBudget}
          className="rounded bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Criar Orçamento
        </button>
        <button
          onClick={handleEditBudgets}
          className="rounded bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
        >
          Editar Orçamentos
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
