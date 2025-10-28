import React, { useEffect, useState } from 'react'
import {Container , PostCard} from  '../components/index'
import Service from '../appwrite/conf'

const AllPosts = () => {
    const [posts , setPosts]  = useState([])
    useEffect(() => {
        Service.getPosts([]).then((post) => {
            if(post) {
                setPosts(post.documents)
            }
        })

    } , [])
  return (
    <div className='w-full py-8'>
        <Container>
            <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4 animate-fade-in-up">All Posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {posts.map((post, index) => (
                    <div 
                        key={post.$id} 
                        className='animate-fade-in-up'
                        style={{animationDelay: `${index * 0.05}s`}}
                    >
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts