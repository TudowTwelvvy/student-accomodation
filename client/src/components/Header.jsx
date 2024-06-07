import React from 'react'
import logo from '../assets/uni-accomodations-high-resolution-logo-transparent (1).png'
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

function Header() {
  const {currentUser} = useSelector(state=> state.user)

  return (
    <header>
      <div className='flex justify-between items-center mx-auto p-3'>
        <Link to='/'>
          <div className=''>
            <img src={logo} alt="" className='w-[130px] md:w-[250px]'/>
          </div>
        </Link>
        
        <form className='flex items-center justify-center rounded-lg border-[2px] border-dark-blue h-7 ml-4 md:h-10 bg-dark-blue '>
          <input type="text" placeholder='Search...' className='outline-none w-[90px] md:w-[200px] lg:w-[400px] h-full rounded-l-lg p-2'/>
          <div className='flex items-center p-2 h-full rounded-r-lg cursor-pointer'>
            <BsSearch className=' text-white'/>
          </div>
        </form>
        <ul className='flex justify-center items-center gap-2 lg:gap-4 text-sm md:text-base mr-2 lg:mr-7'>
          <Link to='/'><li className='hidden md:inline text-dark-blue hover:text-sec-blue cursor-pointer'>Home</li></Link>
          <Link to='/about'><li className='hidden md:inline text-dark-blue hover:text-sec-blue cursor-pointer'>About</li></Link>
          <Link to='/profile'>
          {
            currentUser ? (
              <img src={currentUser.avatar} alt=""  className='rounded-full h-7 w-7 object-fit'/>
            ):(
              
                <li className='text-dark-blue hover:text-sec-blue cursor-pointer'>Sign in</li>
              
            )
          }
          </Link>
          
        </ul>
      </div>
      
    </header>
  )
}

export default Header