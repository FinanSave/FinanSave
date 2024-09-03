import { useRouter } from 'next/navigation'

export default function BackHomeButton() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/home')
  }

  return (
    <button
      onClick={handleBack}
      className="flex space-x-1 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
    >
      Voltar
    </button>
  )
}
