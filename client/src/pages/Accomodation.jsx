import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function Accomodation() {
 
  const [accomodation, setAccomodation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  


  useEffect(() => {
    const fetchAccomodation = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/accomodation/get/${params.accomodationId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setAccomodation(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAccomodation();
  }, [params.accomodationId]);

  return (
    <main>
      
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}

      {
        accomodation && !loading && !error && (
          <Slide>
            {
              accomodation.imageUrls.map((url)=>(
                <div className="flex items-center justify-center bg-cover h-[350px] ">
                  <div >
                    <img src={url} alt="imageSlider" className='w-full '/>
                </div>
            </div>
              ))
            }
            
          </Slide>
        )
      }
      
      
    </main>
  )
}

export default Accomodation