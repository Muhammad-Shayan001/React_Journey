import React from 'react'
import Service from '../appwrite/conf'
import { Link } from 'react-router-dom'


const PostCard = ({$id , title}) => {
return (
    <Link to={`/post/${$id}`} className="block h-full">
        <div className='h-full glass-effect rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 group border border-white/10'>
            <div className='h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative overflow-hidden group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-colors duration-500'>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                    <span className="text-6xl">📝</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
            </div>
            <div className='p-6 relative'>
                <h2 className='text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300'>
                    {title}
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 group-hover:w-full transition-all duration-500"></div>
            </div>
        </div>
    </Link>
)
}

export default PostCard