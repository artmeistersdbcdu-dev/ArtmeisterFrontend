import React from 'react'
import Link from 'next/link'

export const ArtCard = ({ art, className = "" }) => {
  return (
    <Link href={`/art/${art.id}`} className={`block group w-full h-full min-h-[250px] ${className}`}>
        <div className="glass rounded-2xl overflow-hidden relative border border-overlay/5 shadow-sm w-full h-full">
            <img 
                src={art.url} 
                alt={art.title} 
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <h3 className='text-xl font-bold mb-1'>{art.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{art.description}</p>
            </div>
        </div>
    </Link>
  )
}
