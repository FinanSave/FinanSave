'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { AiOutlineGift, AiOutlineDollarCircle } from 'react-icons/ai'

const IndexPage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // Limpa o token de autenticação, se houver
    localStorage.removeItem('authToken')
  }, [])

  const handleRegister = () => {
    router.push('/register')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <Header>
        <div className="flex space-x-4">
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
        </div>
      </Header>

      {/* Main Content */}
      <main className="mx-auto mt-16 flex w-full max-w-7xl flex-col items-center px-4 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Gerencie suas finanças de forma fácil e eficiente
        </h1>
        <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          com nosso site intuitivo
        </p>
        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          Nossa plataforma completa para você com Controle de Gastos,
          Planejamento de Orçamento e Relatórios Personalizados.
        </p>
        <div className="mt-12 flex justify-center space-x-12">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center h-48 w-48 rounded-full bg-blue-600 text-white">
              <AiOutlineGift className="text-6xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Promoções</h2>
          </div>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center h-48 w-48 rounded-full bg-green-600 text-white">
              <AiOutlineDollarCircle className="text-6xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Benefícios</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IndexPage
