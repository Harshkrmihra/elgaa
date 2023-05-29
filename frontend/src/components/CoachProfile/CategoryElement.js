import React from 'react'
import PropTypes from 'prop-types'

function CategoryElement(props) {
  return (
      <div className='bg-gray-50 bg-opacity-5 rounded-xl px-2 lg:px-4 py-1'>
        <p className='text-white text-lg'>
            {props.children}
        </p>
      </div>
  )
}

CategoryElement.propTypes = {}

export default CategoryElement
