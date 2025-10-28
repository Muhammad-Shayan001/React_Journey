import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        }).catch((err) => {
            console.log('ERROR ---> ',err)
        })
    }
    return (
        <button
        onClick={logoutHandler}
        className="group relative px-6 py-2 font-semibold text-white transition-all duration-300 ease-out"
        >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
        </span>
    </button>
)

}

export default LogoutBtn    