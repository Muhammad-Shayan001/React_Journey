import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authservice from '../appwrite/auth'
import {login as authLogin} from '../features/authSlice'
import {Input} from './index'


const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()
    const [error , setError] = useState('')
    
    const create = async(data) => {
        setError('')
        try {
            const userData = await authservice.createAccount(data)
            if(userData) {
                const userData = await authservice.getCurrentUser()
                if(userData) {
                    dispatch(authLogin({userData}))
                    navigate('/')
                }
            }

        } catch (error) {
            setError(error.message , 'Error from signin')
        }
    }
return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up border border-white/10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Create Account
                </h1>
                <p className="text-gray-400">
                    Join our community of writers
                </p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(create)} className="space-y-6">
                <div className="space-y-4">
                   <Input 
                   label='Full Name'
                   placeholder='Enter your Full Name'
                   type='text'
                   {...register('name' , {
                    required : true,
                    
                   })}
                   />
                
                   <Input 
                   label='Email'
                   placeholder='Enter your Email'
                   type='email'
                   {...register('email' , {
                    required : true,
                    validate : {
                        matchPattern: (value) =>
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                            'Email address must be a valid format',
                    }
                   })}
                   />

                    <Input 
                    label='Password'
                    placeholder='Enter your Password'
                    type='password'
                    {...register('password' , {
                        required : true,
                        validate: {
                            minLength: (value) =>
                                value.length >= 8 || 'Password must be at least 8 characters long',
                        }
                    })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-[1.02] transition-all duration-200"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-center text-gray-400 mt-8">
                Already have an account?&nbsp;
                <Link 
                    to='/login'
                    className='text-purple-400 font-semibold hover:text-purple-300 transition-colors duration-200'
                >
                    Sign In
                </Link>
            </p>
        </div>
    </div>
)
}

export default Signup