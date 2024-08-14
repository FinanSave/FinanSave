'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateLogin = () => {
    // Simulação de validação. O back-end deve realizar a validação real.
    if (
      formData.username !== 'usuarioValido' ||
      formData.password !== 'senhaValida'
    ) {
      setError('Usuário ou senha inválidos')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateLogin()) {
      // Lógica para redirecionar após login bem-sucedido
      console.log('Login bem-sucedido')
      router.push('/dashboard') // Exemplo de redirecionamento
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Fazer login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nome de usuário ou e-mail
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.password}
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
          <a href="/register" className="text-blue-700 hover:underline">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
