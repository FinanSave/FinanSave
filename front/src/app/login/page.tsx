'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { userLogin } from '../../services/user.service'
import Header from '@/components/Header'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    login: '',
    senha: '',
  })

  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('authToken')
  }, [])

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
        router.push('/home')
      } else {
        setError('Login ou senha inválidos')
      }
    } catch (err) {
      setError('Erro ao tentar fazer login. Por favor, tente novamente.')
    }
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-200">
      <Header className="mb-0.5"></Header>

      <div className="flex w-full flex-1 items-center justify-center bg-gray-200">
        {/* Main Content */}
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
          <div className="mt-4 text-center">
            <button
              onClick={handleRegister}
              className="w-full rounded bg-gray-200 px-4 py-2 font-bold text-blue-700 hover:bg-gray-300 focus:outline-none"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
