import React from 'react'
import useTheme from '../../Context/Theme'

const Button = ({ isOn, onToggle }) => {
  const { themeMode, lightTheme, darkTheme } = useTheme()

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked
    if (darkModeStatus) {
      darkTheme()
    } else {
      lightTheme()
    }
    // Call the prop if it exists, to keep App.jsx in sync
    if (onToggle) onToggle(e)
  }

  return (
    <label className={`
      relative w-24 h-12 rounded-full p-1 transition-colors duration-500 ease-in-out cursor-pointer overflow-hidden shadow-inner block
      ${isOn ? 'bg-slate-800' : 'bg-sky-400'}
    `}>
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={isOn}
      />

      {/* Background Elements - Stars (Dark Mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 left-5 w-0.5 h-0.5 bg-white rounded-full"></div>
        <div className="absolute top-4 left-12 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
      </div>

      {/* Background Elements - Clouds (Light Mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isOn ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-2 right-8 w-6 h-2 bg-white/40 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-3 right-4 w-8 h-3 bg-white/40 rounded-full blur-[1px]"></div>
        <div className="absolute top-5 right-12 w-4 h-1.5 bg-white/40 rounded-full blur-[1px]"></div>
      </div>

      {/* Knob */}
      <div
        className={`
          absolute top-1 left-1 w-10 h-10 rounded-full bg-white shadow-xl transform transition-transform duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)
          flex items-center justify-center z-10
          ${isOn ? 'translate-x-12' : 'translate-x-0'}
        `}
      >
        {/* Icons with rotation animation */}
        <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ${isOn ? 'rotate-[360deg]' : 'rotate-0'}`}>
            {isOn ? (
            <svg className="w-6 h-6 text-slate-700 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            ) : (
            <svg className="w-6 h-6 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            )}
        </div>
      </div>
    </label>
  )
}

export default Button