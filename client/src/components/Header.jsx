import React from 'react'
import logo from '../assets/uni-accomodations-high-resolution-logo-transparent (1).png'
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className='flex justify-between items-center mx-auto md:ml-2 md:mr-2 p-3 '>
        <Link to='/'>
          <div className=''>
            <img src={logo} alt="" className='w-[150px] md:w-[250px] '/>
          </div>
        </Link>
        
        <form className='flex items-center justify-center rounded-lg border-[2px] border-dark-blue h-7 ml-4 md:h-10 bg-dark-blue '>
          <input type="text" placeholder='Search...' className='outline-none w-[100px] md:w-[300px] h-full rounded-l-lg p-2'/>
          <div className='flex items-center p-2 h-full rounded-r-lg cursor-pointer'>
            <BsSearch className=' text-white'/>
          </div>
        </form>
        <ul className='flex justify-center items-center gap-4 text-sm md:text-base'>
          <Link to='/'><li className='hidden md:inline text-dark-blue hover:text-sec-blue cursor-pointer'>Home</li></Link>
          <Link to='/about'><li className='hidden md:inline text-dark-blue hover:text-sec-blue cursor-pointer'>About</li></Link>
          <Link to='/sign-in'><li className='text-dark-blue hover:text-sec-blue cursor-pointer md'>Sign in</li></Link>
        </ul>
      </div>
      
    </header>
  )
}

export default Header