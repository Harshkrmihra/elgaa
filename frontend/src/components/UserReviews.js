import React, { useEffect, useState } from "react";
import { getReviews } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import lol_cover from "../assets/LOL.png";
import "swiper/css";
import { Rating } from "react-simple-star-rating";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import SectionHeading from "./General/SectionHeading";
import __ from "../functions/I18N";

const UserReviews = () => {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        const data = response.data;
        if (data.success) {
          console.log("User Reviews ", data.data);
          setReviews(data.data);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="">
      <SectionHeading title={__("Read User Reviews")} />
      <div className="w-full h-72 mt-4 ignore-swiper">
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          slidesPerGroupAuto={true}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="text-white w-32 h-96">
              <div
                className={
                  (index === 0
                    ? "ltr:ml-6 ltr:md:ml-8 ltr:xl:ml-12 ltr:2xl:ml-16 rtl:mr-6 rtl:md:mr-8 rtl:xl:mr-12 rtl:2xl:mr-16"
                    : index === reviews.length - 1
                    ? "ltr:mr-6 ltr:md:mr-8 ltr:xl:mr-12 ltr:2xl:mr-16 rtl:ml-6 rtl:md:ml-8 rtl:xl:ml-12 rtl:2xl:ml-16"
                    : "") + " w-96 h-72 text-white bg-black"
                }
              >
                <div className="w-full h-full bg-gradient-to-br py-4 px-8 rounded-xl from-primary-dark to-primary-600 hover:from-primary-600 hover:to-primary-dark">
                  <div className="flex justify-between">
                    <Rating
                      ratingValue={(review.rating * 100) / 5}
                      iconsCount={5}
                      fillColor={"#ED0033"}
                      emptyColor={"#42444D66"}
                      size={25}
                      readonly={true}
                    />
                    <div>
                      <p className="font-oskari text-lg ltr:text-left rtl:text-right text-white font-medium">
                        {timeAgo.format(new Date(review.createdAt))}
                      </p>
                    </div>
                  </div>
                  <div className="text-xl lg:text-2xl text-white font-bold ltr:text-left rtl:text-right mt-4">
                    {review.customer.username} {/* Display the username */}
                  </div>
                  <div className="mt-4 ltr:text-left rtl:text-right line-clamp-4">
                    {review.content}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default UserReviews;
