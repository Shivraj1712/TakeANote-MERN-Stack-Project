import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <section className="min-h-screen bg-gray-800 flex items-center justify-center">
            <div className="h-72 w-80 bg-gray-900 py-6 px-4 rounded-xl shadow-lg flex flex-col items-center justify-evenly text-center">
                <h1 className="text-5xl font-bold text-blue-400">404</h1>
                <p className="text-white text-lg font-semibold">
                    The page you are looking for does not exist or was moved.
                </p>
                <Link
                    to="/"
                    className="bg-blue-400 py-2 text-sm px-4 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Go Home
                </Link>
            </div>
        </section>
    )
}

export default NotFoundPage

