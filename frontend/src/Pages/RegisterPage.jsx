import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'
import api from '../api/axios.js'
import Loader from '../components/Loader.jsx'

const RegisterPage = () => {
    const navigate = useNavigate()
    const { loading, setLoading } = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(password.trim() < 8 || confirmPassword.trim() < 8 ){
            toast.error('Please enter password of Valid length')
            setLoading(false)
            return 
        }

        if (!name.trim() || !confirmPassword.trim() || !email.trim() || !password.trim()) {
            toast.error('Please enter valid credentails!')
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            setLoading(false)
            return
        }

        try {
            await api.post("/user/register", { name, email, password, confirmPassword })
            toast.success("User Register successfully!")
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <section className="flex items-center justify-center bg-gray-800 min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="shadow-lg rounded-lg bg-gray-900 w-80 h-108 flex flex-col items-center text-center justify-evenly gap-0">
                    <h3 className="text-blue-400 font-bold text-2xl">Register</h3>

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-72 h-12 px-4 py-2 border border-transparent bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200"
                    >
                        Register
                    </button>

                    <p className="text-white">
                        Already have an account?
                        <Link to="/login" className="text-blue-500"> Login </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default RegisterPage
