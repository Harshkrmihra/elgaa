import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import SectionHeading from "./General/SectionHeading";
function FAQ(props) {
 var questions = props.faqs;
  //   const questions = [
  //     {
  //         'id':1,
  //         'question': 'How can I apply to be an expert?',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     {
  //         'id':2,
  //         'question': 'What if my lesson gets canceled? Can I get a refund?',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     {
  //         'id':3,
  //         'question': 'My expert didn’t show up for the lesson',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     {
  //         'id':4,
  //         'question': 'How can I apply to be an expert?',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     {
  //         'id':5,
  //         'question': 'What if my lesson gets canceled? Can I get a refund?',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     {
  //         'id':6,
  //         'question': 'My expert didn’t show up for the lesson',
  //         'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia aperiam perferendis dolorem dignissimos aspernatur in necessitatibus velit commodi repellat sunt nihil error quidem itaque adipisci distinctio illum, eligendi quaerat porro!'
  //     },
  //     ];

  const array_half = Math.ceil(questions?.length / (props.two_col ? 2 : 1));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  function toggleQuestion(index) {
    if (currentQuestion === index) {
      return setCurrentQuestion(null);
    }
    setCurrentQuestion(index);
  }
  return (
    <div className={props.className}>
      <SectionHeading
        disablePaddings={props.disablePaddings}
        title="Frequently asked questions"
      />
      <div
        className={
          (props.disablePaddings ? "" : "side-paddings") +
          " flex mt-4  lg:flex-nowrap flex-wrap"
        }
      >
        <div
          className={
            (props.two_col ? "w-full lg:w-1/2" : "w-full") +
            " flex flex-col rtl:ml-2 ltr:mr-2"
          }
        >
          {questions?.slice(0, array_half).map((question, index) => {
            return (
              <div
                onClick={() => toggleQuestion(question._id)}
                key={question._id}
                className="relative group mb-4"
              >
                <div
                  className={
                    (currentQuestion == question._id ? "rounded-b-none" : "") +
                    " flex cursor-pointer justify-between font-oskari py-6 side-paddings rounded-xl bg-bluegray-900 items-center group-hover:bg-bluegray-600 transition-all"
                  }
                >
                  <h2 className="text-xl font-medium text-white">
                    {question.question}
                  </h2>
                  <div className="flex items-center justify-center rounded-lg w-16 h-16 bg-bluegray-dark group-hover:bg-bluegray-500 transition-all">
                    <IoIosArrowDown
                      className={
                        (currentQuestion == question._id ? "rotate-180" : "") +
                        " text-darkgray-300 text-5xl transition-all"
                      }
                    />
                  </div>
                </div>
                <div
                  className={
                    (currentQuestion == question._id
                      ? "max-h-fit py-4 "
                      : "max-h-0 py-0 overflow-hidden") +
                    " transition-all w-full side-paddings text-white font-oskari text-lg rounded-b-xl bg-bluegray-900 group-hover:bg-bluegray-600"
                  }
                >
                  {question.answer}
                </div>
              </div>
            );
          })}
        </div>
        {props.two_col && (
          <div className="flex flex-col w-full lg:w-1/2 rtl:mr-2 ltr:ml-2">
            {questions?.slice(array_half).map((question, index) => {
              return (
                <div
                  onClick={() => toggleQuestion(question._id)}
                  key={question._id}
                  className="relative group mb-4"
                >
                  <div
                    className={
                      (currentQuestion == question._id ? "rounded-b-none" : "") +
                      " flex cursor-pointer justify-between font-oskari py-6 side-paddings rounded-xl bg-bluegray-900 items-center group-hover:bg-bluegray-600 transition-all"
                    }
                  >
                    <h2 className="text-xl font-medium text-white">
                      {question.question}
                    </h2>
                    <div className="flex items-center justify-center rounded-lg w-16 h-16 bg-bluegray-dark group-hover:bg-bluegray-500 transition-all">
                      <IoIosArrowDown
                        className={
                          (currentQuestion == question._id ? "rotate-180" : "") +
                          " text-darkgray-300 text-5xl transition-all"
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={
                      (currentQuestion == question._id
                        ? "max-h-fit py-4 "
                        : "max-h-0 py-0 overflow-hidden") +
                      " transition-all w-full side-paddings text-white font-oskari text-lg rounded-b-xl bg-bluegray-900 group-hover:bg-bluegray-600"
                    }
                  >
                    {question.answer}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
