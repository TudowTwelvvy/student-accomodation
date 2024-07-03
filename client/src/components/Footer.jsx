import React from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className='w-full bg-dark-blue text-center p-4'>
       <p className='text-gray-400 text-[14px]'>Copyright {year} developed by Tumelo Khanye - All rights reserved</p>

    </div>
  )
}

export default Footer