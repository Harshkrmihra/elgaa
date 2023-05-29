import React from 'react'
import PropTypes from 'prop-types'
import large_pattern_red from '../assets/large_pattern_red.png'
import horizontal_small_pattern_black from '../assets/horizontal_small_pattern_black.png'
import calendar_image_small from '../assets/calendar_image_small.png'
import pricing_tickets from '../assets/pricing_tickets.png'
import platform_mobile_view from '../assets/platform_mobile_view.png'
function BecomingACoach(props) {
  return (
    <div className='side-paddings mt-8'>
          <div className='w-full rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-bluegray-900 rounded-xl to-primary-800 relative '>
              <img src={large_pattern_red} draggable={false} className="absolute select-none top-0 w-full h-full object-cover rtl:transform rtl:-scale-x-100" alt="" />
              <h1 className='w-full relative py-12 text-6xl sm:text-7xl text-center uppercase font-koverwatch text-white'>
                  Becoming A Coach
              </h1>
        
          </div>
          {[
            {
                title: 'Powerful booking system.',
                description: 'Our booking system is designed to make it easy for you to manage your schedule and accept bookings from your students.',
                image: calendar_image_small,
                imagePosition: 'left',
                paddings:true,
                flipOnRTL: false
            },
            {
                title: 'Flexible payment options.',
                description: 'We offer a variety of payment options to suit your needs. You can choose to be paid by the hour, by the lesson, or by the month.',
                image: pricing_tickets,
                imagePosition: 'right',
                paddings:false,
                flipOnRTL:true
                
            },
            {
                title: 'Web and Mobile-friendly coaching platform.',
                description: 'Our platform is designed to be easy to use on both web and mobile devices. You can manage your schedule, accept bookings, and chat with your students from anywhere.',
                image: platform_mobile_view,
                imagePosition: 'right-top',
                paddings:false,
                flipOnRTL:false
            },

          ].map((item,index) => (
              <div key={index} className='w-full bg-bluegray-900 mt-4 rounded-xl relative font-oskari'>
                  <img src={horizontal_small_pattern_black} draggable={false} className="absolute select-none top-0 w-full h-full object-cover rtl:transform rtl:-scale-x-100" alt="" />
                  <div className='flex gap-4 relative'>
                      <div className={(item.paddings ?"py-4 rtl:pr-4 ltr:pl-4 rounded-lg":"")+' w-32 lg:w-48 h-32 overflow-hidden'}>
                          <img src={item.image} className={(item.flipOnRTL?"rtl:transform rtl:-scale-x-100":"")+` w-full h-full object-cover object-${item.imagePosition} `} />
                      </div>
                      <div className='flex flex-col h-full justify-between ltr:text-left rtl:text-right flex-1 rtl:pl-4 ltr:pr-4 py-4'>
                          <h2 className='text-white font-medium text-xl'>
                              {item.title}
                          </h2>
                          <p className='text-darkgray-200'>
                              {item.description}
                          </p>
                      </div>
                  </div>
              </div>
              ))}
              <div className='flex font-oskari mt-4 lg:ltr:text-left rtl:text-right lg:max-w-4xl mx-auto items-center flex-wrap lg:flex-nowrap'>
                <div className='flex-1'>
                  <h2 className='text-xl lg:text-3xl font-medium text-white'>Our experts are taking home the bacon</h2>
                  <p className='text-darkgray-200 text-lg'>
                      We’re making it easy for the planet’s best gamers to build their online coaching business while earning some serious dough in the process.
                  </p>
                </div>
              <div className='lg:w-auto w-full'>
                  <button className="rounded-md bg-primary-500 hover:bg-primary-600 transition-colors mt-2 lg:mt-0 rtl:lg:mr-2 ltr:lg:ml-2 font-koverwatch text-3xl lg:text-xl py-4 lg:py-2 text-white w-full lg:px-12 xl:px-24">
                      Apply to become a COACH
                  </button>
              </div>
              </div>
    </div>
  )
}

BecomingACoach.propTypes = {}

export default BecomingACoach
