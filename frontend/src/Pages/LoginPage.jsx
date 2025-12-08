import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'

const LoginPage = () => {
    const navigate = useNavigate()
    const { login, loading, setLoading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(password.trim().length < 8){
            toast.error('Please enter a valid password!')
            setLoading(false)
            return 
        }
        if (!email.trim() || !password.trim()) {
            toast.error('Please enter valid credentails!')
            setLoading(false)
            return
        }

        try {
            await login( email, password )
            toast.success("User Login successful")
            navigate("/profile")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <section className="flex items-center justify-center bg-gray-800 min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="shadow-lg rounded-lg bg-gray-900 w-80 h-80 flex flex-col items-center text-center justify-evenly gap-0">
                    <h3 className="text-blue-400 font-bold text-2xl">Login</h3>

                    <input
                        type="text"
                        placeholder="Email"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-72 h-12 px-4 py-2 border border-transparent bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-white">
                        Don't have an account?
                        <Link to="/register" className="text-blue-500"> Register </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default LoginPage
