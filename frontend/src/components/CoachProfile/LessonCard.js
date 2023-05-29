import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import lesson_thumb from '../../assets/lesson_thumb.png';

function LessonCard(props) {
  const { coachData, serviceData } = props;

  return (
    <label className='group relative cursor-pointer'>
      <input type="radio" name="lesson"  value={serviceData._id} className='peer hidden' />
      <input type="radio" name="price"  value={serviceData.price} className='peer hidden' />
      <div className='absolute top-1/2 ltr:left-0 ltr:lg:left-8 rtl:right-0 rtl:lg:right-8 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 rounded-full transition-all peer-checked:border-primary-500 peer-checked:border-4 h-full w-2 lg:w-5 lg:h-5 ltr:mr-2 rtl:ml-2 border border-solid border-transparent lg:border-darkgray-300'></div>
      <div className='w-full px-4 py-2 flex gap-2 lg:gap-4 transition-colors ltr:lg:pl-16 rtl:lg:pr-16 hover:bg-darkgray-500 peer-checked:bg-darkgray-400'>
        <div className='flex items-center gap-2 lg:gap-4'>
          <div className='w-16 lg:w-24 h-24'>
            <img src={lesson_thumb} className="w-full h-full object-cover" alt="" />
          </div>
          <div className='flex flex-col justify-center flex-1'>
            <h2 className='font-oskari text-xl font-medium text-white'>
              {serviceData.title}
            </h2>
            <p className='text-lg text-darkgray-200 line-clamp-2'>
              {serviceData.description}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-around'>
          <div className='bg-gray-50 bg-opacity-5 text-center rounded-lg text-xl py-1 px-4 text-white font-oskari'>
            ${serviceData.price}
          </div>
          <div className='border flex items-center border-solid border-darkgray-300 rounded-lg text-xl py-1 px-4 text-darkgray-300 font-oskari'>
            <BiTimeFive /> {serviceData.duration}hrs
          </div>
        </div>
      </div>
    </label>
  );
}

export default LessonCard;
