import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { getAllGames } from '../api'; // Import the API function
import lol_cover from '../assets/LOL.png';
import valorant_cover from '../assets/valo.png';
import tft_cover from '../assets/TFT.png';
import overwatch_cover from '../assets/OW.png';
import rocket_league_cover from '../assets/RL.png';
import fortnite_cover from '../assets/Fortnite.png';
import rss_cover from '../assets/RSS.png';
import apex_cover from '../assets/Apex.png';
import brawlhalla_cover from '../assets/Brawlhalla.png';
import csgo_cover from '../assets/csgo.png';
import clash_royale_cover from '../assets/Clash Royale.png';
import lor_cover from '../assets/LOR.png';
import ww_cover from '../assets/WW.png';
import dota_cover from '../assets/Dota 2.png';
import fifa_cover from '../assets/fifa.png';
import axios from "axios";

function ChooseGameSlider(props) {
  const gameData = [
    { cover: lol_cover, title: 'League of Legends' },
    { cover: valorant_cover, title: 'Valorant' },
    { cover: fifa_cover, title: 'FIFA 23' },
    { cover: overwatch_cover, title: 'Overwatch' },
    { cover: rocket_league_cover, title: 'Rocket League' },
    { cover: fortnite_cover, title: 'Fortnite' },
    { cover: rss_cover, title: 'Rainbow Six Siege' },
    { cover: apex_cover, title: 'Apex Legends' },
    { cover: brawlhalla_cover, title: 'Brawlhalla' },
    { cover: csgo_cover, title: 'CS:GO' },
    { cover: clash_royale_cover, title: 'Clash Royale' },
    { cover: lor_cover, title: 'Legends of Runeterra' },
    { cover: ww_cover, title: 'World of Warcraft' },
    { cover: dota_cover, title: 'Dota 2' },
    { cover: fifa_cover, title: 'FIFA 22' },
  ];

  const [games, setGames] = useState([]);

  useEffect(() => {
   // Fetch games from the backend
    getAllGames()
      .then(response => {
        setGames(response.data);
        console.log("Game data",response);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
console.log("Game Slider");


// axios.defaults.headers.common['Authorization'] = `Bearer ${yourToken}`;
//     axios
//     .post(
//       `${process.env.REACT_APP_BACKEND_ENDPOINT}`
//     )
//     .then((response) => {
//       // Handle the response from the backend
//       console.log(response);
//       setGames(response.data)
//       // toast.success("Data Saved Successfully");
//     })
//     .catch((error) => {
//       // Handle any error that occurred during the request
//       console.error(error);
//       // toast.error("Error! Please Try Again");
//     });
  }, []);

  return (
    <div className='w-full h-80 lg:h-96 select-none ignore-swiper flex justify-center'>
      <Swiper
        slidesPerView='auto'
        spaceBetween={0}
        slidesPerGroupAuto={true}
        modules={[Pagination]}
        className='mySwiper'
      >
        {games.map((game, index) => (
          <SwiperSlide
            key={game._id}
            className='text-white w-32 h-96 pr-3 lg:pr-6 rtl:pl-3 rtl:lg:pl-6 rtl:pr-0 ml-5'
          >
            <Link to={`/${game.friendlyUrl}`}>
              <div className='w-48 h-80 text-white'>
                <div className='w-full h-64'>
                  <img src={gameData[index].cover} alt={gameData[index].title} />
                </div>
                <p className='font-oskari text-lg ltr:text-left rtl:text-right'>
                  {gameData[index].title}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

ChooseGameSlider.propTypes = {};

export default ChooseGameSlider;
