 import React from 'react'
 
 export default function AuthLayout({children}) {
   return (
    <main className='mx-auto container flex items-center justify-center h-screen w-screen'>
      {children}
    </main>
   )
 }
 