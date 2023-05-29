import React from 'react'
import PropTypes from 'prop-types'

function RoleCoaches(props) {
  return (
      <div className={(props.className??"")+' flex-1 py-2 lg:py-8 px-3 lg:px-6 flex justify-around bg-bluegray-900 rounded-2xl items-center lg:rounded-lg'}>
          <div>
              <p className='text-white text-2xl lg:text-3xl font-oskari font-medium'>
                  {props.title}
              </p>
              <div className='uppercase text-white font-medium px-2 lg:px-5 font-oskari  mt-4 text-sm rounded-full border border-solid border-white whitespace-nowrap'>{props.coachesNumber} Coaches</div>
          </div>
          <div className='w-24 h-24 ltr:ml-4 ltr:lg:ml-8 rtl:mr-4 rtl:lg:mr-8'>
              <img src={props.icon} className='w-full h-full object-contain object-center' alt="League of legends top icon" />
          </div>
      </div>
  )
}

RoleCoaches.propTypes = {
    title: PropTypes.string,
    coachesNumber: PropTypes.number,
    icon: PropTypes.string,
    className: PropTypes.string
}

export default RoleCoaches
