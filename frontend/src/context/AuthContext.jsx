import api from '../api/axios.js'
import { useContext, useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // States of User and Loading 
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch User
    const fetchUser = async () => {
        try {
            const { data } = await api.get('/user/profile')
            setUser(data)
        } catch (error) {
            console.error(`${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    // Calling the Fetch user function
    useEffect(() => {
        fetchUser()
    }, [user])
    // Login function 
    const login = async ({ email, password }) => {
        const { data } = await api.post('/user/auth', { email, password })
        setUser(data)
    }
    // Logout function
    const logout = async () => {
        try {
            setLoading(true)
            await api.post('/user/logout')
            setUser("")
        } catch (error) {
            console.log("Backend offline, clearing user client-side")
        } finally {
            setUser(null)
        }
    }
    // Value that has to be passed on
    const value = {
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        isAuthenticated: !!user
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export default useAuth
