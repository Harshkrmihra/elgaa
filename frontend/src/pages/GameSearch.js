import React from 'react'
import AdvancedSearch from '../components/General/AdvancedSearch'
import { IoIosArrowBack } from 'react-icons/io'
import ChooseCoach from '../components/ChooseCoach'
function GameSearch(props) {
  return (
      <div className=''>
        <p className='text-darkgray-200 font-oskari flex items-center my-4 ltr:text-left rtl:text-right hover:underline cursor-pointer side-paddings'>
        <IoIosArrowBack className='mr-2'/> Back to League of Legends
        </p>
        <div className='side-paddings'>
          <AdvancedSearch/>
        </div>

        <div>
            <ChooseCoach showmore={false} limit={20} showtitle={false} />
        </div>
    </div>
  )
}

export default GameSearch
