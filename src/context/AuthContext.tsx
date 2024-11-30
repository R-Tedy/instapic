import { getCurrentUser } from "@/lib/appwrite/api"
// import { account } from "@/lib/appwrite/config"
import { IContextTypes } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email:'',
  imageUrl:'',
  bio:''
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextTypes>(INITIAL_STATE)

function AuthProvider({children}:{children: React.ReactNode}) {
  const [user, setUser] = useState(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      console.log(currentAccount)

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
          username: currentAccount.username,
        })
        setIsAuthenticated(true)

        return true
      }
      
      return false
    } catch (error) {
      console.log(error)
      return false
    } finally{
      setIsLoading(false)
    }

  }

  useEffect(() => {

    // const client = await 
    if (
      localStorage.getItem('cookieFallback') === null ||
      localStorage.getItem('cookieFallback') === '[]'       
    ) {navigate('/sign-in')}

    checkAuthUser()
  }, [])
  

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)