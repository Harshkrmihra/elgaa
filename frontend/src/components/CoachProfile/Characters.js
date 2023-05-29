import React from 'react'
import {useState} from 'react'
function Characters(props) {
    const [showExtraCharacters, setShowExtraCharacters] = useState(false);
    function toggle_showExtraCharacters() {
        setShowExtraCharacters(!showExtraCharacters);
    }
  return (
      <div className={(showExtraCharacters ? "flex-wrap" : "") + ' flex lg:mt-4'}>
          {props.characters.map((character, index) => {
              return (
                  <div key={index} className={(index > 3 && !showExtraCharacters ? "overflow-hidden w-0 h-0 opacity-0 " : "w-12 h-12 opacity-100 " + (showExtraCharacters ? "ltr:mr-2 rtl:ml-2 mb-4" : "ltr:-mr-4 rtl:-ml-4")) + ' transition-all group relative'}>
                      <div className='h-full w-full   rounded-full overflow-hidden relative'>
                          <img src={"/images/league-of-legends/champions/covers/" + character + ".jpg"} className='w-full h-full object-cover object-top' alt="" />
                      </div>
                      <div className='absolute bg-darkgray-300 py-1 px-4 rounded-md opacity-0 transition-all text-white text-sm z-50 top-full transform -translate-y-0 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 group-hover:opacity-100 group-hover:translate-y-2'>
                          {character}
                      </div>
                  </div>
              )
          })}

          {props.characters.length - 4 > 0 && (
              <div>
                  <div onClick={toggle_showExtraCharacters} className={(showExtraCharacters ? "hidden" : "") + ' w-12 h-12 relative rounded-full overflow-hidden bg-darkgray-400 flex items-center justify-center text-xl text-white hover:bg-darkgray-350 cursor-pointer'}>
                      +{props.characters.length - 4}
                  </div>

                  <div onClick={toggle_showExtraCharacters} className={(showExtraCharacters ? "" : "hidden") + ' w-12 h-12 relative rounded-full overflow-hidden  flex items-center justify-center text-xl text-darkgray-200 border border-solid border-darkgray-200 hover:bg-darkgray-500 cursor-pointer'}>
                      X
                  </div>
              </div>

          )

          }
      </div>
  )
}


export default Characters
