import React from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'javascript-time-ago'
import { BiTimeFive } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { Rating } from 'react-simple-star-rating'
import en from 'javascript-time-ago/locale/en'
import { useMediaQuery } from 'react-responsive'

function UserReview(props) {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

  return (
    <div className={props.className}>
          {ReviewComponent(props.review, isTablet, timeAgo)}
          {
              props.review.reply &&
              ReviewComponent(props.review.reply, isTablet, timeAgo)
          }
    </div>
  )
}

function RatingComponent(rating, isTablet) {
    return (
        <div className='flex items-center'>
            <Rating ratingValue={rating * 20} iconsCount={5} fillColor={"#ED0033"} emptyColor={"#42444D"} size={isTablet?25:30} readonly={true} />
        </div>
    )
}

function ReviewComponent(props, isTablet, timeAgoObject) {
    return (
        <div className={(props.reply ? "rounded-t-xl" : (props.rating ? "rounded-xl" :"rounded-b-xl border-t-2 border-bluegray-300 border-solid")) + ' bg-darkgray-500 p-2 lg:p-4'}>
            <div className='flex gap-2 items-center flex-wrap lg:flex-nowrap'>
                <div className='rounded-lg bg-gray-50 flex items-center bg-opacity-5 px-2 py-1'>
                    <div className='w-6 h-8 rounded-md bg-black mr-2 overflow-hidden'>
                        <img src={props.userimage} alt="" className='w-full h-full object-cover' />
                    </div>
                    {props.username}
                </div>
                {(isTablet && props.rating) &&
                    <div className='flex items-center'>
                        {/* {rating} */}
                        {RatingComponent(props.rating, isTablet)}
                    </div>
                }
                <div className='flex gap-2 w-full lg:w-auto'>
                    <div className='text-bluegray-200 flex items-center'>
                        <BsFillPersonFill className='mr-1 lg:mr-2' /> {props.rating?props.usertype:"Profile Owner"}
                    </div>
                    <div className='text-bluegray-200 flex items-center'>
                        <BiTimeFive className='mr-1 lg:mr-2' /> {timeAgoObject.format(new Date(props.updatedAt))}
                    </div>
                </div>
            </div>
            {(!isTablet && props.rating) &&
                <div className='flex items-center mt-2'>
                    {/* rating */}
                    {RatingComponent(props.rating, isTablet)}
                </div>
            }
            <p className='text-bluegray-200'>
                {props.content}
            </p>
        </div>
    )
}
UserReview.propTypes = {
    review: PropTypes.object.isRequired,
}

export default UserReview
