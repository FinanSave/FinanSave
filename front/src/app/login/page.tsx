'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { userLogin } from '../../services/user.service'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    senha: '',
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('') // Resetar o erro antes de tentar o login

    try {
      const token = await userLogin(formData.login, formData.senha)
      if (token) {
        localStorage.setItem('authToken', token) // Armazena o token no localStorage
        console.log('Login realizado com sucesso')
        router.push('/homepage') // Redireciona para o dashboard
      } else {
        setError('Login ou senha inválidos')
      }
    } catch (err) {
      setError('Erro ao tentar fazer login. Por favor, tente novamente.')
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Fazer login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-700"
            >
              Nome de usuário ou e-mail
            </label>
            <input
              id="login"
              name="login"
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.login}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Entrar
          </button>
        </form>
        <button
          onClick={handleRegister}
          className="mt-4 w-full rounded bg-blue-300 px-4 py-2 text-gray-700 hover:bg-blue-400"
        >
          Criar conta
        </button>
        <button
          onClick={handleBack}
          className="mt-4 w-full rounded bg-blue-300 px-4 py-2 text-gray-700 hover:bg-blue-400"
        >
          &larr; Voltar para a página principal
        </button>
      </div>
    </div>
  )
}

export default LoginPage
