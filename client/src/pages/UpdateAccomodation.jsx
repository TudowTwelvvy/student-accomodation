import React, { useEffect, useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'

function UpdateAccomodation() {
  const [files, setFiles] = useState([])
  console.log(files)
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    male: false,
    female: false,
    singleRoomsNo: 0,
    sharingRoomsNo: 0,
    singlesPrice: 0,
    sharingPrice: 0,
    singles: false,
    furnished: false,
    sharing: false,
    swimmingpool: false,
    nsfas: false,
    otherBursary: false,
    cashPaying: false,
    imageUrls: [],
    spaceLeftMales: 0,
    spaceLeftFemales: 0,
    university: '',
    city: '',
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    const fetchAccomodation = async () => {
      const accomodationId = params.accomodationId
      console.log(accomodationId)
      const res = await fetch(`/api/accomodation/get/${accomodationId}`)
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return
      }
      setFormData(data)
    }

    fetchAccomodation()
  }, [])

  const handleImgSubmit = (e) => {
    if (files.length > 0 && files.length < 7 + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
        })
    } else {
      setImageUploadError('You can only upload 6 images when creating a post')
      setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  const handleChange = (e) => {
    if (
      e.target.name === 'male' ||
      e.target.name === 'female' ||
      e.target.name === 'swimmingpool' ||
      e.target.name === 'furnished' ||
      e.target.name === 'nsfas' ||
      e.target.name === 'otherBursary' ||
      e.target.name === 'cashPaying' ||
      e.target.name === 'singles' ||
      e.target.name === 'sharing'
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      })
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image')
      }

      setLoading(true)
      setError(false)
      const res = await fetch(
        `/api/accomodation/update/${params.accomodationId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        }
      )
      const data = await res.json()
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/accomodation/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Accomodation
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            value={formData.name}
            required
          />

          <textarea
            onChange={handleChange}
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={formData.description}
            required
          />

          <input
            onChange={handleChange}
            type="text"
            name="university"
            placeholder="University"
            className="border p-3 rounded-lg"
            value={formData.university}
            required
          />

          <input
            onChange={handleChange}
            type="text"
            name="city"
            placeholder="City"
            className="border p-3 rounded-lg"
            value={formData.city}
            required
          />

          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            value={formData.address}
            required
          />

          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="singles"
                className="w-5"
                checked={formData.singles}
              />
              <span>Singles</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="sharing"
                className="w-5"
                checked={formData.sharing}
              />
              <span>Sharing</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="male"
                className="w-5"
                checked={formData.male}
              />
              <span>males</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="female"
                className="w-5"
                checked={formData.female}
              />
              <span>females</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="furnished"
                className="w-5"
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="swimmingpool"
                className="w-5"
                checked={formData.swimmingpool}
              />
              <span>Swimmingpool</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="nsfas"
                className="w-5"
                checked={formData.nsfas}
              />
              <span>Nsfas</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="otherBursary"
                className="w-5"
                checked={formData.otherBursary}
              />
              <span>Bursary</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                name="cashPaying"
                className="w-5"
                checked={formData.cashPaying}
              />
              <span>Cash paying</span>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            {formData.singles && (
              <div className="flex items-center gap-2">
                <span>Single rooms No.</span>
                <input
                  onChange={handleChange}
                  type="number"
                  name="singleRoomsNo"
                  required
                  className="p-2 w-[60px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.singleRoomsNo}
                />
              </div>
            )}

            {formData.sharing && (
              <div className="flex items-center gap-2">
                <span>Sharing rooms No.</span>
                <input
                  onChange={handleChange}
                  type="number"
                  name="sharingRoomsNo"
                  required
                  className="p-2 w-[60px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.sharingRoomsNo}
                />
              </div>
            )}

            {formData.male && (
              <div className="flex items-center gap-2">
                <span>Space Left (males)</span>
                <input
                  onChange={handleChange}
                  type="number"
                  name="spaceLeftMales"
                  required
                  className="p-2 w-[60px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.spaceLeftMales}
                />
              </div>
            )}

            {formData.female && (
              <div className="flex items-center gap-2">
                <span>Space Left (females)</span>
                <input
                  onChange={handleChange}
                  type="number"
                  name="spaceLeftFemales"
                  required
                  className="p-2 w-[60px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.spaceLeftFemales}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {formData.singles && (
              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  type="number"
                  name="singlesPrice"
                  required
                  className="p-2 w-[120px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.singlesPrice}
                />
                <div className="flex flex-col">
                  <p>Single room price</p>{' '}
                  <span className="text-[13px]">(R / year)</span>
                </div>
              </div>
            )}

            {formData.sharing && (
              <div className="flex items-center gap-2">
                <input
                  onChange={handleChange}
                  type="number"
                  name="sharingPrice"
                  required
                  className="p-2 w-[120px] border border-gray-300 rounded-lg"
                  min="0"
                  value={formData.sharingPrice}
                />
                <div className="flex flex-col">
                  <p>Sharing room price</p>{' '}
                  <span className="text-[13px]">(R / year)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p>
            Images:{' '}
            <span className="font-normal text-gray-600 ml-2">
              {' '}
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name="images"
              id=""
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImgSubmit}
              disabled={uploading}
              className="p-2 text-white border bg-green-700 rounded uppercase hover:shadow-lg disabled::opacity-80"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="accomodation image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="flex items-center justify-center p-3 font-medium text-red-700 rounded-lg uppercase hover:opacity-75 "
                >
                  Delete
                  <MdDelete className="text-xl " />
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-dark-blue  text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Updating Accomodation...' : 'Update Accomodation'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default UpdateAccomodation
