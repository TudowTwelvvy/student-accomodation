import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { FaPersonSwimming } from 'react-icons/fa6'
import { FaChair, FaUniversity } from 'react-icons/fa'

export default function AccomodationItem({ accomodation }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/accomodation/${accomodation._id}`}>
        <img
          src={
            accomodation.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt="accomodation cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {accomodation.name}
          </p>
          <div className="flex items-center gap-1">
            <FaUniversity className="h-4 w-4 text-dark-blue" />
            <p className="text-sm text-gray-600 truncate w-full">
              {accomodation.university}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {accomodation.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {accomodation.description}
          </p>
          <div className="flex justify-between gap-3 mt-4">
            <p className="text-pri-blue text-md font-semibold ">
              {accomodation.singles
                ? `Singles: R ${accomodation.singlesPrice.toLocaleString(
                    'en-ZA'
                  )}`
                : ''}
            </p>
            <p className="text-pri-blue text-md font-semibold ">
              {accomodation.sharing
                ? `Sharing: R ${accomodation.sharingPrice.toLocaleString(
                    'en-ZA'
                  )}`
                : ''}
            </p>
          </div>

          <div className="flex mt-3 justify-center gap-2 items-center ring-1 ring-gray-400 w-max rounded-md px-4 py-2">
            {accomodation.furnished ? (
              <FaChair className=" text-green-700" />
            ) : (
              ''
            )}
            {accomodation.swimmingpool ? (
              <FaPersonSwimming className=" text-green-700" />
            ) : (
              ''
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
