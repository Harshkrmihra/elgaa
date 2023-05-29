import React, { useEffect, useState } from "react";
import ornn_course_pic from "../assets/OrnnCoursePic.png";
import ahri_course_pic from "../assets/AhriCoursePic.png";
import { Rating } from "react-simple-star-rating";
import SectionHeading from "./General/SectionHeading";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import __ from "../functions/I18N";
import { getAllService } from "../api";
function Courses(props) {
  const [courses, setCourses] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 500px)" });
  useEffect(() => {
    // Fetch the coaches data when the component mounts
    fetchCourseData();

  }, []);

  const fetchCourseData = async () => {
    try {
     var res= await getAllService();
     if(res){
      setCourses(res.data.data);
      console.log("Service",res);
     }
    } catch (error) {
      console.log("Service Error", error);
    }
  };

    // let courses = [
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Master Ahri in 1 Month",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ahri_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    //   {
    //     name: "Get me out of bronze",
    //     rating: 4,
    //     numReviews: 40,
    //     image: ornn_course_pic,
    //     game: "League of Legends",
    //     by: "Demonologist",
    //     price: 35,
    //     duration: "6",
    //     durationType: "hours",
    //   },
    // ];
  const [maxCourses, setMaxCourses] = useState(6);
  let handleMaxCourses = function () {
    if (maxCourses === 6) {
      setMaxCourses(12);
    } else {
      setMaxCourses(6);
    }
  };
  return (
    <div>
      <SectionHeading
        title={__("Recommended Courses")}
        link="#"
        linkTitle={__("See all")}
      >
        <div className="flex items-center xl:w-auto w-full mt-4 xl:mt-0">
          <button className="text-darkgray-600 border border-solid border-white bg-white py-1 rounded-md font-oskari text-xl xl:text-lg px-4 sm:px-7 ltr:xl:ml-5 rtl:xl:mr-5">
            {__("Featured")}
          </button>
          <button className="text-white border border-solid border-white py-1 rounded-md font-oskari text-xl xl:text-lg px-4 sm:px-7 ltr:ml-2 ltr:sm:ml-5 rtl:mr-2 rtl:sm:mr-5">
            {__("Newest")}
          </button>
        </div>
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 side-paddings">
        {courses?.map((course, index) => (
          <Link key={index} to="/coach">
            <div
              className="flex bg-bluegray-900 rounded-lg"
              style={{
                opacity: index < maxCourses ? "1" : "0",
                transition: "all 0.5s ease-in-out",
                transform:
                  index < maxCourses ? "translateY(0px)" : "translateY(20px)",
                position: "relative",
                top: index < maxCourses ? "0px" : "-20px",
                overflow: "hidden",
                maxHeight: index < maxCourses ? "1000px" : "0px",
                padding: index < maxCourses ? "1rem" : "0px",
                margin:
                  index < maxCourses && !isMobile
                    ? "0.5rem"
                    : index < maxCourses
                    ? "0.5rem 0px"
                    : "0px",
              }}
            >
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  className="w-full h-full object-cover object-center"
                  alt=""
                />
              </div>
              <div className="flex flex-col  justify-center rtl:mr-5 ltr:ml-5">
                <p className="text-white font-oskari text-xl font-medium">
                  {course.title}
                </p>
                <p className="text-darkgray-200 font-medium text-lg font-oskari">
                  by {course.coach.name}
                </p>
                <div className="flex items-center">
                  <Rating
                    ratingValue={course.rating * 20}
                    iconsCount={5}
                    fillColor={"#ED0033"}
                    emptyColor={"#42444D"}
                    size={isSmallMobile ? 20 : 25}
                    readonly={true}
                  />
                  <p className="text-primary-500 font-medium sm:text-lg font-oskari rtl:mr-2 ltr:ml-2">
                    ({course.numReviews})
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center sm:justify-between sm:py-5 justify-self-end rtl:mr-auto ltr:ml-auto space-y-4 sm:space-y-0 ">
                <div className="px-2 sm:px-4 py-1 text-white bg-darkgray-300 text-xl font-oskari rounded-md text-center whitespace-nowrap">
                  ${course.price}
                </div>
                <div className="px-2 sm:px-4 py-1 text-white border border-solid border-darkgray-300 text-xl font-oskari rounded-md text-center whitespace-nowrap">
                {(course.duration / 60).toFixed(2)} {__("hrs")}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {courses.length > 6 ? (
        <div className="flex items-center mt-2 lg:mt-5">
          <div className="border-t w-full flex-1 border-darkgray-400"></div>
          <button
            onClick={handleMaxCourses}
            className="text-primary-500 bg-darkgray-400 hover:bg-darkgray-300 py-3 rounded-xl font-oskari text-xl uppercase side-paddings"
          >
            {maxCourses === 6 ? __("Show more courses") : __("Show less")}
          </button>
          <div className="border-t w-full flex-1 border-darkgray-400"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Courses;
