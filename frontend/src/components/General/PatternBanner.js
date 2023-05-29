import React from 'react'
import sliced_pattern from '../../assets/sliced_pattern.svg'
import dattu from '../../assets/Dattu2.png'
import __ from '../../functions/I18N'
import { getGameByFriendlyUrl, getAllCoaches } from './api';

function PatternBanner(props) {
    const { gameData } = props; // Destructure the gameData prop from props
      // Check if gameData exists and has the required properties
  if (!gameData || !gameData.featuredStarQuote) {
    return null; // Return null or a placeholder if data is not available
  }
  return (
      <div className='side-paddings-except-mobile'>
          <div className="w-full mt-16 lg:mt-8 md:rounded-lg relative rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-primary-500 to-primary-dark py-2 sm:py-8  side-paddings">
              <div className="absolute top-0 rtl:right-0 ltr:left-0 w-full h-full">
                  <img src={sliced_pattern} className="w-full h-full object-cover object-center select-none rtl:transform rtl:-scale-x-100" draggable="false" alt="" />
              </div>
              <div className='flex relative justify-between'>
                  <div className='flex flex-col items-start lg:items-center rtl:pl-44 rtl:md:pl-64 rtl:lg:pl-0 ltr:pr-44 ltr:md:pr-64 ltr:lg:pr-0  lg:w-2/3 max-w-2xl lg:max-w-none'>
                    <h1 className='font-koverwatch ltr:text-left rtl:text-right text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white relative'>
                          {gameData.featuredStarQuote}
                    </h1>
                      <button className='bg-white mt-2 lg:mt-8 2xl:mt-12 text-primary-500 rounded-md px-4 sm:px-12 lg:px-20 text-lg lg:text-2xl py-1 lg:py-2 font-oskari font-bold uppercase'>
                          {__("Start Now")}
                      </button>
                  </div>
                  <div className=' w-52 md:w-64 lg:w-80 absolute lg:relative ltr:-right-4 rtl:-left-4 bottom-0'>
                      <div className='absolute -bottom-2 sm:-bottom-8 rtl:left-0 rtl:2xl:left-1/3 ltr:right-0 ltr:2xl:right-1/3 w-full'>
                      <img src={gameData.featuredStarImg} alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}


export default PatternBanner
