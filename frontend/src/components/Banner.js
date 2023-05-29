import React from 'react'
import PropTypes from 'prop-types'

function Banner(props) {
  return (
    <div className='w-full side-paddings py-6 lg:py-8 relative md:rounded-xl overflow-hidden'>
        <div className='w-full h-full absolute top-0 rtl:right-0 ltr:left-0'>
            <img src={props.bg} className='w-full h-full object-cover rtl:transform rtl:-scale-x-100' draggable={false} alt="" />
        </div>
        <div className='w-full lg:w-2/3 xl:w-1/2 relative'>
            <h2 className='font-koverwatch text-3xl md:text-5xl lg:text-6xl whitespace-pre-line text-white'>
                {props.title}
            </h2>
            <a href={props.button.href} className="md:mx-auto block">
            <button className='bg-white mt-4 md:mt-8 lg:mt-16 font-oskari uppercase text-black sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-lg lg:rounded-md px-8 lg:px-24 block md:mx-auto py-1 lg:py-4'>
                {props.button.title}
            </button>
            </a>
        </div>
    </div>
  )
}

Banner.propTypes = {}

export default Banner
