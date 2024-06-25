import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import AccomodationItem from '../components/AccomodationItem';
import ujLogo from '../assets/uj-logo.png'
import cptLogo from '../assets/cpt logo.png'
import nsfasLogo from '../assets/NSFAS-Status-Check-2024-Using-ID-Number.jpg'
import studentsLogo from '../assets/istock-652270816.jpg'
import vendaLogo from '../assets/venda.png'
import nwuLogo from '../assets/nwu logo.png'

const logosData= [ujLogo,nwuLogo,cptLogo,nsfasLogo,vendaLogo,nwuLogo]



export default function Home() {
  const [nsfasAccomos, setNsfasAccomos] = useState([]);
  const [cashPayingAccomos, setCashPayingAccomos] = useState([]);
  const [otherBursaryAccomos, setOtherBursaryAccomos] = useState([]);
  console.log(nsfasAccomos);


 useEffect(() => {
    const fetchNsfasAccomos = async () => {
      try {
        const res = await fetch('/api/accomodation/get?nsfas=true&limit=4');
        const data = await res.json();
        setNsfasAccomos(data);
        fetchCashPayingAccomos();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCashPayingAccomos = async () => {
      try {
        const res = await fetch('/api/accomodation/get?cashPaying=true&limit=4');
        const data = await res.json();
        setCashPayingAccomos(data);
        fetchOtherBursaryAccomos();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOtherBursaryAccomos = async () => {
      try {
        const res = await fetch('/api/accomodation/get?otherBursary=true&limit=4');
        const data = await res.json();
        setOtherBursaryAccomos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNsfasAccomos();
  }, []);
//className='flex flex-1 flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'
  return (
    <div >
      {/* top */}
      <div className='flex flex-col'>
        <div className='flex items-center h-full '>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-dark-blue font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-pri-blue'>perfect</span>
            <br />
          place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
          Uni-Accomodations is the best place to find your next perfect place to
          stay while you fighting to be called Mr West one day
            <br />
          We have a wide range of accomodations for you to choose from.
          </div>
          <Link
          to={'/search'}
          className='text-xs sm:text-sm text-sec-blue font-bold hover:underline'
          >
          Let's get started...
          </Link>
        </div>

         <div className=''>
          <img src={studentsLogo} alt="students" className='rounded-lg '/>
         </div>

        </div>
        

        <div className='mt-1 md:mt-12'>
             <Slide >
                {
                logosData.map((logo,index) => ( 
                  <div key={index}  className='pt-3 w-full'>
                    <div >
                       <img src={logo} alt={logo} className='object-contain h-[100px] md:h-[150px] w-full' />
                    </div>
                  </div>
                  ))
                }
              </Slide>
        </div>
        
         

      </div>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {nsfasAccomos && nsfasAccomos.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-dark-blue'>Recent nsfas accomodations</h2>
              <Link className='text-sm text-sec-blue hover:underline' to={'/search?nsfas=true'}>Show more accomodations for nsfas students</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {nsfasAccomos.map((accomodation) => (
                <AccomodationItem accomodation={accomodation} key={accomodation._id} />
              ))}
            </div>
          </div>
        )}
        {cashPayingAccomos && cashPayingAccomos.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-dark-blue'>Recent accomodations for cash paying</h2>
              <Link className='text-sm text-sec-blue hover:underline' to={'/search?cashPaying=true'}>Show more accomodations for cash paying students</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {cashPayingAccomos.map((accomodation) => (
                <AccomodationItem  accomodation={accomodation} key={accomodation._id} />
               
              ))}
            </div>
          </div>
        )}
        {otherBursaryAccomos && otherBursaryAccomos.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-dark-blue'>Recent accomodations for bursaries</h2>
              <Link className='text-sm text-sec-blue  hover:underline' to={'/search?otherBursary=true'}>Show more accomodations for bursary students</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {otherBursaryAccomos.map((accomodation) => (
                <AccomodationItem  accomodation={accomodation} key={accomodation._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className='bg-dark-blue text-white text-center mb-0'>coded by Tumelo (TwelvvyTudow)</p>
    </div>
  );
}