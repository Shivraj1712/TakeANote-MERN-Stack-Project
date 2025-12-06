import { User } from 'lucide-react'
import useAuth from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    
    return (
        <section className="min-h-screen bg-gray-800 flex items-center justify-center">
            <div className="h-96 w-80 flex flex-col items-center text-center shadow-sm shadow-gray-700 bg-gray-900 rounded-2xl justify-evenly">
                <h2 className="text-3xl font-bold text-blue-400">Profile</h2>
                <div className="text-center bg-gray-900  border-2 border-blue-400 mt-5 h-20 w-20 flex flex-col justify-center items-center rounded-full">
                    <User className="text-blue-400 text-5xl h-12 w-12" />
                </div>
                <hr className="text-white w-72 mt-3" />
                <div className="h-32 w-full px-4 flex flex-col items-start justify-around">
                    <p className="text-white font-semibold text-md">Name : {user?.name || ""}</p>
                    <p className="text-white font-semibold text-md">Email : {user?.email || ""}</p>
                    <div className="flex items-center justify-evenly w-full">
                        <button className="bg-blue-400 py-2 text-sm px-2 text-white font-semibold rounded-lg w-28 hover:bg-blue-600 hover:cursor-pointer transition duration-200" onClick={() => navigate('/update-profile')}> Update Profile</button>
                        <button className="bg-transparent border border-red-400 py-2 text-sm px-2 font-semibold text-red-400 rounded-lg w-28 hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer" onClick={() => logout()}>Logout</button>
                    </div>
                </div>
                <hr className="text-white w-72 my-2" />
            </div>
        </section >
    )
}

export default ProfilePage
