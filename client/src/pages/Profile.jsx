import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { app } from '../firebase';
import { Link } from 'react-router-dom';
import { MdDelete,MdEdit } from "react-icons/md";


function Profile() {
  const { currentUser, loading, error } = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showAccomError, setShowAccomError] = useState(false);
  const [userAccomodations, setUserAccomodations] = useState([]);
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowAccomodations = async () => {
    try {
      setShowAccomError(false);
      const res = await fetch(`/api/user/accomodations/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowAccomError(true);
        return;
      }

      setUserAccomodations(data);
    } catch (error) {
      setShowAccomError(true);
    }
  };

  const handleAccomDelete = async (accomodationId) => {
    try {
      const res = await fetch(`/api/accomodation/delete/${accomodationId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserAccomodations((prev) =>
        prev.filter((accomodation) => accomodation._id !== accomodationId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto flex flex-col'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-500'>
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

        <input type="text" name="username" placeholder='username' className="border p-3 rounded-lg" defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="text" name="email" id="" placeholder='email' className="border p-3 rounded-lg" defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="text" name="password" id="" placeholder='password' className="border p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className='bg-dark-blue text-white rounded-lg p-3 uppercase hover:opacity-85'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={"/create-accomodation"} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
          Create Accomodation
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-500 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-500 mt-5'>{error ? error : ""}</p>
      <p className='text-green-500 mt-5'>{updateSuccess? "User is updated successfully!": ""}</p>
      
      <button onClick={handleShowAccomodations} className='text-green-500 mt-2'>Show Accomodations</button>

      <p className='text-red-700 mt-5'>
        {showAccomError ? 'Error showing accomodations' : ''}
      </p>

      {userAccomodations && userAccomodations.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Accomodations
          </h1>
          {userAccomodations.map((accomodation) => (
            <div
              key={accomodation._id}
              className='border rounded-lg px-3 flex justify-between items-center gap-4'
            >
              <Link to={`/accomodation/${accomodation._id}`}>
                <img
                  src={accomodation.imageUrls[0]}
                  alt='accomodation cover'
                  className='h-[150px] w-[150px] object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/accomodation/${accomodation._id}`}
              >
                <p className='truncate'>{accomodation.name}</p>
              </Link>

              <div className='flex gap-3 item-center'>
                <button
                  onClick={() => handleAccomDelete(accomodation._id)}
                  className='text-red-700 uppercase'
                >
                  <MdDelete className='text-xl hover:text-2xl'/>
                </button>
                <Link to={`/update-accomodation/${accomodation._id}`}>
                  <button className='text-green-700 uppercase'>
                  <MdEdit className='text-xl hover:text-2xl'/>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
          )}
     
    </div>
  )
}

export default Profile