import React from 'react'
import PropTypes from 'prop-types'

function PopupBGDefault(props) {
  // onclick on any part of the screen, close the popup
  function close_popup(e) {
    if (e.target === e.currentTarget) {
      props.close_popup();
    }
  }

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      props.close_popup();
    }
  };
  return (
    <div className='w-full h-full ignore-swiper flex fixed  z-50 top-1/2 ltr:left-1/2 rtl:right-1/2 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 items-center justify-center text-white '>
      <div onClick={close_popup}  className="w-full h-full top-0 left-0 absolute bg-darkgray-600 opacity-80">
          </div>
              { props.children }
      </div>
  )
}

PopupBGDefault.propTypes = {}

export default PopupBGDefault
