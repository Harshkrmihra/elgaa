import React from 'react'
import { BsFillTagFill } from 'react-icons/bs'

function ProfileTag(props) {
  return (
      <div className='bg-darkgray-400 ltr:mr-2 rtl:ml-2 mb-2 flex items-center px-6 rounded-lg py-1 text-lg font-medium text-gray-400 hover:bg-darkgray-350 cursor-pointer'>
          <BsFillTagFill className='ltr:mr-2 rtl:ml-2'/> {props.children}
      </div>
  )
}


export default ProfileTag
