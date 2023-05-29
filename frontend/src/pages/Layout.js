import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import { BiSearch } from "react-icons/bi";
import { IoSparklesSharp } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import UserContext from "../Context/UserContext";

import { IoLogoGameControllerB } from "react-icons/io";
import { BsLightningChargeFill } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { IoLayersSharp } from "react-icons/io5";
import { MdBookmarks } from "react-icons/md";
import { BiBookmark } from "react-icons/bi";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Outlet, Link, useLocation } from "react-router-dom";

// import social media icons
import Footer from "../components/General/Footer";
import { useEffect } from "react";

import __ from "../functions/I18N";

function Layout(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuTranslate, setMenuTranslate] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [menuBlockerOpacity, setMenuBlockerOpacity] = useState(0);
  const { userToken, setUserToken,handleLogout ,isLoggedIn ,setIsLoggedIn,handleLogin} = useContext(UserContext);

  let location = useLocation();

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setMenuTranslate(0);
      setMenuBlockerOpacity(0);
    } else {
      setIsMenuOpen(true);
      setMenuTranslate(100);
      setMenuBlockerOpacity(0.4);
    }
  }
  // function to close menu when clicking outside of it
  function closeMenu(e) {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
      setMenuTranslate(0);
      setMenuBlockerOpacity(0);
    }
  }
  useEffect(() => {
    setIsMenuOpen(false);

  }, [location]);
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      let ltr = false;
      let rtl = false;

      if (document.getElementById("App").dir === "rtl") {
        rtl = true;
      } else {
        ltr = true;
      }
      if (swiping === false) {
        return;
      }
      setSwiping(false);
      if (
        (menuTranslate > 100 &&
          ((eventData.dir === "Right" && ltr) ||
            (eventData.dir === "Left" && rtl))) ||
        (eventData.velocity > 0.3 &&
          ((eventData.dir === "Right" && ltr) ||
            (eventData.dir === "Left" && rtl)))
      ) {
        setIsMenuOpen(true);
        setMenuBlockerOpacity(0.4);
      } else if (
        (menuTranslate < -100 &&
          ((eventData.dir === "Right" && rtl) ||
            (eventData.dir === "Left" && ltr))) ||
        (eventData.velocity > 0.3 &&
          ((eventData.dir === "Right" && rtl) ||
            (eventData.dir === "Left" && ltr)))
      ) {
        setIsMenuOpen(false);
        setMenuBlockerOpacity(0);
      }
      document.getElementById("sidebar").style.transform = ``;
    },
    onSwipeStart: (eventData) => {
      // get target element
      if (eventData.event.target.closest(".ignore-swiper")) {
        return;
      }
      if (eventData.dir === "Left" || eventData.dir === "Right") {
        setSwiping(true);
      }
    },
    onSwiping: (eventData) => {
      let ltr = false;
      let rtl = false;

      if (document.getElementById("App").dir === "rtl") {
        rtl = true;
      } else {
        ltr = true;
      }
      if (!swiping) {
        return;
      }
      if (
        ((eventData.dir === "Right" && ltr) ||
          (eventData.dir === "Left" && rtl)) &&
        !isMenuOpen
      ) {
        setMenuTranslate(eventData.deltaX);
        let translate = 100 - eventData.deltaX / 2;
        let opacity = eventData.deltaX / 500;
        if (rtl) {
          translate = 100 + eventData.deltaX / 2;
          opacity = -eventData.deltaX / 500;
        }
        if (opacity > 0.4) {
          opacity = 0.4;
        }
        setMenuBlockerOpacity(opacity);
        if (translate < 0) {
          translate = 0;
        }
        if (rtl) {
          document.getElementById(
            "sidebar"
          ).style.transform = `translateX(${translate}%)`;
        } else {
          document.getElementById(
            "sidebar"
          ).style.transform = `translateX(-${translate}%)`;
        }
      } else if (
        ((eventData.dir === "Right" && rtl) ||
          (eventData.dir === "Left" && ltr)) &&
        isMenuOpen
      ) {
        setMenuTranslate(eventData.deltaX);
        let translate = -1 * (eventData.deltaX / 2);
        let opacity = 0.4 + eventData.deltaX / 500;
        if (rtl) {
          translate = eventData.deltaX / 2;
          opacity = 0.4 - eventData.deltaX / 500;
        }

        if (opacity < 0) {
          opacity = 0;
        }

        setMenuBlockerOpacity(opacity);
        if (translate > 100) {
          translate = 100;
        }

        console.log(translate);

        if (rtl) {
          document.getElementById(
            "sidebar"
          ).style.transform = `translateX(${translate}%)`;
        } else {
          document.getElementById(
            "sidebar"
          ).style.transform = `translateX(-${translate}%)`;
        }
      }
    },
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },
  });

  return (
    <div {...handlers} className="w-full h-full bg-darkgray-600 relative">
      <div className="flex">
        <div
          style={{ opacity: menuBlockerOpacity * 1.5 }}
          onClick={closeMenu}
          className={
            (swiping ? "" : "transition-opacity ") +
            " " +
            (isMenuOpen || swiping ? "" : "hidden") +
            " fixed top-0 rtl:left-0 lg:rtl:right-0 ltr:left-0 w-full h-full bg-bluegray-900 z-20"
          }
        ></div>
        <div
          id="sidebar"
          style={{ maxWidth: "80vw" }}
          className={
            (swiping ? "" : "transition-transform") +
            " " +
            (isMenuOpen
              ? "translate-x-0"
              : "rtl:translate-x-full ltr:-translate-x-full") +
            " menu  w-80 lg:w-72 xl:w-80 rtl:lg:transform-none ltr:lg:transform-none transform h-screen bg-bluegray-600 flex flex-col fixed z-30"
          }
        >
          <div className="mt-8 px-20 text-center flex justify-center">
            <img src={logo} className="w-full" alt="" />
          </div>
          <div className="px-4 mt-8 lg:mt-16 text-2xl font-oskari">
            <Link to="/">
              <button className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center">
                <div className="ltr:text-left rtl:text-right">
                  <IoSparklesSharp className="ltr:mr-2 rtl:ml-2 inline" />{" "}
                  {__("Discover")}
                </div>
              </button>
            </Link>
            <Link to="/">
              <button className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center">
                <div className="ltr:text-left rtl:text-right">
                  <IoLogoGameControllerB className="ltr:mr-2 rtl:ml-2 inline" />{" "}
                  {__("Games")}
                </div>
              </button>
            </Link>
            <Link to="/game">
              <button className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center">
                <div className="ltr:text-left rtl:text-right">
                  <BsLightningChargeFill className="ltr:mr-2 rtl:ml-2 inline" />{" "}
                  {__("Coaches")}
                </div>
              </button>
            </Link>
            {isLoggedIn && (
              <>
                <hr className="border-bluegray-400 my-2" />
                <Link to="/dashboard">
                  <button className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center">
                    <div className="ltr:text-left rtl:text-right">
                      <IoLayersSharp className="ltr:mr-2 rtl:ml-2 inline" />{" "}
                      {__("Dashboard")}
                    </div>
                  </button>
                </Link>
                <button className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center">
                  <div className="ltr:text-left rtl:text-right">
                    <MdBookmarks className="ltr:mr-2 rtl:ml-2 inline" />{" "}
                    {__("Library")}
                  </div>
                </button>
                <hr className="border-bluegray-400 my-2" />
              </>
            )}
            {localStorage.getItem("language") === "en" ? (
              <button
                onClick={() => {
                  localStorage.setItem("language", "ar");
                  window.location.reload();
                }}
                className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center"
              >
                <div className="ltr:text-left rtl:text-right">
                  <IoLanguage className="ltr:mr-2 rtl:ml-2 inline" /> العربية
                </div>
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.setItem("language", "en");
                  window.location.reload();
                }}
                className="text-bluegray-200 hover:bg-bluegray-500 rounded-lg w-full rtl:pr-8 rtl:xl:pr-12 ltr:pl-8 ltr:xl:pl-12  py-4 flex items-center"
              >
                <div className="ltr:text-left rtl:text-right">
                  <IoLanguage className="ltr:mr-2 rtl:ml-2 inline" /> English
                </div>
              </button>
            )}
          </div>
          <div className="flex-1"></div>

          {/* only for testing */}
          {isLoggedIn ? (
            <div className="text-white px-4 my-4 font-oskari">
              {__("Currently logged in View")}{" "}
              <span
                onClick={() => {
                  handleLogout();
                }}
                className="font-medium underline cursor-pointer"
              >
                {__("Switch to Logged out view?")}
              </span>
            </div>
          ) : (
            <div className="px-4 text-white my-4 font-oskari">
              {__("Currently logged out View")}{" "}
              <span
                onClick={() => {
                  handleLogin();
                }}
                className="font-medium underline cursor-pointer"
              >
                {__("Switch to Logged in view?")}
              </span>
            </div>
          )}
          <Link to="/join" className="block px-4">
            <button className="flex items-center rounded-3xl bg-primary-500 hover:bg-primary-600 transition-colors  w-full mb-8 font-oskari text-xl py-4 text-white px-10">
              <BsLightningChargeFill className="ltr:mr-2 rtl:ml-2" />{" "}
              {__("Become a coach")}
            </button>
          </Link>
        </div>
        <div className="flex-1 w-full overflow-hidden  bg-darkgray-600 rtl:lg:pr-72 rtl:xl:pr-80 ltr:lg:pl-72 ltr:xl:pl-80">
          <div className="w-full relative bg-bluegray-600 pl-24 py-4 lg:py-8 px-2 lg:pr-10 xl:pr-16 lg:pl-8 flex justify-center lg:justify-between items-center">
            <div
              onClick={toggleMenu}
              className=" menu absolute lg:hidden top-1/2 transform -translate-y-1/2 rtl:right-8 ltr:left-8 w-12 h-10 border border-white rounded-md flex items-center justify-center "
            >
              <button
                aria-label="Open menu"
                className="text-white text-3xl font-oskari"
              >
                <BiMenu />
              </button>
            </div>
            <div className=" w-64 flex pr-24 lg:hidden text-center justify-center">
              <img
                src={logo}
                className="w-full object-contain object-center"
                alt=""
              />
            </div>
            <div className="flex-1 hidden lg:flex justify-start relative text-darkgray-300 focus-within:text-darkgray-200 group">
              <div className="absolute h-full flex items-center">
                <BiSearch className="group-hover:text-darkgray-200 text-3xl" />
              </div>
              <input
                type="text"
                className="py-4 ltr:mr-8 rtl:ml-8 px-4 border-b rtl:pr-10 ltr:pl-10 hover:border-darkgray-100 focus:border-darkgray-100
                    focus:w-full transition-all w-1/2 placeholder-darkgray-300 text-darkgray-300 hover:text-darkgray-100
                    focus:text-darkgray-100 font-oskari text-xl border-darkgray-300 bg-transparent outline-none"
                placeholder="Search"
              />
            </div>
            <div className="hidden lg:flex items-center">
              <Link to="game">
                <button className="rounded-md border-2 border-solid ltr:mr-2 rtl:ml-2 hover:bg-white hover:text-darkgray-400 transition-colors  border-white font-koverwatch text-xl py-2 text-white px-10">
                  {__("Choose Your Coach")}
                </button>
              </Link>
              {isLoggedIn ? (
                <button className="rounded-md bg-primary-500 hover:bg-primary-600 transition-colors ml-2 font-koverwatch text-xl py-2 text-white px-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <img
                      src="https://thispersondoesnotexist.com/image"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </button>
              ) : (
                <button
                  onClick={props.toggle_login}
                  className="rounded-md bg-primary-500 hover:bg-primary-600 transition-colors  ml-2 font-koverwatch text-xl py-2 text-white px-10"
                >
                  {__("Log in")}
                </button>
              )}
            </div>
          </div>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
