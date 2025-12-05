import useAuth from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const { user } = useAuth()

    const isLoggedIn = !!user

    return (
        <section className="flex flex-col shadow-md items-center justify-center bg-gray-800 h-screen text-center">

            <h1 className="text-6xl font-bold text-blue-400">
                Welcome {isLoggedIn ? user.name : "to TakeANote!"}
            </h1>

            <h2 className="text-2xl font-semibold text-gray-500 my-4">
                {isLoggedIn
                    ? "Manage your notes securely."
                    : "Capture, organize, and access notes anywhere."}
            </h2>

            <div className="flex items-center justify-center gap-8 mt-6">

                {isLoggedIn && (
                    <Link to="/notes">
                        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                            View Notes
                        </button>
                    </Link>
                )}

                {!isLoggedIn && (
                    <>
                        <Link to="/register">
                            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                                Get Started
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="px-6 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold rounded-lg transition">
                                Login
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}

export default HomePage
