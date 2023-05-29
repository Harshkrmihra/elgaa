import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import colors from 'tailwindcss/colors'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import {Link} from 'react-router-dom'

function AdvancedSearch(props) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isSmallMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const select_styles = {
        control: (provided, state) => ({
            ...provided,
            background: "#232527",
            padding: "0.5rem 1rem",
            border: "0",
            borderRadius: "0.5rem",
            color: "#fff",
            width: isTablet ? "100%" : "250px",

        }),
        input: (provided, state) => ({
            ...provided,
            color: "#fff"
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#fff"
        }),
        option: (provided, state) => ({
            ...provided,
            color: "#fff",
            background: "#232527",
            padding: "0.5rem 1rem",
            border: "0",
            zIndex:"2",
        }),
        menu: (provided, state) => ({
            ...provided,
            background: "#232527",
            border: "0",
            borderRadius: "0.5rem",
            zIndex:"2",
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: "#101318",
            color: "#fff",
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: "#fff",
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            color: "#fff",
        })
    };
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(100);
    function handleOnPriceChange(e) {
        setPriceMin(e.minValue);
        setPriceMax(e.maxValue);
    }

    const ranks = [
        'Diamond',
        'Master',
        'Grandmaster',
        'Challenger'
    ];
    function toggleAdvancedFilter() {
        setIsAdvancedFilterOpen(!isAdvancedFilterOpen);
    }
  return (
      <div className= 'relative rounded-xl bg-bluegray-900 mb-16 pb-12 lg:pb-8 ltr:pr-4 ltr:pl-4 ltr:lg:pr-16 ltr:lg:pl-12 rtl:pl-4 rtl:pr-4 rtl:lg:pl-16 rtl:lg:pr-12 pt-4 ignore-swiper' >
                <div className='flex items-center ltr:text-left rtl:text-right justify-around flex-wrap gap-4 '>
              <label className='block ltr:lg:ml-4 rtl:lg:mr-4 w-full lg:w-auto'>
                        <p className='uppercase font-oskari font-medium text-white'>Search by coach name</p>
                        <input type="text" className='py-4 px-8 w-full lg:w-auto placeholder-darkgray-200 font-medium bg-darkgray-400 rounded-md mt-2 text-white outline-none' placeholder='Coach name here' />
                    </label>
                
                
              <label className={(!isAdvancedFilterOpen&&isTablet?"hidden":"block")+' w-full lg:w-auto'}>
                        <p className='uppercase font-oskari font-medium text-white'>Server</p>
                  <Select isClearable={true} isMulti={true} styles={select_styles} className='w-full lg:w-auto font-medium bg-darkgray-400 rounded-md mt-2' options={
                            [
                                  {
                                      label: 'EUW',
                                      value: 'EUW'
                                  },
                                  {
                                      label: 'EUNE',
                                      value: 'EUNE'
                                  }
                            ]
                        }/>
                    </label>
                
                
              <label className={(!isAdvancedFilterOpen&&isTablet?"hidden":"block")+ ' w-full lg:w-auto'}>
                        <p className='uppercase font-oskari font-medium text-white'>Role</p>
                          <Select isClearable={true} isMulti={true} styles={select_styles} className=' font-medium bg-darkgray-400 rounded-md mt-2' options={
                              [
                                {
                                    label: 'Top',
                                    value: 'top'
                                },
                                {
                                    label: 'Jungle',
                                    value: 'jungle'
                                },
                                {
                                    label: 'Mid',
                                    value: 'mid'
                                },
                                
                                {
                                    label: 'ADC',
                                    value: 'adc'
                                },
                                {
                                    label: 'Support',
                                    value: 'support'
                                }
                              ]
                          } />
                    </label>
                
                
              <label className={(!isAdvancedFilterOpen&&isTablet?"hidden":"block")+ ' w-full lg:w-auto'}>
                        <p className='uppercase font-oskari font-medium text-white'>Champion</p>
                          <Select styles={select_styles} isMulti={true} className=' font-medium bg-darkgray-400 rounded-md mt-2' options={
                              [
                                {
                                    label: 'Aatrox',
                                    value: 'aatrox'
                                },
                                {
                                    label: 'Ahri',
                                    value: 'ahri'
                                },
                                {
                                    label: 'Akali',
                                    value: 'akali'
                                },
                                {
                                    label: 'Alistar',
                                    value: 'alistar'
                                },
                                {
                                    label: 'Amumu',
                                    value: 'amumu'
                                },
                                {
                                    label: 'Anivia',
                                    value: 'anivia'
                                },
                                {
                                    label: 'Annie',
                                    value: 'annie'
                                },
                              ]
                          } />
                    </label>
              <label className={(!isAdvancedFilterOpen&&isTablet?"hidden":"block")+ ' w-full lg:w-auto'}>
                          <p className='uppercase font-oskari font-medium text-white'>Language</p>
                          <Select styles={select_styles} isMulti={true} className=' font-medium bg-darkgray-400 rounded-md mt-2' options={
                              [
                                {
                                    label: 'English',
                                    value: 'english'
                                },
                                {   
                                    label: 'Arabic',
                                    value: 'arabic'
                                }
                              ]
                          } />
                      </label>
                
                </div>
          <div className=' flex justify-around ltr:text-left rtl:text-right lg:space-x-4 space-y-4 flex-wrap w-full lg:w-auto'>
              <div className={(!isAdvancedFilterOpen && isTablet ? "hidden" : "block") + ' ltr:lg:ml-4 rtl:lg:mr-4 mt-4'} style={{ width:isTablet?"100%":"270px" }}>
                          <p className='uppercase font-oskari font-medium text-white'>Price Range</p>
                          <p className='uppercase font-oskari font-medium text-darkgray-200 text-lg'>
                              ${priceMin} - ${priceMax}
                          </p>
                          <MultiRangeSlider
                            style={
                                {
                                    direction: 'ltr',
                                }
                            }
                            className='text-white font-oskari '
                            minValue={priceMin}
                            maxValue={priceMax}
                            ruler={false}
                            thumbLeftColor={colors.white}
                            thumbRightColor={colors.white}
                            barInnerColor={"rgb(237 0 51)"}
                            min={0}
                            max={100}
                              onInput={(e: ChangeResult) => {
                                  setPriceMin(e.minValue);
                                  setPriceMax(e.maxValue);
                              }}
                          />
                    </div>
              <div className={(!isAdvancedFilterOpen&&isTablet?"hidden":"block")+ ' w-full lg:w-auto'}>
                          <p className='uppercase font-oskari font-medium text-white'>Rank</p>
                          <div className="flex flex-wrap lg:justify-center gap-2">
                            {ranks.reverse().map((rank, index) => (
                                <label key={index}>
                                    <input type="checkbox" value={rank} className='peer hidden' name="rank[]" />
                                    <div className='peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all cursor-pointer px-4 rounded-full bg-darkgray-400 py-2 text-white border-white border border-solid'>
                                        {rank}
                                    </div>
                                </label>
                            ))}
                          </div>
                    </div>
              <div className='flex-1 self-center ltr:lg:pl-4 rtl:lg:pr-4 w-full lg:w-auto'>
                        <Link to="/search">
                            <button className='bg-primary-500 hover:bg-primary-600 text-2xl lg:text-base transition-colors rounded-lg w-full py-4 side-paddings uppercase text-white font-oskari font-medium'>
                                Search Now
                            </button>
                        </Link>
                    </div>
                </div>
          <button onClick={toggleAdvancedFilter} className='block lg:hidden absolute bg-bluegray-900 px-8 py-4 text-xl ltr:left-1/2 rtl:right-1/2 tansform ltr:-translate-x-1/2 rtl:translate-x-1/2 whitespace-nowrap -bottom-8 text-darkgray-200 border border-darkgray-200 rounded-md font-oskari'>
                    {isAdvancedFilterOpen?"Hide":"Show"} advanced search filters
                </button>
            </div >
  )
}

AdvancedSearch.propTypes = {}

export default AdvancedSearch
