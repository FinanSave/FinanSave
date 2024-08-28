import { jwtDecode } from 'jwt-decode'
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
      const tokenDecoded = jwtDecode(token)
      const id = tokenDecoded.id
      // Verificar user por id
      return true
    } catch (err) {
      return false
    }
  }
}

export default useAuth
