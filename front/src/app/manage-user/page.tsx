'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BackHomeButton from '@/components/BackHomeButton'

const ManageUserPage = () => {
  const router = useRouter()

  // Estados para armazenar os dados do usuário
  const [formData, setFormData] = useState({
    primeiroNome: '',
    sobrenome: '',
    nomeUsuario: '',
    senha: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica para enviar os dados editados ao backend
    console.log('Dados do usuário atualizados:', formData)
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta?')) {
      // Lógica para deletar a conta
      console.log('Conta deletada')
    }
  }

  return (
    <>
      {/* Header */}
      <Header>
        <h1 className="mx-auto text-center text-3xl font-bold text-blue-700">
          Gerenciar Usuário
        </h1>
        <BackHomeButton />
      </Header>

      {/* Container principal */}
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-8">
        
        {/* Formulário de gerenciamento de usuário */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white p-6 shadow-md rounded-lg mt-4">
          <div>
            <label htmlFor="primeiroNome" className="block text-sm font-medium text-gray-700">
              Primeiro nome
            </label>
            <input
              id="primeiroNome"
              name="primeiroNome"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={formData.primeiroNome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">
              Sobrenome
            </label>
            <input
              id="sobrenome"
              name="sobrenome"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={formData.sobrenome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
              Nome de usuário
            </label>
            <input
              id="nomeUsuario"
              name="nomeUsuario"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={formData.nomeUsuario}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Atualizar Dados
          </button>
        </form>

        {/* Botão de deletar conta */}
        <button
          onClick={handleDeleteAccount}
          className="mt-6 w-full max-w-md rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Deletar Conta
        </button>
      </div>
    </>
  )
}

export default ManageUserPage
