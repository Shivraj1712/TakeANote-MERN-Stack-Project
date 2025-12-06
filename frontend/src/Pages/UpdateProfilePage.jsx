import React, { useState } from 'react'
import useAuth from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'
import api from '../api/axios.js'
import Loader from '../components/Loader.jsx'
import { useNavigate } from 'react-router-dom'
const UpdateProfilePage = () => {
    const { user, loading, setLoading } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState(user?.name || "")
    const [email, setEmail] = useState(user?.email || "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!name.trim() || !email.trim()) {
            toast.error("Please enter valid credentials")
            setLoading(false)
            return
        }

        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match")
            setLoading(false)
            return
        }

        try {
            const data = await api.put("/user/profile", {
                name,
                email,
                password,
                confirmPassword
            })
            setUser(data);
            toast.success("Profile updated successfully")
            navigate("/profile")
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <section className="min-h-screen bg-gray-800 flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <div className="shadow-lg rounded-lg bg-gray-900 w-80 h-108 flex flex-col items-center text-center justify-evenly">
                    <h3 className="text-blue-400 font-bold text-2xl">
                        Update Profile
                    </h3>

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
                        placeholder="New Password (Optional)"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-72 h-12 px-4 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 transition hover:border-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-72 h-12 px-4 py-2 border border-transparent bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    )
}

export default UpdateProfilePage
