import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccomodationItem from '../components/AccomodationItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    
    nsfas: false,
    male:false,
    female:false,
    cashPaying:false,
    otherBursary:false,
    furnished: false,
    swimmingpool: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [accomodations, setAccomodations] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(accomodations)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    
    const nsfasFromUrl = urlParams.get('nsfas');
    const cashPayingFromUrl = urlParams.get('cashPaying');
    const otherBursaryFromUrl = urlParams.get('otherBursary');
    const swimmingpoolFromUrl = urlParams.get('swimmingpool');
    const furnishedFromUrl = urlParams.get('furnished');
    const maleFromUrl = urlParams.get('male');
    const femaleFromUrl = urlParams.get('female');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
     
      nsfasFromUrl ||
      cashPayingFromUrl ||
      otherBursaryFromUrl ||
      swimmingpoolFromUrl||
      furnishedFromUrl ||
      maleFromUrl ||
      femaleFromUrl||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        
        nsfas: nsfasFromUrl === 'true' ? true : false,
        cashPaying: cashPayingFromUrl === 'true' ? true : false,
        otherBursary: otherBursaryFromUrl === 'true' ? true : false,
        swimmingpool: swimmingpoolFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        female: femaleFromUrl === 'true' ? true : false,
        male: maleFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }
    const fetchAccomodations = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/accomodation/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setAccomodations(data);
      setLoading(false);
    };

    fetchAccomodations();
  }, [location.search]);


  const handleChange = (e) => {

    if (e.target.name === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.name === 'searchUniversity') {
      setSidebardata({ ...sidebardata, searchUniversity: e.target.value });
    }

    if (
      e.target.name === 'male' ||
      e.target.name === 'female' ||
      e.target.name === 'nsfas' ||
      e.target.name === 'cashPaying' ||
      e.target.name === 'swimmingpool' ||
      e.target.name === 'furnished' ||
      e.target.name === 'otherBursary'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.name]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.name === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('searchUniversity',sidebardata.searchUniversity);
    urlParams.set('nsfas', sidebardata.nsfas);
    urlParams.set('cashPaying', sidebardata.cashPaying);
    urlParams.set('otherBursary', sidebardata.otherBursary);
    urlParams.set('male', sidebardata.male);
    urlParams.set('female', sidebardata.female);
    urlParams.set('swimmingpool', sidebardata.swimmingpool);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfAccomodations = accomodations.length;
    const startIndex = numberOfAccomodations;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/accomodation/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setAccomodations([...accomodations, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              name='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Funding:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='nsfas'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.nsfas}
              />
              <span>NSFAS</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='cashPaying'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.cashPaying}
              />
              <span>Cash Paying</span>
            </div>
            
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='otherBursary'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.otherBursary}
              />
              <span>Other Bursaries</span>
            </div>
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Gender:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='male'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.male}
              />
              <span>Male</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='female'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.female}
              />
              <span>Female</span>
            </div>
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Extras:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='swimmingpool'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.swimmingpool}
              />
              <span>Swimmingpool</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                name='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort :</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              name='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          
          <button className='bg-dark-blue text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-dark-blue mt-5'>
          Accomodation results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && accomodations.length === 0 && (
            <p className='text-xl text-red-500'>No accomodation found!</p>
          )}
          {loading && (
            <p className='text-xl text-dark-blue text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            accomodations &&
            accomodations.map((accomodation) => (
              <AccomodationItem key={accomodation._id} accomodation={accomodation} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}