import React from 'react'
import logo from '../../assets/logo.svg';
import AuthBG from './AuthBG';
function Auth(props) {
    return (
            <div className="w-full  text-white fixed z-50 top-1/2 ltr:left-1/2 rtl:right-1/2 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 xl:w-2/3 flex px-4 md:px-8  lg:side-paddings xl:px-32">
                <div className="hidden md:block w-1/3 bg-primary-500 rounded-l-xl relative overflow-hidden">
                    <div className="absolute bottom-10 w-full h-20 px-8 rounded-l-xl">
                        <img src={logo} className="h-full w-full object-contain object-center " alt="" />
                    </div>
                    <img src={props.banner} className='w-full h-full object-cover ' alt="" />
                </div>
                <div className="w-full md:w-2/3  bg-darkgray-500 rounded-l-xl md:rounded-l-none rounded-r-xl py-10 md:py-16 ltr:text-left rtl:text-right px-6 md:px-8 xl:side-paddings">
                    { props.children }

                </div>
            </div>
    )
}


export default Auth
