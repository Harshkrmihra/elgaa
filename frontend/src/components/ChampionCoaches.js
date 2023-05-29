import React from 'react'
import PropTypes from 'prop-types'

function ChampionCoaches(props) {
    return (
        <div className={(props.className??"") + ' flex-1 h-32 lg:h-48 flex justify-between bg-bluegray-900 rounded-2xl lg:rounded-lg overflow-hidden'}>
            <div className='flex h-full flex-col justify-center space-y-4 ltr:pl-2 ltr:lg:pl-8 rtl:pr-2 rtl:lg:pr-8'>
                <p className='text-white text-2xl lg:text-3xl font-oskari font-medium'>
                    {props.title}
                </p>
                <div className='uppercase text-white font-medium px-3 lg:px-5 font-oskari  mt-4 text-sm rounded-full border border-solid border-white whitespace-nowrap'>{props.coachesNumber} Coaches</div>
            </div>
            <div className='w-32 rounded-lg overflow-hidden h-full ltr:ml-2 ltr:lg:ml-8 rtl:mr-2 rtl:lg:mr-8'>
                <img src={props.image} className='w-full h-full object-cover object-top' alt="League of legends top icon" />
            </div>
        </div>
    )
}

ChampionCoaches.propTypes = {
    title: PropTypes.string,
    coachesNumber: PropTypes.number,
    icon: PropTypes.string,
    className: PropTypes.string
}

export default ChampionCoaches
