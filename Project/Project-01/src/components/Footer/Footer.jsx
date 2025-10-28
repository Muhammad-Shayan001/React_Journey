import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 border-t border-white/10 pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">BlogApp</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Share your thoughts with the world. A modern platform for modern writers.
                    </p>
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                        <li><Link to="/all-posts" className="hover:text-purple-400 transition-colors">All Posts</Link></li>
                        <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Sign Up</Link></li>
                    </ul>
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <h4 className="text-white font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
                <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <h4 className="text-white font-semibold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        {/* Add social icons here if needed */}
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-500 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-xs">TW</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-xs">FB</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-pink-500 transition-colors cursor-pointer flex items-center justify-center">
                            <span className="text-xs">IG</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer