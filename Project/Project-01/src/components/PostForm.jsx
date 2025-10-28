import React, { useCallback, useEffect } from 'react'
import {Input, RTE , Select} from './index'
import Service from '../appwrite/conf'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({post}) => {
    const {register , handleSubmit , watch , setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (!userData) {
            alert("You must be logged in to submit a post.");
            return;
        }

        try {
            if (post) {
                // Update existing post
                const dbPost = await Service.updatePost(post.$id, {
                    ...data,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Create new post
                const dbPost = await Service.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error in submit:", error);
            alert("An error occurred: " + error.message);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')

        return ''
    } , [])

    useEffect(()=> {
        const subscription = watch((value , {name}) => {
            if (name === 'title') {
                setValue('slug' , slugTransform(value.title), {shouldValidate : true})
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    } , [watch, slugTransform , setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto p-8 glass-effect rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{post ? "Edit Post" : "Create New Post"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="mb-4">
                    <Input 
                        label="Title"
                        placeholder="Enter title"
                        className="mb-4 bg-slate-800/50 border-slate-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                        {...register('title', {required: true})}
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        label="Slug" 
                        placeholder="Slug will be generated automatically"
                        className="mb-4 bg-slate-800/50 border-slate-700 text-gray-400 cursor-not-allowed focus:border-purple-500 focus:ring-purple-500"
                        {...register('slug', {required: true})}
                        readOnly
                    />
                </div>
            </div>
            <div className="mb-6">
                <RTE 
                    lable="Content" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues('content')} 
                />
            </div>
            <div className="mb-8">
                <Select 
                    options={[
                        {value: 'active', label: 'Active'},
                        {value: 'inactive', label: 'Inactive'}
                    ]}
                    lable="Status"
                    className="mb-4 bg-slate-800/50 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500"
                    {...register('status', {required: true})}
                />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transform hover:scale-[1.02] transition-all duration-200">
                {post ? "Update Post" : "Submit Post"}
            </button>
        </form>
    )
}

export default PostForm