import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './Context/Theme'
import Button from './components/Button/Button'
import Card from './components/Card/Card'

const App = () => {
  const [themeMode , setThemeMode] = useState('light')
  const lightTheme = () => {
    setThemeMode('light')
  }
  const darkTheme = () => {
    setThemeMode('dark')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('light' ,'dark')
    document.querySelector('html').classList.add(themeMode)

  } , [themeMode])
  return (
    <ThemeProvider value={{themeMode , lightTheme , darkTheme}}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 gap-8 py-10">
        <h1 className='text-5xl font-bold text-gray-900 dark:text-white drop-shadow-lg animate-fade-in'>Welcome to the Theme Switcher</h1>
        <div className="flex gap-4 animate-bounce">
          <Button 
            isOn={themeMode === 'dark'} 
            onToggle={() => themeMode === 'light' ? darkTheme() : lightTheme()} 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Card 
            title="Neon Lights" 
            image="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            className="hover:scale-110 hover:shadow-2xl transition-transform duration-300"
          />
          <Card 
            title="Abstract Art" 
            image="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            className="hover:scale-110 hover:shadow-2xl transition-transform duration-300"
          />
          <Card 
            title="Modern Tech" 
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            className="hover:scale-110 hover:shadow-2xl transition-transform duration-300"
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
