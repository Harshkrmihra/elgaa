import React from 'react'
import empty_library from '../../assets/empty_library.png'

function VideoLibrary(props) {
  return (
      <div className='lg:flex-1 w-full max-w-full lg:w-auto  lg:max-w-sm 2xl:max-w-lg ltr:text-left rtl:text-right lg:ml-4 lg:mt-0 mt-8'>
          <h1 className='font-koverwatch text-5xl'>Your library</h1>
          <div className=' bg-gradient-to-b from-darkgray-500 to-darkgray-600 py-8 px-4 xl:px-8 mt-4 rounded-lg'>
              <div className='w-48 h-48 md:w-52 md:h-52 lg:w-64 lg:h-52 xl:w-72 xl:h-64 mx-auto'>
                  <img src={empty_library} className="w-full h-full object-contain" alt="" />
              </div>
              <div className='text-center font-oskari text-lg'>
                  <p>Oops, your library looks empty!</p>
                  <p>Upload your videos to see them here</p>
                  <button className='bg-primary-500 hover:bg-primary-600 transition-colors font-oskari text-lg font-medium mt-4 side-paddings py-1 rounded-xl uppercase'>
                      Upload now
                  </button>
              </div>
          </div>
      </div>
  )
}

export default VideoLibrary
