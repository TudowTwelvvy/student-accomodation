import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick= async() =>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
      })

      const data = await res.json()
      dispatch(signInSuccess(data));
      navigate('/');
      console.log(data)
    } catch (error) {
      console.log("couldn't not sign in with google", error)
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='flex justify-center items-center gap-2 p-3 border-[1px] border-dark-blue rounded-lg uppercase tracking-wide hover:bg-[#f3f0f0]'>
      <FcGoogle className='text-xl'/>
      Continue with Google
    </button>
  )
}

export default OAuth