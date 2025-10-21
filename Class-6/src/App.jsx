import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [allowedNum, setallowedNum] = useState(false)
  const [allowedChar, setallowedchar] = useState(false)
  const [passward, setpassward] = useState('')
  const [copied, setCopied] = useState(false)
  const passref = useRef(null)

  const copyPasswardToClipboard = useCallback(() => {
    passref.current?.select();
    passref.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(passward)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [passward])

  const generatePassward = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let numStr = '0123456789'
    let charStr = '!@#$%^&*(){}":>?<,./;[]`~'

    if(allowedNum) str += numStr
    if(allowedChar) str += charStr
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    
    if(allowedNum && !pass.match(/[0-9]/)) {
      pass = numStr.charAt(Math.floor(Math.random() * numStr.length)) + pass.slice(1)
    }
    
    if(allowedChar && !pass.match(/[!@#$%^&*(){}:>?<,./;~]/)) {
      pass = charStr.charAt(Math.floor(Math.random() * charStr.length)) + pass.slice(1)
    }
    
    setpassward(pass)

  },[length, allowedChar, allowedNum, setpassward])
 
  useEffect(() => {
    generatePassward()
  }, [length, allowedChar, allowedNum, generatePassward])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-4'>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-slide { animation: slideIn 0.6s ease-out; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); background-size: 1000px 100%; animation: shimmer 2s infinite; }
      `}</style>
      
      <div className='w-full max-w-2xl animate-slide'>
        <div className='bg-linear-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-purple-500/20 pulse-glow'>
          
          <h1 className='text-5xl font-bold text-center bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8 tracking-wider'>
            Password Generator
          </h1>

          {/* Input Section */}
          <div className='flex gap-3 mb-8'>
            <div className='relative flex-1'>
              <input 
                ref={passref}
                type="text" 
                placeholder='Your password will appear here...'
                value={passward}
                className='w-full py-4 px-5 bg-slate-700/50 border-2 border-purple-500/30 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-purple-500 transition-all duration-300 hover:border-purple-500/50 placeholder-slate-400 backdrop-blur-sm'
                readOnly 
              />
              <div className='shimmer absolute inset-0 rounded-lg pointer-events-none'></div>
            </div>
            
            <button 
              onClick={copyPasswardToClipboard}
              // ref={passref}
              className={`px-6 py-4 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                copied 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                  : 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          {/* Controls Section */}
          <div className='space-y-6 bg-slate-800/50 rounded-xl p-6 border border-purple-500/10 backdrop-blur-sm'>
            
            {/* Length Slider */}
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <label className='text-white font-semibold text-lg'>Character Length</label>
                <span className='text-2xl font-bold text-purple-400 bg-slate-700/50 px-4 py-1 rounded-lg'>{length}</span>
              </div>
              <input 
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className='w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all'
              />
            </div>

            {/* Checkboxes */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <label className='flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40'>
                <input 
                  type="checkbox"
                  checked={allowedNum}
                  onChange={() => setallowedNum((pre) => !pre)}
                  className='w-5 h-5 accent-purple-500 cursor-pointer rounded'
                />
                <span className='text-white font-semibold'>Include Numbers</span>
              </label>

              <label className='flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40'>
                <input 
                  type="checkbox"
                  checked={allowedChar}
                  onChange={() => setallowedchar((pre) => !pre)}
                  className='w-5 h-5 accent-purple-500 cursor-pointer rounded'
                />
                <span className='text-white font-semibold'>Special Characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App