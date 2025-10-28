import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Service from '../appwrite/conf'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    
    useEffect(() => {
        if (authStatus) {
            Service.getPosts().then((post) => {
                if(post) {
                    setPosts(post.documents)
                }
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [authStatus])

    if(loading) {
        return(
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="flex flex-col items-center justify-center animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Welcome to BlogApp
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300">
                            To see blogs, please <span className="text-purple-400 font-bold">sign in</span> first.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    if(posts.length === 0) {
        return(
            <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg animate-fade-in">
                No Posts Found
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
                        Welcome to BlogApp
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Discover stories, thinking, and expertise from writers on any topic.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div 
                            key={post.$id}
                            className="animate-fade-in-up"
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
    
}

export default Home