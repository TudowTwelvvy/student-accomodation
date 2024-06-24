import React, { useEffect, useState } from 'react'
import logo from '../assets/uni-accomodations-high-resolution-logo-transparent (1).png'
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function Header() {
  const {currentUser} = useSelector(state=> state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  console.log(searchTerm)

  return (
    <header>
      <div className='flex justify-between items-center mx-auto p-3'>
        <Link to='/'>
          <div className=''>
            <img src={logo} alt="" className='w-[130px] md:w-[250px]'/>
          </div>
        </Link>
        
        <form onSubmit={handleSubmit} className='flex items-center justify-center rounded-lg border-[2px] border-dark-blue h-7 ml-4 md:h-10 bg-dark-blue '>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search...' className='outline-none w-[90px] md:w-[200px] lg:w-[400px] h-full rounded-l-lg p-2' />
          <button className='flex items-center p-2 h-full rounded-r-lg cursor-pointer'>
            <BsSearch className=' text-white'/>
          </button>
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