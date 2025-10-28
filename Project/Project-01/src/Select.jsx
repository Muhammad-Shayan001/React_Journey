import React, { useId } from 'react'

const Select = ({
    options,
    lable,
    classname,
    ...props
} , ref) => {
    const id = useId()
return (
    <div className="w-full">
        {lable && (
            <label 
                htmlFor={id} 
                className='block text-sm font-semibold text-gray-300 mb-2 transition-colors duration-200'
            >
                {lable}
            </label>
        )}
        <select
            id={id}
            ref={ref}
            className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 cursor-pointer appearance-none ${classname}`}
            {...props}
        >
            {options?.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)
}

export default React.forwardRef(Select)