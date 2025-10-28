import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import service from '../appwrite/conf'
import Container from '../components/Container/Container'
import parse from 'html-react-parser'

export default function Posts() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate('/')
            })
        } else navigate('/')
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                navigate('/')
            }
        })
    }

    return post ? (
        <div className="py-8">
            <div className="max-w-4xl mx-auto">
                <div className="glass-effect rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 border-b border-white/10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{post.title}</h1>
                        <p className="text-blue-200">Published on {new Date(post.$createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="prose prose-lg prose-invert max-w-none mb-8">
                            <div className="text-gray-300 text-lg leading-relaxed browser-css">
                                {parse(post.content)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isAuthor && (
                            <div className="flex gap-4 mt-8 border-t border-white/10 pt-8">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                                    >
                                        Edit Post
                                    </button>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
                                >
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
    )
}


