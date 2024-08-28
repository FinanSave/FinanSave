'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('authToken')
  }, [])

  const handleRegister = () => {
    router.push('/register')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Header */}
      <Header>
        <button
          onClick={handleRegister}
          className="py-2 font-semibold text-gray-700 hover:underline"
        >
          Criar conta
        </button>
        <button
          onClick={handleLogin}
          className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Fazer login
        </button>
      </Header>

      {/* Main Content */}
      <main className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-start px-4 text-left">
        <h1 className="text-3xl font-bold">
          Gerencie suas finanças de forma fácil e eficiente
        </h1>
        <p className="text-3xl font-bold">com nosso site intuitivo</p>
        <p className="mt-4 max-w-xl text-lg">
          Nossa plataforma completa para você com Controle de Gastos,
          Planejamento de Orçamento e Relatórios Personalizados
        </p>
        <div className="mt-12 flex justify-start space-x-12">
          <div className="text-center">
            <div className="mb-4 h-48 w-48 rounded-md bg-gray-300"></div>
            <h2 className="text-xl font-bold">Promoções</h2>
          </div>
          <div className="text-center">
            <div className="mb-4 h-48 w-48 rounded-md bg-gray-300"></div>
            <h2 className="text-xl font-bold">Benefícios</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IndexPage
