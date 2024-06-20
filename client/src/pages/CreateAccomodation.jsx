import React, { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateAccomodation() {
  const [files, setFiles] = useState([])
  console.log(files)
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    male:false,
    female: false,
    singleRoomsNo: 1,
    sharingRoomsNo: 1,
    regularPrice: 50,
    singlesPrice:0,
    sharingPrice:0,
    singles: false,
    furnished: false,
    sharings:false,
    swimmingpool:false,
    nsfas:false,
    otherBursary:false,
    cashPaying:false,
    imageUrls:[],
    userRef:''
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);



  const handleImgSubmit=(e)=>{
    if(files.length>0 && files.length <7 + formData.imageUrls.length < 7){
      const promises =[];

      for(let i =0; i<files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images when creating a post');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create And Post Your Accomodation</h1>
      <form action="" className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" name="name" placeholder='Name' className='border p-3 rounded-lg' required/>

          <textarea name="description" placeholder='Description' className='border p-3 rounded-lg' required/>

          <input type="text" name="addrerss" placeholder='Address' className='border p-3 rounded-lg' required/>

          <div className='flex gap-3 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Singles</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Sharing</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>males</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>females</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Swimmingpool</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Nsfas</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Busary</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" name="singles" className='w-5'/>
              <span>Cash paying</span>
            </div>
            
          </div>

          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <span>Single rooms No.</span>
              <input type="number" name="singlesNumber" required className='p-2 w-[60px] border border-gray-300 rounded-lg' min="1"/>
              
            </div>
            <div className='flex items-center gap-2'>
              <span>Sharing rooms No.</span>
              <input type="number" name="singlesNumber" required className='p-2 w-[60px] border border-gray-300 rounded-lg' min="1"/>
              
            </div>  
          </div>

          <div className='flex gap-4 flex-wrap'>
            
            <div className='flex items-center gap-2'>
              <input type="number" name="singlesNumber" required className='p-2 w-[120px] border border-gray-300 rounded-lg' min="1"/>
              <div className='flex flex-col'>
                <p>Single room price</p> <span className='text-[13px]'>(R / year)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" name="singlesNumber" required className='p-2 w-[120px] border border-gray-300 rounded-lg' min="1"/>
              <div className='flex flex-col'>
                <p>Sharing room price</p> <span className='text-[13px]'>(R / year)</span>
              </div>
              
            </div>  
          </div>
        </div>
        
        <div className='flex flex-col flex-1 gap-4'>
            <p>Images: <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6)</span></p>
            <div className='flex gap-4'>
              <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" name="images" id="" accept='image/*' multiple/>
              <button type='button' onClick={handleImgSubmit} disabled={uploading} className='p-2 text-white border bg-green-700 rounded uppercase hover:shadow-lg disabled::opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='accomodation image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='p-3 font-medium text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              ))
            }
            <button className='p-3 bg-dark-blue  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>post accomodation</button>
          </div>
          

          
      </form>
    </main>
  )
}

export default CreateAccomodation