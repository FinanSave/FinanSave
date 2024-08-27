import { useRouter } from 'next/navigation'
import React from 'react'

interface HeaderProps {
  children?: React.ReactNode
  className?: string
}

export default function Header({ children, className }: HeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <header className={`w-full bg-gray-200 py-6 shadow-md ${className}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="/FS-symbol-LP.png" alt="Finansave Logo" className="h-14" />
          <button
            onClick={handleBack}
            className="ml-3 text-4xl font-bold focus:outline-none"
          >
            Finan<span className="text-blue-700">Save</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">{children}</div>
      </div>
    </header>
  )
}
