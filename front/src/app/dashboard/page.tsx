'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import BackHomeButton from '@/components/BackHomeButton'

import { getUserIdByToken } from '@/utils/getUserIdByToken'
import { getGraficosRelatorios } from '@/services/relatorio.service'

const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro')
  const [imagens, setImagens] = useState<{
    barras?: string
    linhas?: string
    pizza?: string
  }>({})
  const [totalGastos, setTotalGastos] = useState<number>(0)
  const [totalEntradas, setTotalEntradas] = useState<number>(0)

  // Referências para os gráficos
  const barChartRef = useRef<HTMLImageElement>(null)
  const lineChartRef = useRef<HTMLImageElement>(null)
  const pieChartRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken') || ''

      const requestData = {
        user_id: Number(getUserIdByToken(token)),
        mes: selectedMonth,
      }

      try {
        const totais = await getGraficosRelatorios(requestData)

        console.log('Totais >>', totais)

        setImagens(totais.imagens)
        setTotalGastos(totais.total_gastos)
        setTotalEntradas(totais.total_entradas)
      } catch (error) {
        console.error('Erro ao buscar os dados do dashboard:', error)
      }
    }

    fetchData()
  }, [selectedMonth])

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value)
  }

  const exportPDF = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    autoTable(doc, {
      head: [['Total de Gastos', 'Total de Entradas']],
      body: [[`R$ ${totalGastos}`, `R$ ${totalEntradas}`]],
    })

    // Verifique se as imagens estão disponíveis e adicione ao PDF
    if (
      barChartRef.current?.src &&
      lineChartRef.current?.src &&
      pieChartRef.current?.src
    ) {
      doc.addImage(barChartRef.current.src, 'PNG', 10, 60, 180, 80)
      doc.addPage()
      doc.addImage(lineChartRef.current.src, 'PNG', 10, 10, 180, 80)
      doc.addPage()
      doc.addImage(pieChartRef.current.src, 'PNG', 50, 30, 100, 100)
    } else {
      console.error('As imagens não foram carregadas corretamente.')
    }

    doc.save('dashboard.pdf')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header className="flex w-full items-center justify-between bg-gray-200 px-8 py-4">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <BackHomeButton />
      </Header>

      <div className="my-4 ml-8 flex justify-start">
        <label htmlFor="month" className="mr-2 flex items-center text-lg">
          Mês:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="rounded-md border border-gray-300 p-2"
        >
          <option value="Janeiro">Janeiro</option>
          <option value="Fevereiro">Fevereiro</option>
          <option value="Março">Março</option>
          <option value="Abril">Abril</option>
          <option value="Maio">Maio</option>
          <option value="Junho">Junho</option>
          <option value="Julho">Julho</option>
          <option value="Agosto">Agosto</option>
          <option value="Setembro">Setembro</option>
          <option value="Outubro">Outubro</option>
          <option value="Novembro">Novembro</option>
          <option value="Dezembro">Dezembro</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Total de Gastos
          </h2>
          <p className="mt-2 text-3xl text-red-600">{`R$ ${totalGastos}`}</p>
        </div>
        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Total de Entradas
          </h2>
          <p className="mt-2 text-3xl text-green-600">{`R$ ${totalEntradas}`}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Gastos - Movimentações por Categoria
          </h2>
          <img src={imagens?.barras} alt="Movimentações por Categoria" />
        </div>

        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Comparação de Gastos (Mês Atual vs Mês Anterior)
          </h2>
          <img src={imagens?.linhas} alt="Comparação de Gastos" />
        </div>

        <div className="rounded-md bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Porcentagem de Movimentações
          </h2>
          <img src={imagens?.pizza} alt="Porcentagem de Movimentações" />
        </div>
      </div>

      <div className="mt-8 flex justify-center pb-8">
        <button
          onClick={exportPDF}
          className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
