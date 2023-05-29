import React from 'react'
import PropTypes from 'prop-types'
import logo_grey from '../../assets/logo_grey.svg';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTwitch, FaDiscord } from 'react-icons/fa';
import {Link } from 'react-router-dom'
function Footer(props) {
  return (
    <div>
          <div className='w-full bg-bluegray-900 side-paddings py-8 mt-8 flex flex-wrap lg:flex-nowrap font-oskari justify-between text-darkgray-200'>
              <div className='flex-1 w-full xl:max-w-md lg:w-auto min-w-min '>
                  <div className='w-48 h-24 mx-auto lg:mx-0'>
                      <img src={logo_grey} alt="El Gaming Academy Logo Grey" className='w-full h-full object-contain' />
                  </div>
                  <p className='text-xl text-center lg:ltr:text-left rtl:text-right mt-4'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum assumenda voluptates consectetur, sint eligendi eum harum reiciendis tempora repellendus laudantium quis natus nihil officia odio ex blanditiis inventore minus in!
                  </p>
                  <hr className='my-4 border-darkgray-400 block lg:hidden' />

              </div>
              <div className='xl:flex-1 w-full lg:w-auto xl:space-x-2 rtl:space-x-reverse  flex flex-wrap xl:flex-nowrap xl:max-w-2xl lg:max-w-xs max-w-none flex-row-reverse justify-center lg:justify-between lg:text-right text-center'>
                  <div className='xl:flex-1 w-full xl:w-auto'>
                      <ul className='mt-4 flex flex-wrap justify-center lg:block space-x-3 rtl:space-x-reverse lg:space-x-0'>
                          <li className='text-xl hover:text-white'>Advertise</li>
                          <li className='text-xl hover:text-white'>Affilates</li>
                          <li className='text-xl hover:text-white'>Careers</li>
                          <li className='text-xl hover:text-white'>Contact Us</li>
                      </ul>
                  </div>
                  <div className='xl:flex-1 w-full xl:w-auto'>
                      <ul className='mt-4 flex flex-wrap justify-center lg:block space-x-3 rtl:space-x-reverse lg:space-x-0'>
                          <Link to="terms"><li className='text-xl hover:text-white'>Terms & Conditions</li></Link>
                          <li className='text-xl hover:text-white'>Privacy Policy</li>
                          <li className='text-xl hover:text-white'>Refund Policy</li>
                          <li className='text-xl hover:text-white'>Support</li>
                      </ul>
                  </div>
                  <div className='xl:flex-1 w-full xl:w-auto'>
                      <ul className='mt-4 flex flex-wrap justify-center lg:block space-x-3 rtl:space-x-reverse lg:space-x-0'>
                          <li className='text-xl hover:text-white'>About Us</li>
                          <li className='text-xl hover:text-white'>Become a coach</li>
                          <li className='text-xl hover:text-white'>Partnerships and Alliances</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className='bg-bluegray-700 py-4 side-paddings flex lg:space-x-2 space-y-8 rtl:space-x-reverse lg:space-y-0 lg:flex-nowrap flex-wrap justify-between items-center'>
              <div className="flex space-x-3 rtl:space-x-reverse lg:justify-start justify-center w-full lg:w-auto">
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaInstagram />
                  </div>
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaDiscord />
                  </div>
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaFacebookF />
                  </div>
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaTwitter />
                  </div>
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaTwitch />
                  </div>
                  <div className='w-12 h-12 p-1 flex items-center justify-center text-4xl text-darkgray-200 bg-darkgray-200 bg-opacity-25 hover:bg-opacity-50'>
                      <FaYoutube />
                  </div>
              </div>
              <div className='text-darkgray-200 text-xl font-oskari w-full lg:w-auto text-center lg:text-right'>
                  Copyrights Ⓒ {new Date().getFullYear()} El Gaming Academy Ltd. All Rights Reserved

              </div>
          </div>
    </div>
    
  )
}

Footer.propTypes = {}

export default Footer
