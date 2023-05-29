import React from 'react'
import PropTypes from 'prop-types'
import logo from '../assets/logo.svg';
import Footer from '../components/General/Footer';
import {Link } from 'react-router-dom'
function ExtraLayout(props) {
  return (
      <div  className="w-full h-full bg-darkgray-600 relative">

          <div className="flex">
              <div className='flex-1 w-full overflow-hidden  bg-darkgray-600'>
                  <div className="w-full relative bg-bluegray-600 px-36 py-4 lg:py-8 rtl:lg:pl-10 rtl:xl:pr-16 rtl:xl:pl-16 rtl:lg:pr-8 ltr:lg:pr-10 ltr:xl:pl-16 ltr:xl:pr-16 ltr:lg:pl-8 flex justify-center lg:justify-between items-center">
                      <div className=" w-32 flex text-center justify-center">
                          <img src={logo} className="w-full object-contain object-center" alt="" />
                      </div>
                      <div className="flex items-center absolute lg:static rtl:left-6 rtl:md:left-8 ltr:right-6 ltr:md:right-8 top-1/2 transform -translate-y-1/2 lg:transform-none">
                          <Link to="/"><button  className="rounded-md bg-primary-500 hover:bg-primary-600 transition-colors rtl:mr-2 ltr:ml-2 font-koverwatch text-xl py-1 lg:py-2 text-white px-4 lg:px-10">
                              Back to site
                          </button>
                          </Link>
                      </div>
                  </div>
                  {props.children}
                  <Footer />
              </div>
          </div>
      </div>
  )
}

ExtraLayout.propTypes = {}

export default ExtraLayout
