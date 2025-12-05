import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import UpdateProfilePage from './Pages/UpdateProfilePage.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
import NotesPage from './Pages/NotesPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/update-profile' element={<ProtectedRoute><UpdateProfilePage /></ProtectedRoute>} />
        <Route path='/notes' element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App 