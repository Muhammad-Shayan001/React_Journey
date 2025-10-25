import React from 'react'

const Card = ({ 
  title = "Creative Design", 
  description = "This is a stunning card with smooth animations and hover effects designed with Tailwind CSS.", 
  image = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
}) => {
  return (
    <div className="
      group relative w-80 rounded-2xl overflow-hidden 
      bg-white dark:bg-gray-800 
      shadow-lg hover:shadow-2xl dark:shadow-black/50 dark:hover:shadow-indigo-500/20
      border border-gray-100 dark:border-gray-700 dark:hover:border-indigo-500/30
      transition-all duration-300 ease-in-out transform hover:-translate-y-2
    ">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Badge */}
        <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
          Featured
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 relative z-20">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Action Area */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 transition-colors">
          <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-2 cursor-pointer group/btn">
            Read More
            <span className="bg-indigo-50 dark:bg-indigo-900/30 p-1 rounded-full group-hover/btn:bg-indigo-100 dark:group-hover/btn:bg-indigo-800/50 transition-colors">
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card