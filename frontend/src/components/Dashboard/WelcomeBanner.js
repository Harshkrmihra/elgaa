import React from 'react'
import pattern from '../../assets/pattern.png'
import {useState,useEffect} from 'react'
function WelcomeBanner(props) {
    const [welcomingText, setWelcomingText] = useState('Good Morning');

    function checkWelcomingText() {
        const date = new Date();
        const hour = date.getHours();
        if (hour < 12) {
            setWelcomingText('Good Morning');
        } else if (hour < 18) {
            setWelcomingText('Good Afternoon');
        } else {
            setWelcomingText('Good Evening');
        }
        return hour;
    }

    useEffect(() => {
        checkWelcomingText();
    }, []);
  return (
      <div className='w-full rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-bluegray-900 rounded-xl to-primary-800 relative '>
          <img src={pattern} draggable={false} className="absolute select-none top-0 w-full h-full rtl:left-0 ltr:right-0 object-cover rtl:transform rtl:-scale-x-100 " alt="" />
          <h1 className='w-full relative side-paddings py-12 text-5xl ltr:text-left rtl:text-right uppercase font-koverwatch'>
              <span className='opacity-50'>{welcomingText}, </span>
              <span >{props.username}</span>
          </h1>
      </div>
  )
}


export default WelcomeBanner
