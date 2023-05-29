import React from 'react'
import PropTypes from 'prop-types'
import coach_image_full from '../../assets/coach_image_full.png'
import Notification from './Notification'
import SimpleBar from 'simplebar-react';
import { useState, useRef, useEffect } from 'react'

function NotificationsArea(props) {
    const [notificationGradientVisible, setNotificationGradientVisible] = useState(true);
    const notificationScrollRef = useRef(null);

    // make function to toggle notification gradient when scroll to bottom
    useEffect(() => {
        if (notificationScrollRef?.current) {
            notificationScrollRef.current.addEventListener('scroll', (e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.target;
                if (scrollTop + clientHeight + 200 >= scrollHeight) {
                    setNotificationGradientVisible(false);
                } else {
                    setNotificationGradientVisible(true);
                }
            })
        }
    }, [notificationScrollRef]);

  return (
      <div className='relative'>
          <div className={'bg-gradient-to-b from-transparent z-20 to-darkgray-600 absolute bottom-0 left-0 w-full transition-all' + (notificationGradientVisible ? " h-48" : " h-0")}></div>
          <SimpleBar scrollableNodeProps={{ ref: notificationScrollRef }} autoHide={true} style={{ maxHeight: "500px" }} className='mt-4 bg-darkgray-500 p-2 lg:p-4 rounded-lg overflow-auto no-scrollbar'>
              {props.notification.map((item, index) => {
                  return (
                      <Notification key={index} className="mb-4 last:mb-0" title={item.status} button_title="Go to coach profile" coach={item.coach} >
                          <p className='font-oskari text-xl lg:text-lg xl:text-xl'>
                              {item.description} on 
                              <span className='text-primary-500'> {item.day} {item.date} </span>
                              at
                              <span className='text-primary-500'> {item.time} </span> (GMT+2)
                          </p>
                      </Notification>
                  )
              })}
          </SimpleBar>
      </div>
  )
}

NotificationsArea.propTypes = {}

export default NotificationsArea
