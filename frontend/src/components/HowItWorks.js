import React from 'react'
import PropTypes from 'prop-types'
import SectionHeading from './General/SectionHeading';
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react';
import { useState } from 'react';

function HowItWorks(props) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isSmallMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const [intervalId, setIntervalId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    let steps = [
    {
        title: 'Choose your coach',
        number: 1,
        details:{
            title: 'Choose from a lot of coaches',
            description: "Among the dozens of coaches in each game, you can choose the one you're most comfortable with. You can choose based on price, rating, available times and experience.",
            image: '/images/illustrations/how-it-works-1.png'
        }
    },
    {
        title: 'Choose your lesson',
        number: 2,
        details: {
            title: 'Select your perfect lesson',
            description: "After making sure of the coach you want to continue with, you can choose from a lot of lossons that the coach attached to his profile. In each lesson you can see the price, the duration and the details of the lesson. You can add more than one one to the basket to increase the number of hours.",
            image: '/images/illustrations/how-it-works-2.png'
        }
    },
    {
        title: 'Choose your lesson',
        number: 3,
        details: {
            title: 'Finish payment and get in touch with your coach',
            description: "After making sure of the coach you want to continue with, you can choose from a lot of lossons that the coach attached to his profile. In each lesson you can see the price, the duration and the details of the lesson. You can add more than one one to the basket to increase the number of hours.",
            image: '/images/illustrations/how-it-works-1.png'
        }
    }
];
const [activeStep, setActiveStep] = React.useState(1);
const [stepChanged, setStepChanged] = React.useState(false);
let handleActiveStep = (step) => {
    if (activeStep === step) {
        return;
    } else {
        setActiveStep(step);
    }
}
// make counter for steps
useEffect(() => {
    clearInterval(intervalId);
    setStepChanged(true);
    let counter = activeStep;
    let interval = setInterval(() => {
        setStepChanged(false);
        if (isTablet) {
            counter++;
        }
        if (counter > 3) {
            counter = 1;
        }
        setActiveStep(counter);
        setTimeout(() => {
            setStepChanged(true);
        }, 200);
    }, 10000);
    setIntervalId(interval);
    return () => clearInterval(interval);
}, []);

function pauseAutoChange() {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    setIntervalId(null);
    setTimeoutId(null);
    var progressBar = document.getElementById("progress-bar"),
    computedStyle = window.getComputedStyle(progressBar),
    width = computedStyle.getPropertyValue('width');
    progressBar.style.width=  width;
    setStepChanged(false);
}

function resumeAutoChange() {
    var progressBar = document.getElementById("progress-bar");
    // calculate time left to finish the progress bar
    var computedStyle = window.getComputedStyle(progressBar),
    width = computedStyle.getPropertyValue('width');
    var widthPercentage = parseInt(width) / parseInt(progressBar.parentElement.offsetWidth);
    var timeLeft = (1 - widthPercentage) * 10000;
    progressBar.style.transitionDuration = timeLeft + "ms";
    progressBar.style.width = "100%";
    let counter = activeStep;
    clearTimeout(timeoutId);
    let settimeout = setTimeout(() => {
        progressBar.style.transitionDuration = "";
        progressBar.style.width = "";
        setStepChanged(false);
        if (isTablet) {
            counter++;
        }
        if (counter > 3) {
            counter = 1;
        }
        setActiveStep(counter);
        setTimeout(() => {
            setStepChanged(true);
        }, 200);
        clearInterval(intervalId);
        let interval = setInterval(() => {
            setStepChanged(false);
            if (isTablet) {
                counter++;
            }
            if (counter > 3) {
                counter = 1;
            }
            setActiveStep(counter);
            setTimeout(() => {
                setStepChanged(true);
            }, 200);
        }, 10000);
        setIntervalId(interval);
    }
    , timeLeft);
    setTimeoutId(settimeout);
}


    

  return (
    <div>
          <SectionHeading title='How it works' />  
      <div className=' side-paddings mt-4'>
            {isTablet?
              <div onMouseDown={pauseAutoChange} onMouseLeave={resumeAutoChange} onMouseUp={resumeAutoChange} onTouchStart={pauseAutoChange} onTouchEnd={resumeAutoChange}   className='relative rtl:pl-44 ltr:pr-44 w-full bg-bluegray-900 rounded-lg overflow-hidden '>
                  <div className='absolute bottom-0 w-full h-2 bg-darkgray-200'>
                      <div id="progress-bar" style={{ transitionDuration: (stepChanged ? "10s":"") }} className={(stepChanged?"w-full":"w-0")+' ease-linear transition-all absolute bottom-0 h-2 bg-primary-500'}></div>
                  </div>
                  <div className="px-4 flex-1 pt-4 pb-8  max-w-lg">
                      <div className="mb-2 border-primary-500 rtl:ml-6 ltr:mr-6 rounded-xl  bg-bluegray-dark border-2 border-solid  py-2 px-2 flex items-center">
                          <div className="text-primary-500 border-primary-500 border-solid  rounded-full text-lg flex items-center font-oskari justify-center w-9 h-9  border-2">
                              {activeStep}
                          </div>
                          <p className="text-primary-500 flex-1 text-lg rtl:mr-2 ltr:ml-2  font-medium font-oskari">
                              {steps[activeStep - 1].title}
                          </p>
                      </div>

                      <h2 className='font-oskari font-medium text-xl text-white'>
                          {steps[activeStep-1].details.title}
                      </h2>
                      <p className='md:text-lg text-darkgray-200 rtl:pl-6 ltr:pr-6'>
                          {steps[activeStep-1].details.description}
                      </p>
                  </div>
                  <div className='absolute rtl:left-0 ltr:right-0 top-0 h-full w-52 pb-2'>
                      <img src={steps[activeStep-1].details.image} className="w-full h-full object-cover object-left " draggable={false} alt="" />
                  </div>
              </div>
            :
              <div className='flex bg-bluegray-900 rounded-xl overflow-hidden'>
                  <div className='w-1/2 py-8 px-8 pr-12'>
                      {(steps).map((step, index) => {
                          return <div key={index} onClick={() => handleActiveStep(step.number)} className={(step.number === activeStep ? "border-primary-500 " : "border-bluegray-dark hover:border-bluegray-500 hover:bg-bluegray-500") + (index > 0 ? " mt-8" : "") + ' transition-all cursor-pointer w-full rounded-xl  bg-bluegray-dark border-2 border-solid  py-6 px-4 flex items-center'}>
                              <div className={(step.number === activeStep ? "text-primary-500 border-primary-500 border-solid" : "text-darkgray-200 border-darkgray-200 border-dashed") + ' transition-all rounded-full text-lg flex items-center font-oskari justify-center w-9 h-9  border-2'}>
                                  {step.number}
                              </div>
                              <p className={(step.number === activeStep ? "text-primary-500" : "text-darkgray-200") + ' text-lg rtl:mr-4 ltr:ml-4 flex-1 line-clamp-2 text-primary-500 font-medium font-oskari transition-all'}>
                                  {step.title}
                              </p>
                          </div>
                      })}


                  </div>
                  <div className='w-1/2 pl-12 h-full overflow-hidden'>
                      {steps.map((step, index) => {
                          return <div key={index} className={(index % 2 === 0 ? "flex-col" : " flex-col-reverse") + (activeStep === step.number ? "" : " absolute hidden opacity-0 top-0 rtl:right-0 ltr:left-0") + " flex transition-all duration-500"}>
                              <div className={(index % 2 === 0 ? " h-52" : "  h-48") + ' w-full'}>
                                  <img src={step.details.image} className={(index % 2 === 0 ? " object-left-bottom" : " object-left-top") + ' w-full h-full object-cover'} draggable={false} alt="" />
                              </div>
                              <div className={(index % 2 === 0 ? "mt-0" : "mt-8 mb-auto")}>
                                  <h2 className='font-oskari font-medium text-xl text-white'>
                                      {step.details.title}
                                  </h2>
                                  <p className='text-lg text-darkgray-200 rtl:pl-6 ltr:pr-6'>
                                      {step.details.description}
                                  </p>
                              </div>
                          </div>
                      })}

                  </div>
              </div>}
    </div>
      </div>
  )
}

HowItWorks.propTypes = {}

export default HowItWorks
