import React from 'react'

function CreateAccomodation() {
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
              <input className='p-3 border border-gray-300 rounded w-full' type="file" name="images" id="" accept='/image/*' multiple/>
              <button className='p-2 text-white border bg-green-700 rounded uppercase hover:shadow-lg disabled::opacity-80'>Upload</button>
            </div>
            <button className='p-3 bg-dark-blue  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>post accomodation</button>
          </div>

          
      </form>
    </main>
  )
}

export default CreateAccomodation