"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <header className="w-full bg-gray-200 py-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img
              src="/FS-symbol-LP.png"
              alt="Finansave Logo"
              className="h-14"
            />
            <span className="text-4xl font-bold ml-3">
              Finan<span className="text-blue-700">Save</span>
            </span>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={handleRegister}
              className="text-gray-700 font-semibold hover:underline py-2"
            >
              Criar conta
            </button>
            <a
              href="/login"
              className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Fazer login
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-start mt-8 px-4 text-left w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">
          Gerencie suas finanças de forma fácil e eficiente
        </h1>
        <p className="text-3xl font-bold">
          com nosso site intuitivo
        </p>
        <p className="text-lg mt-4 max-w-xl">
          Nossa plataforma completa para você com Controle de Gastos, 
          Planejamento de Orçamento e Relatórios Personalizados
        </p>
        <div className="flex justify-start space-x-12 mt-12">
          <div className="text-center">
            <div className="bg-gray-300 h-48 w-48 rounded-md mb-4"></div>
            <h2 className="text-xl font-bold">Promoções</h2>
          </div>
          <div className="text-center">
            <div className="bg-gray-300 h-48 w-48 rounded-md mb-4"></div>
            <h2 className="text-xl font-bold">Benefícios</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
