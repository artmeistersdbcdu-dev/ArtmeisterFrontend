import Image from 'next/image';
import React from 'react'

const ArtCard = ({ art }) => {
  return (
    <div className='relative rounded-xl overflow-hidden shadow-md'>
      <Image
        src={art.Image}
        alt={art.Name}
        width={400}
        height={500}
        className='w-full h-auto'
      />
      <div className='absolute bottom-0 left-0 right-0 z-10 p-3'>
        <h3 className='font-semibold text-white'>{art.Name}</h3>
        {art.Description?.Valid && (
          <p className='text-sm text-gray-200 line-clamp-2'>
            {art.Description.String}
          </p>
        )}
      </div>
    </div>
  )
}

export default ArtCard