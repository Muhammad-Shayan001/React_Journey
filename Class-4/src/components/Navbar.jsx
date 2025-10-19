import React from 'react';

const Navbar = () => {
  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-float flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <h1 className="text-2xl font-bold text-white neon-text tracking-wider">
          SMIT<span className="text-cyan-400">Store</span>
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-widest font-medium relative group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(0,255,255,0.5)]"></span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-300 hover:text-white transition-colors relative group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <button className="relative p-2 text-gray-300 hover:text-white transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute top-0 right-0 w-4 h-4 bg-purple-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold animate-pulse">
            3
          </span>
        </button>

        <button className="hidden md:block px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-sm uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transform hover:-translate-y-0.5">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
