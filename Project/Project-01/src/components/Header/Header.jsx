import React from 'react'
import Container from '../Container/Container'
import { Link, Links, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'


const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
const navigate = useNavigate()

const navItems = [
    {
        name: 'Home',
        slug: '/',
        active: true
    },
    {
        name: 'Login',
        slug: '/login',
        active: !authStatus
    },
    {
        name: 'Signup',
        slug: '/signup',
        active: !authStatus
    },
    {
        name: 'All Posts',
        slug: '/all-posts',
        active: authStatus
    },
    {
        name: 'Add Posts',
        slug: '/add-post',
        active: authStatus
    }
]
return (

    <header className="sticky top-0 z-50 glass-effect shadow-lg transition-all duration-300">
        <Container>

        <nav className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Link to='/'>
                <img  src="../../../Gemini_Generated_Image_u40gc8u40gc8u40g-removebg-preview.png" alt="" className="h-20 w-20 p-0 m-0 object-contain" />
                </Link>
            </div>
            <ul className="flex gap-6 items-center">
                {navItems.map((item) => 
                item.active?(
                    <li key={item.name}>
                    <button
                    onClick={() => navigate(item.slug)}
                    className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 group overflow-hidden rounded-full"
                    >
                        <span className="relative z-10">{item.name}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                    </button>
                </li>
                    
                ): null
                )}
                {authStatus && (
                    <li className="flex items-center gap-4">
                        <LogoutBtn/>
                        <button 
                            onClick={() => navigate('/add-post')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                        >
                            Write Blog
                        </button>
                    </li>
                )}
            </ul>
           
        </nav>
        </Container>
    </header>
)
}

export default Header