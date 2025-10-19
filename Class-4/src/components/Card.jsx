import React from "react";

const Card = ({ product, price, discription, productDetails, img, index }) => {
  return (
    <div 
      className="glass rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] group relative overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative w-48 h-48 rounded-full p-1 bg-gradient-to-r from-cyan-400 to-purple-500 animate-float">
        <img 
          className="w-full h-full rounded-full object-cover border-4 border-black/50" 
          src={img} 
          alt={product} 
        />
      </div>

      <div className="z-10 text-center space-y-2">
        <h1 className="text-white text-2xl font-bold neon-text tracking-wider">{product}</h1>
        
        <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-white/5">
          <p className="text-cyan-300 text-sm font-medium mb-1">
            {productDetails}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {discription}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-purple-400 text-lg">Price:</span>
          <span className="text-2xl font-bold text-white neon-text">${price}</span>
        </div>

        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-sm uppercase tracking-widest hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transform hover:-translate-y-1">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
