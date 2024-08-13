"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateLogin = () => {
    // Simulação de validação. O back-end deve realizar a validação real.
    if (formData.username !== 'usuarioValido' || formData.password !== 'senhaValida') {
      setError('Usuário ou senha inválidos');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      // Lógica para redirecionar após login bem-sucedido
      console.log('Login bem-sucedido');
      router.push('/dashboard');  // Exemplo de redirecionamento
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Fazer login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href="/register"
            className="text-blue-700 hover:underline"
          >
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
