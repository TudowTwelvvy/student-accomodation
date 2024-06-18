import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName=new Date().getTime() +file.name;
    const storageRef =ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  }, [file])
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : percent > 0 && percent < 100 ? (
            <span className='text-sec-blue'>{`Uploading ${percent}%`}</span>
          ) : percent === 100 ? (
            <span className='text-green-500'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type="text" name="username" placeholder='username' className="border p-3 rounded-lg"/>
        <input type="text" name="email" id="" placeholder='email' className="border p-3 rounded-lg"/>
        <input type="text" name="password" id="" placeholder='password' className="border p-3 rounded-lg"/>
        <button className='bg-dark-blue text-white rounded-lg p-3 uppercase hover:opacity-85'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
      
      
     
    </div>
  )
}

export default Profile