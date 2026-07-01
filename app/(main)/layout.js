import React from 'react'
import { Navbar } from './_component/Navbar'

const layout = ({children}) => {
  return (
    <div className='mt-26 min-h-screen  mx-auto container'>
      <Navbar/>
    {children}</div>
  )
}

export default layout