import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaUniversity,
  FaMale,
  FaFemale,
} from 'react-icons/fa'
import { FaPersonSwimming } from 'react-icons/fa6'
import { BiMaleFemale } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import Contact from '../components/Contact'

function Accomodation() {
  const [accomodation, setAccomodation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [contact, setContact] = useState(false)
  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchAccomodation = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `/api/accomodation/get/${params.accomodationId}`
        )
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setAccomodation(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchAccomodation()
  }, [params.accomodationId])
  console.log(accomodation)

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {accomodation && !loading && !error && (
        <div className="flex flex-col ">
          <Slide>
            {accomodation.imageUrls.map((url) => (
              <div
                key={url}
                className="flex items-center justify-center bg-cover h-[350px] w-full"
              >
                <div className="w-full">
                  <img src={url} alt="imageSlider" className="w-full" />
                </div>
              </div>
            ))}
          </Slide>

          <div className="mx-1 p-2">
            <div className=" flex justify-between tran">
              <div className="space-y-3">
                <p className="text-2xl font-semibold text-dark-blue">
                  {accomodation.name}
                </p>

                <div className="flex flex-col">
                  <h2 className="flex items-center gap-1 ">
                    <FaUniversity className="text-lg text-dark-blue" />{' '}
                    {accomodation.university}, {accomodation.city}
                  </h2>

                  <span className="flex items-center gap-1 text-sm">
                    <FaMapMarkerAlt className="text-green-700 text-lg" />
                    {accomodation.address}
                  </span>
                </div>
              </div>

              {accomodation.spaceLeftFemales || accomodation.spaceLeftMales ? (
                <div className="bg-dark-blue text-white w-max h-[80px] p-2  rounded-lg">
                  <h2 className="text-center">Space left:</h2>
                  <div className="flex gap-4">
                    {accomodation.spaceLeftFemales > 0 ? (
                      <p className="flex items-center ">
                        <FaFemale className=" text-lg" />{' '}
                        {accomodation.spaceLeftFemales}
                      </p>
                    ) : (
                      ''
                    )}
                    {accomodation.spaceLeftMales > 0 ? (
                      <p className="flex items-center ">
                        <FaMale className=" text-lg" />{' '}
                        {accomodation.spaceLeftMales}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <p className="border-y mt-4 p-2 rounded-lg px-2 text-gray-600 font-medium tracking-wide">
              {accomodation.description}
            </p>

            <div className="mt-4">
              <div className="flex justify-between mt-2">
                <div className="">
                  <p className="flex items-center gap-1 font-medium">
                    Gender:{' '}
                    {accomodation.male && !accomodation.female ? (
                      <FaMale className="text-dark-blue text-lg" />
                    ) : accomodation.female && accomodation.male ? (
                      <BiMaleFemale className="text-dark-blue text-lg" />
                    ) : (
                      <FaFemale className="text-dark-blue text-lg" />
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between md:flex-row  p-2 gap-2 mt-2 rounded-lg bg-pri-blu text-whit mb-4 space-y-3">
                <div className="">
                  <h2 className="flex items-center gap-1 font-medium">
                    <FaBed className="text-lg text-dark-blue" /> Number of
                    rooms:
                  </h2>
                  {accomodation.sharing ? (
                    <p className="">
                      sharing: <span>{accomodation.sharingRoomsNo}</span>
                    </p>
                  ) : (
                    ''
                  )}
                  {accomodation.singles ? (
                    <p className="font-medium">
                      single : <span>{accomodation.singleRoomsNo}</span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>

                <div>
                  <p className="flex items-center gap-1 font-medium">
                    <FaPersonSwimming className="text-lg text-dark-blue " />{' '}
                    {accomodation.swimmingpool ? 'Avaliable' : 'Not Available'}
                  </p>
                  <p className="flex items-center gap-1 font-medium">
                    <FaChair className="text-lg text-dark-blue" />{' '}
                    {accomodation.furnished ? 'Furnished' : 'Not furnished'}
                  </p>
                </div>

                <div>
                  {accomodation.nsfas ||
                  accomodation.otherBursary ||
                  accomodation.cashPaying ? (
                    <div>
                      <p className="font-medium">
                        This accomodation is avaliable for:
                      </p>
                      <ul className="pl-5 list-disc list-inside">
                        {accomodation.nsfas ? <li>NSFAS</li> : ''}
                        {accomodation.otherBursary ? <li>Bursaries</li> : ''}
                        {accomodation.cashPaying ? <li>Cash Paying</li> : ''}
                      </ul>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-center pl-2 pr-2 w-full">
              <div className="flex gap-4">
                {accomodation.sharing ? (
                  <p className="bg-green-900  w-[200px] text-white text-center p-2 rounded-md flex flex-col">
                    Sharing: R {accomodation.sharingPrice}
                    <span className="text-sm">/year</span>
                  </p>
                ) : (
                  ''
                )}

                {accomodation.singles ? (
                  <p className="bg-green-900   text-white w-[200px] text-center p-2 rounded-md flex flex-col">
                    Single: R {accomodation.singlesPrice}
                    <span className="text-sm"> /year</span>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            {currentUser &&
              accomodation.userRef !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-dark-blue text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mt-2"
                >
                  Contact landlord
                </button>
              )}
            {contact && <Contact accomodation={accomodation} />}
          </div>
        </div>
      )}
    </main>
  )
}

export default Accomodation
