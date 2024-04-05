import React from 'react'

const Footer = () => {
  return (

    <footer  >
      <div className='flex justify-center items-center p-2 bg-black text-white gap-4'>
        <a>Terms Of Use</a>
        <a>Privacy-Policy</a>
        <a>About</a>
        <a>FAQ</a>
        <a>
Blog</a>
      </div>
      <div className='flex justify-center items-center p-2 bg-black text-white'><p className='w-8/12 text-center'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p></div>
      <div className='flex justify-center items-center p-2 bg-black text-white'><p>Copywrite @ movies</p></div>
      
    </footer>
  )
}

export default Footer