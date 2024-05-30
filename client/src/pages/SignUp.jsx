import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="" id="username" placeholder='username' className='border p-3 rounded-lg'/>
        <input type="email" name="" id="
        email" placeholder='email' className='border p-3 rounded-lg'/>
        <input type="password" name="" id="password" placeholder='password' className='border p-3 rounded-lg'/>

        <button className='bg-dark-blue text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Sing up</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span class="text-sec-blue">Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp