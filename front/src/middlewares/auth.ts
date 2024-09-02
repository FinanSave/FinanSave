import { getUserIdByToken } from '@/utils/getUserIdByToken'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token || !isValidUser(token)) {
      router.push('/login')
    }
  }, [router])

  const isValidUser = (token: string) => {
    try {
      getUserIdByToken(token)
      // Verificar user por id
      return true
    } catch (err) {
      return false
    }
  }
}

export default useAuth
