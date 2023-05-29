import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Rating } from 'react-simple-star-rating';
import SectionHeading from '../components/General/SectionHeading';
import RoleCoaches from '../components/RoleCoaches';
import ChampionCoaches from '../components/ChampionCoaches';
import AdvancedSearch from '../components/General/AdvancedSearch';
import HowItWorks from '../components/HowItWorks';
import PatternBanner from '../components/General/PatternBanner';
import top_icon from '../assets/league-of-legends/Top.png';
import jungle_icon from '../assets/league-of-legends/Jungle.png';
import mid_icon from '../assets/league-of-legends/Mid.png';
import adc_icon from '../assets/league-of-legends/Bot.png';
import support_icon from '../assets/league-of-legends/Sup.png';
import coach_bg from '../assets/BG.png';
import coach from '../assets/coach.png';
import aatrox_bg from '../assets/aatrox-bg.png';
import aatrox_cover from '../assets/league-of-legends/RiotX_ChampionList_aatrox.png';
import champion_coaches from '../data/champion_coaches';
import { getGameByFriendlyUrl, getAllCoaches } from '../api';

function Game(props) {
  const [gameData, setGameData] = useState({});
  const [coachesData, setCoachesData] = useState([]); // Add state to store coaches data
  const location = useLocation();

  const fetchGameAndCoachesByFriendlyUrl = async (friendlyUrl) => {
    try {
      // Fetch game data
      const gameResponse = await getGameByFriendlyUrl(friendlyUrl);
      console.log('Game API Response:', gameResponse);

      // If game data is fetched successfully
      if (gameResponse) {
        // Update game data state
        setGameData(gameResponse);

        // Fetch coaches data based on the game name
        const coachesResponse = await getAllCoaches({ gameName: gameResponse.gameName });
        console.log('Coaches API Response:', coachesResponse);

        // If coaches data is fetched successfully
        if (coachesResponse) {
          // Update coaches data state
          setCoachesData(coachesResponse);
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    const friendlyUrl = location.pathname.substring(1);
    fetchGameAndCoachesByFriendlyUrl(friendlyUrl);
  }, [location]);

  console.log('Game Data:', gameData);
  console.log('Coaches Data:', coachesData); // Log coaches data

  const {
    numberOfCoaches,
    gameType,
    featuredStarImg,
    featuredStarQuote,
    gameId,
    gameCover,
    gameName,
    gameTitle,
    gameDescription,
  } = gameData;
  
  return (
    <div>
        <div className="w-full  bg-darkgray-600 relative side-paddings py-16">
            <div className="w-full top-0 rtl:left-0 ltr:right-0">
                <img src={aatrox_bg} className='w-full h-full max-h-72 lg:max-h-fit select-none object-cover object-right absolute top-0 rtl:left-0 ltr:right-0 rtl:transform rtl:-scale-x-100' draggable={false} alt="" />
            </div>
                <div className='relative z-20 ltr:text-left rtl:text-right text-white lg:w-2/3'>
                    <div className='flex items-center flex-col lg:flex-row'>
                        <h1 className='text-4xl text-center lg:ltr:text-left rtl:text-right lg:text-6xl font-oskari font-medium uppercase'>
                        {gameData.gameName}
                        </h1>
                        <div className='flex mt-8 lg:mt-0'>
                          <div className='px-6 lg:px-8 uppercase py-1 rtl:lg:mr-4 ltr:lg:ml-4 text-lg  bg-primary-500 rounded-full  font-oskari font-medium'>
                        {gameData.gameType}
                          </div>
                          <div className='px-6 lg:px-8 whitespace-nowrap uppercase py-1 rtl:mr-2 rtl:lg:mr-4 ltr:ml-2 ltr:lg:ml-4 text-lg border border-solid border-white rounded-full  font-oskari font-medium'>
                        {gameData.numberOfCoaches} Coaches
                          </div>
                        </div>
                    </div>
                    <p className='text-lg hidden lg:block font-oskari mt-6'>
                    {gameData.gameDescription}
                    </p>
                    <button className='side-paddings hidden lg:block py-2 bg-primary-500 text-white font-oskari uppercase rounded-xl mt-6 font-medium hover:bg-primary-600 transition-colors'>
                        Find your coach now
                    </button>
                </div>
        </div>
        <div className='side-paddings'>
            <AdvancedSearch/>
        </div>

        <div className='ltr:text-left rtl:text-right mt-8'>
              
              <SectionHeading title='Top picks for you' link="#" linkTitle="See all" />
              <div className='w-full h-96 mt-4 ignore-swiper'>
                  <Swiper
                      slidesPerView='auto'
                      spaceBetween={20}
                      slidesPerGroupAuto={true}
                      className="mySwiper"
                  >

                      {[1,2,3,4,5,6,7,8,9,10].map((item, index) => (
                        coachesData?.data?.map((coach, coachIndex) => (
                          <SwiperSlide key={index} className={(index == 0 ? "ltr:ml-6 ltr:md:ml-8 ltr:xl:ml-12 ltr:2xl:ml-16 rtl:mr-6 rtl:md:mr-8 rtl:xl:mr-12 rtl:2xl:mr-16" : (index == 9 ? "ltr:mr-6 ltr:md:mr-8 ltr:xl:mr-12 ltr:2xl:mr-16 rtl:ml-6 rtl:md:ml-8 rtl:xl:ml-12 rtl:2xl:ml-16 " : ""))+' text-white w-32 h-96'}>
                              <Link to='/coach'><div className='w-48 h-96 text-white select-none'>
                                  <div className='w-full h-64 relative rounded-lg overflow-hidden'>
                                      <img src={coach_bg} className='absolute top-0 left-0 w-full h-full' alt="" />
                                      <img src={coach.profilePicture} className='w-full h-full object-cover relative' alt="" />
                                  </div>
                                  <div className='w-full bg-white text-center text-black  rounded-b-lg -mt-2 pt-2 pb-1'>
                                      <p className='font-oskari font-medium text-lg'>Starting at ${coach.startingPrice}</p>
                                  </div>
                                  <p className='font-oskari text-2xl ltr:text-left rtl:text-right font-bold'>{coach.name}</p>
                                  <p className='font-oskari text-bluegray-300 ltr:text-left rtl:text-right text-base -mt-1'>{coach.gameName} Coach</p>
                                  <div className='flex items-center -mt-2'>
                                      <Rating ratingValue={100} iconsCount={5} fillColor={"#ED0033"} emptyColor={"#42444D"} size={20} readonly={true} />
                                  </div>
                              </div></Link>
                          </SwiperSlide>
                        ))
                      ))}
                      
                  </Swiper>
              </div>
        </div>
        <div className='mt-16'>
              <PatternBanner />
        </div>

        <div className='mt-8 ltr:text-left rtl:text-right'>
              <SectionHeading title='Coaches by roles' />
              <div className='grid  side-paddings grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 mt-4 items-center flex-wrap'>
                <RoleCoaches title={'Top'} coachesNumber={6} icon={top_icon} />
                <RoleCoaches title={'Jungle'} coachesNumber={5} icon={jungle_icon} />
                <RoleCoaches title={'Mid'} coachesNumber={3} icon={mid_icon} />
                <RoleCoaches title={'Bot'} coachesNumber={12} icon={adc_icon} />
                <RoleCoaches title={'Support'} coachesNumber={6} icon={support_icon} />
            </div>
        </div>
        <div className=' ltr:text-left rtl:text-right mt-4'>
              <HowItWorks />
        </div>
        <div className=' ltr:text-left rtl:text-right mt-8'>
            <SectionHeading title='Coaches by champions' link="#" linkTitle="See all" >
                  <div className='flex items-center xl:w-auto w-full mt-4 xl:mt-0'>
                      <button className='text-darkgray-600 border border-solid border-white bg-white py-1 rounded-md font-oskari text-xl xl:text-lg px-4 sm:px-7 ltr:xl:ml-5 rtl:xl:mr-5'>Alphabetical</button>
                      <button className='text-white border border-solid border-white py-1 rounded-md font-oskari text-xl xl:text-lg px-4 sm:px-7 ltr:ml-2 ltr:sm:ml-5 rtl:mr-2 rtl:sm:mr-5'>Most popular</button>
                  </div>
            </SectionHeading>
              <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 mt-4 items-center flex-wrap side-paddings'>
                  {
                  champion_coaches.slice(0,12).map((coach, index) => (
                      <ChampionCoaches key={index} title={coach.name} coachesNumber={coach.coachesCount} image={coach.image} />
                    ))
                    }

            </div>
        </div>
      </div>
  )
}

Game.propTypes = {}

export default Game
