import React from 'react';
import PropTypes from 'prop-types';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BiExport } from 'react-icons/bi';
import ReadMoreText from '../General/ReadMoreText';
import { useState } from 'react';

function ProfileActions(props) {
  const { coachData } = props;
  console.log('coachData:', coachData);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  function toggle_isFavorite() {
    setIsFavoriteLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsFavorite(!isFavorite);
      setIsFavoriteLoading(false);
    }, 1000);
  }

  return (
    <div className='w-full py-4 bg-bluegray-900 rounded-xl'>
      <div className='flex items-center justify-between px-4 space-x-2 rtl:space-x-reverse'>
        <button className='bg-darkgray-400 flex-1 uppercase text-base py-2 px-4 hover:bg-darkgray-350 disabled:hover:bg-darkgray-400 disabled:cursor-not-allowed disabled:opacity-20 text-white font-oskari cursor-pointer flex items-center justify-center rounded-xl'>
          <BiMessageRounded className='text-2xl ltr:mr-2 rtl:ml-2' /> Send a message
        </button>
        <button disabled={isFavoriteLoading} onClick={toggle_isFavorite} className='bg-darkgray-400 lg:flex-1 uppercase text-base py-2 px-4 hover:bg-darkgray-350 disabled:hover:bg-darkgray-400 disabled:cursor-not-allowed disabled:opacity-20 text-white font-oskari cursor-pointer flex items-center justify-center rounded-xl'>
          {!isFavorite ? (
            <>
              <AiOutlineHeart className='text-2xl ltr:lg:mr-2 rtl:lg:ml-2' />
              <span className='hidden lg:inline'>Add to favorites</span>
            </>
          ) : (
            <>
              <AiFillHeart className='text-2xl ltr:lg:mr-2 rtl:lg:ml-2' />
              <span className='hidden lg:inline'>Favorited</span>
            </>
          )}
        </button>
        <button className='bg-darkgray-400 lg:flex-1 uppercase text-base py-2 px-4 hover:bg-darkgray-350 disabled:hover:bg-darkgray-400 disabled:cursor-not-allowed disabled:opacity-20 text-white font-oskari cursor-pointer flex items-center justify-center rounded-xl'>
          <BiExport className='text-2xl ltr:lg:mr-2 rtl:lg:ml-2' />
          <span className='hidden lg:inline'>Share profile</span>
        </button>
      </div>
      <hr className='border-gray-600 my-4' />
      <div className='p-4'>
        <h2 className='text-2xl font-medium font-oksari text-white'>Bio</h2>
        <div className='text-xl font-oksari text-bluegray-200'>
          {coachData && coachData.bio ? (
            <ReadMoreText min={400} text={coachData.bio} />
          ) : (
            <p>No bio available</p>
          )}
        </div>
      </div>
    </div>
  );
}

ProfileActions.propTypes = {
  coachData: PropTypes.object,
};

export default ProfileActions;
