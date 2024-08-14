'use client'

import React, { useState } from 'react'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    isAdult: false,
  })

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    emailError: '',
    isAdultError: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const validateForm = () => {
    let valid = true
    let usernameError = ''
    let passwordError = ''
    let emailError = ''
    let isAdultError = ''

    // Validação do nome de usuário (simulado)
    if (formData.username === 'existente') {
      usernameError = 'Nome de usuário já existente, escolha outro'
      valid = false
    }

    // Validação da senha
    if (formData.password.length < 5) {
      passwordError = 'Digite uma senha com no mínimo 5 caracteres'
      valid = false
    }

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      emailError = 'Digite um e-mail válido'
      valid = false
    }

    // Validação da checkbox de maioridade
    if (!formData.isAdult) {
      isAdultError = 'Você precisa confirmar que tem mais de 18 anos'
      valid = false
    }

    setErrors({
      usernameError,
      passwordError,
      emailError,
      isAdultError,
    })

    return valid
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      // Lógica para enviar o formulário ao backend
      console.log('Formulário enviado:', formData)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">Criar conta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Primeiro nome
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Sobrenome
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nome de usuário
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
            {errors.usernameError && (
              <p className="mt-1 text-sm text-red-500">
                {errors.usernameError}
              </p>
            )}
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
            {errors.passwordError && (
              <p className="mt-1 text-sm text-red-500">
                {errors.passwordError}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.emailError && (
              <p className="mt-1 text-sm text-red-500">{errors.emailError}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="isAdult"
              name="isAdult"
              type="checkbox"
              required
              className="mr-2"
              checked={formData.isAdult}
              onChange={handleChange}
            />
            <label
              htmlFor="isAdult"
              className="block text-sm font-medium text-gray-700"
            >
              Ao clicar, você confirma que tem mais de 18 anos
            </label>
          </div>
          {errors.isAdultError && (
            <p className="mt-1 text-sm text-red-500">{errors.isAdultError}</p>
          )}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
