import React from 'react'
import PropTypes from 'prop-types'
import { BsArrowRight } from 'react-icons/bs'

function SectionHeading(props) {

  return (
      <div className={(props.disablePaddings ? "" :"side-paddings")+" "+(props.className??"")+' flex items-start xl:items-center'}>
          <div className='flex items-center flex-wrap xl:flex-nowrap flex-1'>
              <h2 className='font-koverwatch rtl:font-bold text-5xl xl:text-6xl text-white'>{props.title}</h2>
              {props.children}
          </div>
          {(props.link && props.linkTitle) &&
              <a href={props.link} className='text-primary-500 text-xl rtl:lg:mr-4 ltr:lg:ml-4 lg:px-4 py-2 flex items-center hover:underline  rounded-md '>{props.linkTitle}
               
                  <BsArrowRight className='rtl:mr-1 rtl:sm:mr-2 ltr:ml-1 ltr:sm:ml-2 ltr:transform-none transform rotate-180' />
               
              </a>
          }
      </div>
  )
}

SectionHeading.propTypes = {}

export default SectionHeading
