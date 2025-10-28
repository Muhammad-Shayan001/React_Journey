import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
 }, ref) => {
    const id = useId()
return (
    <div className='w-full'>
            {label && <label htmlFor={id} className='block text-sm font-medium text-gray-300 mb-2'>{label}</label>}
            <input 
                    type={type}
                    id={id}
                    className={`w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${className}`}
                    ref={ref}
                    {...props}
                    
            />
    </div>
)
})

export default Input;