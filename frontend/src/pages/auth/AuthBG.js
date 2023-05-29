import React from 'react'
import PropTypes from 'prop-types'
import authbg from '../../assets/auth-bg.png'

function AuthBG(props) {
  return (
      <div className='w-full h-full flex items-center justify-center bg-darkgray-600 text-white relative'>
          <div className="w-full h-full top-0 left-0 absolute">
              <img className="w-full h-full object-cover select-none" draggable="false" src={authbg} alt="" />
          </div>
          { props.children }
      </div>

  )
}

AuthBG.propTypes = {}

export default AuthBG
