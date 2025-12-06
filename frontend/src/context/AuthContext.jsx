import api from '../api/axios.js'
import { useContext, useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const { data } = await api.get('/user/profile')
            setUser(data)
        } catch (error) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])  

    const login = async (email, password) => {
        const { data } = await api.post('/user/auth', { email, password })
        setUser(data)
    }

    const logout = async () => {
        try {
            await api.post('/user/logout')
        } finally {
            setUser(null)       
            setLoading(false)
        }
    }

    const value = {
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)
export default useAuth
