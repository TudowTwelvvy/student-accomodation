import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>(
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleSubmit= async (e) =>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signin', 
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }
      );
      const data = await res.json();
      if (data.success === false){
        setLoading(false);
        setError(data.message);
        
        return
      }else{
        setLoading(false)
        setError(null)
        navigate('/')
      } 
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
  }
  
  console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sing In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" name="email" placeholder='email' className='border p-3 rounded-lg' value={formData.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder='password' className='border p-3 rounded-lg' value={formData.password} onChange={handleChange}/>

        <button disabled = {loading} className='bg-dark-blue text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80' onSubmit={handleSubmit}>
          {loading? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-sec-blue">Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn