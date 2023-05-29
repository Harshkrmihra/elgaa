import React, { useEffect, useState } from "react";
import project_yasuo_bg from "../assets/project-yasuo-bg.png";
import ChooseGameSlider from "../components/ChooseGameSlider";
import ChooseCoach from "../components/ChooseCoach";
import UserReviews from "../components/UserReviews";
import Courses from "../components/Courses";
import Banner from "../components/Banner";
import banner_bg from "../assets/banner_bg.png";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import PatternBanner from "../components/General/PatternBanner";
import SectionHeading from "../components/General/SectionHeading";
import __ from "../functions/I18N";
function Home(props) {


  return (
    <div className="w-full py-24 relative bg-darkgray-600  ltr:text-left rtl:text-right">
      <div className="absolute w-full h-full max-h-screen top-0 left-0">
        <img
          src={project_yasuo_bg}
          className="w-full h-full object-cover object-right-top"
          alt=""
        />
      </div>
      <div className="absolute w-full h-full max-h-screen  top-0 left-0 bg-gradient-to-bl from-transparent to-darkgray-600"></div>
      <div className="absolute w-full h-full max-h-screen  top-0 left-0 bg-gradient-to-b from-transparent to-darkgray-600"></div>
      <div className="w-full relative">
        <h1 className="text-white rtl:font-bold text-7xl sm:text-8xl text-center lg:ltr:text-left rtl:text-right font-koverwatch side-paddings">
          {__("Your Way To")} <br />
          <span className="text-primary-500">{__("Become a Pro")}</span>
        </h1>
        <SectionHeading
          className="mt-4"
          title={__("Choose your game")}
          link="#"
          linkTitle={__("See All")}
        />
        <ChooseGameSlider />
        <PatternBanner />

        <div className="mt-8">
          <ChooseCoach showtitle={true} showmore={true} />
        </div>
        <div className="mt-8">
          <UserReviews />
        </div>
        <div className="mt-8">
          <Courses />
        </div>
        <div className="mt-8 side-paddings-except-mobile">
          <Banner
            title={__(
              "Thousands of users are using \n EL GAMING ACADEMY Everyday!"
            )}
            bg={banner_bg}
            button={{ title: __("Learn how it works"), href: "#" }}
          />
        </div>
        <div className="mt-8">
          <HowItWorks />
        </div>
        <div className="mt-8">
          <FAQ two_col={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;
