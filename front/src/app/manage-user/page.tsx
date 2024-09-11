'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import BackHomeButton from '@/components/BackHomeButton'
import { Contact, KeyRound, Mail } from 'lucide-react'
import { getUserData, userDelete, userUpdate } from '@/services/user.service'
import useAuth from '@/middlewares/auth'

const ManageUserPage = () => {
  useAuth()
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [primeiroNome, setPrimeiroNome] = useState<string>('')
  const [sobrenome, setSobrenome] = useState<string>('')
  const [nomeUsuario, setNomeUsuario] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [emailForm, setEmailForm] = useState<string>('')

  const resetForm = () => {
    setPrimeiroNome('')
    setSobrenome('')
    setNomeUsuario('')
    setSenha('')
    setEmailForm('')
  }

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken') || ''

    try {
      const userData = await getUserData(token)

      if (userData) {
        setName(userData.nome)
        setLogin(userData.login)
        setEmail(userData.email)
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userToUpdate = {
      primeiroNome,
      sobrenome,
      login: nomeUsuario,
      email: emailForm,
      senha,
    }

    const token = localStorage.getItem('authToken') || ''

    const orcamentoEditado = await userUpdate(
      token,
      userToUpdate.primeiroNome,
      userToUpdate.sobrenome,
      userToUpdate.login,
      userToUpdate.email,
      userToUpdate.senha,
    )

    console.log(orcamentoEditado)

    resetForm()
    fetchUserData()
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Tem certeza que deseja deletar sua conta?')) {
      const token = localStorage.getItem('authToken') || ''

      try {
        const usuarioDeletado = await userDelete(token)
        console.log(usuarioDeletado)

        localStorage.removeItem('authToken')
        router.push('/')
      } catch (error) {
        console.error('Erro ao deletar conta:', error)
      }
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
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-8">
        <section className="mb-8 w-auto max-w-4xl rounded-lg bg-blue-300 p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900">Seus dados</h2>
          <p className="mt-4 flex text-lg text-gray-800">
            <Contact className="mr-1" /> Nome: {name}
          </p>
          <p className="mt-2 flex text-lg text-gray-800">
            <KeyRound className="mr-1.5" />
            Login: {login}
          </p>
          <p className="mt-2 flex text-lg text-gray-800">
            <Mail className="mr-1.5" />
            Email: {email}
          </p>
        </section>

        {/* Formulário de gerenciamento de usuário */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md"
        >
          <div>
            <label
              htmlFor="primeiroNome"
              className="block text-sm font-medium text-gray-700"
            >
              Primeiro nome
            </label>
            <input
              id="primeiroNome"
              name="primeiroNome"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={primeiroNome}
              onChange={(e) => setPrimeiroNome(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="sobrenome"
              className="block text-sm font-medium text-gray-700"
            >
              Sobrenome
            </label>
            <input
              id="sobrenome"
              name="sobrenome"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="nomeUsuario"
              className="block text-sm font-medium text-gray-700"
            >
              Nome de usuário
            </label>
            <input
              id="nomeUsuario"
              name="nomeUsuario"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
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
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
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
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              value={emailForm}
              onChange={(e) => setEmailForm(e.target.value)}
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
