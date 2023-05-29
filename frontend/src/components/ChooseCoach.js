import React, { useState, useEffect } from "react";
import intermediate_icon from "../assets/intermediate_icon.svg";
import advanced_icon from "../assets/advanced_icon.svg";
import beginner_icon from "../assets/beginner_icon.svg";
import { Rating } from "react-simple-star-rating";
import { getAllCoaches, getCoachLevel } from "../api"; // Import the necessary API functions
import { useMediaQuery } from "react-responsive";
import SectionHeading from "./General/SectionHeading";
import { Link } from "react-router-dom";
import __ from "../functions/I18N";

function ChooseCoach(props) {
  const [coaches, setCoaches] = useState([]); // State to store coaches data
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [maxCoaches, setMaxCoaches] = useState(6);
  const [gameId, setGameId] = useState();
  useEffect(() => {
    // Fetch the coaches data when the component mounts
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      // Make an API call to fetch all coaches
      const response = await getAllCoaches();
      if (props.game_Id) {
        const filteredCoaches = response.data.filter(
          (data) => data.game === props.game_Id
        );
        setCoaches(filteredCoaches);
      } else {
        setCoaches(response.data); // Update the coaches state with the fetched data
      }
    } catch (error) {
      console.log("Error fetching coaches:", error);
    }
  };

  const handleMaxCoaches = () => {
    if (maxCoaches === 6) {
      setMaxCoaches(12);
    } else {
      setMaxCoaches(6);
    }
  };

  return (
    <div>
      {props.showtitle ? (
        <SectionHeading
          title={__("Choose your coach")}
          link="#"
          linkTitle={__("See All")}
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
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 side-paddings">
        {coaches.map((coach, index) => {
          console.log("averageRating:", coach.averageRating);
          console.log("coachLevel:", coach.level);
          return (
            <Link key={index} to={"/@" + coach.username}>
              <div
                className="bg-bluegray-900 rounded-lg"
                style={{
                  opacity: index < maxCoaches ? "1" : "0",
                  transition: "all 0.5s ease-in-out",
                  transform:
                    index < maxCoaches ? "translateY(0px)" : "translateY(20px)",
                  position: "relative",
                  top: index < maxCoaches ? "0px" : "-20px",
                  overflow: "hidden",
                  maxHeight: index < maxCoaches ? "1000px" : "0px",
                  padding: index < maxCoaches ? "1rem" : "0px",
                  margin:
                    index < maxCoaches && !isMobile
                      ? "0.5rem"
                      : index < maxCoaches
                      ? "0.5rem 0px"
                      : "0px",
                }}
              >
                <div className="w-full h-48 max-w-lg mx-auto bg-white rounded-lg overflow-hidden relative">
                  <img
                    src={coach.coverPic}
                    className="w-full h-full object-cover object-center"
                    alt=""
                  />
                </div>
                <div className="max-w-lg w-full mx-auto">
                  <div className="flex justify-between items-center flex-wrap">
                    <h3 className="font-oskari text-white text-3xl font-medium rtl:ml-2 ltr:mr-2">
                      {coach.name}
                    </h3>
                    <div className="text-darkgray-100 border border-solid border-darkgray-100 rounded-md font-oskari text-lg py-1 px-2 my-2">
                      {__("Starting at")} ${coach.startingPrice}
                    </div>
                  </div>
                  <p className="font-oskari text-white text-xl ltr:text-left rtl:text-right">
                    {coach.expertise}
                  </p>
                  <div className="flex justify-between mt-2 flex-wrap">
                    <p className="font-oskari sm:text-xl text-darkgray-100">
                      {coach.gameName}
                    </p>
                    <div className="flex items-center rtl:ml-2 ltr:mr-2 sm:mx-2">
                      <img
                        src={
                          coach.level === "Intermediate"
                            ? intermediate_icon
                            : coach.level === "Beginner"
                            ? beginner_icon
                            : advanced_icon
                        }
                        width={isSmallMobile ? 10 : 15}
                        alt=""
                      />
                      <p className="rtl:mr-1 ltr:ml-1 font-oskari sm:text-xl text-darkgray-100">
                        {coach.level}
                      </p>
                    </div>
                    <Rating
                      ratingValue={(coach.averageRating * 100) / 5}
                      iconsCount={5}
                      fillColor={"#ED0033"}
                      emptyColor={"#42444D"}
                      size={isSmallMobile ? 20 : isMobile ? 25 : 30}
                      readonly={true}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {coaches.length > 6 && props.showmore === true ? (
        <div className="flex items-center mt-5 side-paddings-except-mobile">
          <div className="border-t w-full flex-1 border-darkgray-400"></div>
          <button
            onClick={handleMaxCoaches}
            className="text-primary-500 bg-darkgray-400 hover:bg-darkgray-300 py-3 rounded-xl font-oskari text-xl uppercase side-paddings"
          >
            {maxCoaches === 6 ? __("Show more coaches") : __("Show less")}
          </button>
          <div className="border-t w-full flex-1 border-darkgray-400"></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChooseCoach;
