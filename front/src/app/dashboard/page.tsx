'use client'

import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import BackHomeButton from '@/components/BackHomeButton'
import { Bar, Line, Pie } from 'react-chartjs-2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const DashboardPage = () => {
  const router = useRouter()

  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro')
  const [totalGastos, setTotalGastos] = useState<number>(0)
  const [totalEntradas, setTotalEntradas] = useState<number>(0)

  const barChartRef = useRef<any>(null)
  const lineChartRef = useRef<any>(null)
  const pieChartRef = useRef<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chamada para o backend para obter os dados de gastos e entradas
        // Exemplo que o GPT me deu: const data = await fetch(`/api/dashboard?month=${selectedMonth}`).then((res) => res.json())
        // Atualizar os estados com os dados reais obtidos do back:
        // setTotalGastos(data.totalGastos)
        // setTotalEntradas(data.totalEntradas)
      } catch (error) {
        console.error('Erro ao buscar os dados do dashboard:', error)
      }
    }

    fetchData()
  }, [selectedMonth])

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value)
  }

  const barData = {
    labels: [], // Backend!! (ex: ['Alimentação', 'Transporte', etc.])
    datasets: [
      {
        label: 'Gastos',
        data: [], // Backend!!
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Entradas',
        data: [], // A ser preenchido pelo backend
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  }

  const lineData = {
    labels: [], //  Backend!!d (ex: ['Semana 1', 'Semana 2', etc.])
    datasets: [
      {
        label: 'Gastos Mês Anterior',
        data: [], //   Backend!!
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Gastos Mês Atual',
        data: [], //   Backend!!
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  }

  const pieData = {
    labels: ['Gastos', 'Entradas'],
    datasets: [
      {
        label: 'Porcentagem de Movimentações',
        data: [totalGastos, totalEntradas], // Backend!!
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    maintainAspectRatio: false,
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [['Total de Gastos', 'Total de Entradas']],
      body: [[`R$ ${totalGastos}`, `R$ ${totalEntradas}`]],
    })

    const barChart = barChartRef.current.toBase64Image()
    const lineChart = lineChartRef.current.toBase64Image()
    const pieChart = pieChartRef.current.toBase64Image()

    doc.addImage(barChart, 'PNG', 10, 60, 180, 80) // Gráfico de barras
    doc.addPage()
    doc.addImage(lineChart, 'PNG', 10, 10, 180, 80) // Gráfico de linhas
    doc.addPage()
    doc.addImage(pieChart, 'PNG', 50, 30, 100, 100) // Gráfico de pizza ajustado

    doc.save('dashboard.pdf')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header className="w-full bg-gray-200 flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
        <BackHomeButton />
      </Header>

      <div className="flex justify-start my-4 ml-8">
        <label htmlFor="month" className="mr-2 text-lg flex items-center">
          Mês:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-md"
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
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Total de Gastos</h2>
          <p className="mt-2 text-3xl text-red-600">{`R$ ${totalGastos}`}</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Total de Entradas</h2>
          <p className="mt-2 text-3xl text-green-600">{`R$ ${totalEntradas}`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Gastos x Entradas - Movimentações por Categoria
          </h2>
          <div style={{ height: '300px' }}>
            <Bar ref={barChartRef} data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Gastos x Entradas - Comparação de Gastos (Mês Atual vs Mês Anterior)
          </h2>
          <div style={{ height: '300px' }}>
            <Line ref={lineChartRef} data={lineData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Gastos x Entradas - Porcentagem de Movimentações
          </h2>
          <div style={{ height: '300px', width: '300px', margin: '0 auto' }}>
            <Pie ref={pieChartRef} data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 pb-8">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  )
}

export default DashboardPage
