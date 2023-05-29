import React from "react";
import { useState, useEffect } from "react";
// import left caret
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
function Calendar(props) {
  const [todayDate, setTodayDate] = useState(new Date());
  const [date, setDate] = React.useState(new Date());
  const [month, setMonth] = React.useState(date.getMonth());
  const [year, setYear] = React.useState(date.getFullYear());
  const [days, setDays] = React.useState([]);
  const [daysInMonth, setDaysInMonth] = React.useState(
    new Date(year, month + 1, 0).getDate()
  );
  const [firstDay, setFirstDay] = React.useState(
    new Date(year, month, 1).getDay()
  );
  const [lastDay, setLastDay] = React.useState(
    new Date(year, month + 1, 0).getDay()
  );
  const [nextDays, setNextDays] = React.useState(42 - (daysInMonth + firstDay));
  const [prevDays, setPrevDays] = React.useState(
    new Date(year, month, 0).getDate()
  );
  const [prevMonth, setPrevMonth] = React.useState(month - 1);
  const [nextMonth, setNextMonth] = React.useState(month + 1);
  const [prevYear, setPrevYear] = React.useState(year);
  const [nextYear, setNextYear] = React.useState(year);
  // get array days in month

  const getDaysInMonth = () => {
    let days_arr = [];
    // add days in month with calendar view
    // starting from first day of month
    for (let i = 1; i <= daysInMonth; i++) {
      days_arr.push([1, i, month, year]);
    }
    // get last month days
    for (let i = 0; i < firstDay; i++) {
      days_arr.unshift([0, prevDays - i, prevMonth, prevYear]);
    }
    // add days from next month
    // starting from first day of next month until 42 days
    if (days_arr.length < 35) {
      for (let i = 1; i <= nextDays; i++) {
        if (days_arr.length < 35) {
          days_arr.push([0, i, nextMonth, nextYear]);
        }
      }
    } else if (days_arr.length < 42) {
      for (let i = 1; i <= nextDays; i++) {
        if (days_arr.length < 42) {
          days_arr.push([0, i, nextMonth, nextYear]);
        }
      }
    }
    setDays(days_arr);
  };
  useEffect(() => {
    getDaysInMonth();
  }, [date]);

  useEffect(() => {
    setDaysInMonth(new Date(year, month + 1, 0).getDate());
    setFirstDay(new Date(year, month, 1).getDay());
    setLastDay(new Date(year, month + 1, 0).getDay());
    setPrevDays(new Date(year, month, 0).getDate());
    setNextDays(42 - (daysInMonth + firstDay));
    setPrevMonth(month - 1);
    setNextMonth(month + 1);
    setPrevYear(year);
    setNextYear(year);
    if (month === 0) {
      setPrevMonth(11);
      setNextMonth(1);
      setPrevYear(year - 1);
    } else if (month === 11) {
      setPrevMonth(10);
      setNextMonth(0);
      setNextYear(year + 1);
    }

    setDate(new Date(year, month, 1));
  }, [month]);

  function move_to_next_month() {
    if (month == 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }
  function move_to_previous_month() {
    if (month == 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  // Helper function to count occurrences of objects with the same date and status
  function countOccurrences(arr) {
    let counts = {};
    for (let obj of arr) {
      let key = obj.date + obj.status + obj.description;
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }

  // Transformed array with counts
  let test_days = props.tasks.map((obj) => [
    obj.date,
    obj.status,
    obj.description,
    [countOccurrences(props.tasks)[obj.date + obj.status + obj.description]],
  ]);

  console.log(test_days);

  // let test_days = [
  //     ["2023/05/30", "completed",[3]],
  //     ["2022/10/29", "completed",[5]],
  //     ["2022/11/1", "pending", [4]],
  //     ["2022/11/7", "pending", [2]],
  // ]

  useEffect(() => {
    let notificationThisMonth = 0;
    if (props.setNotificationsThisMonth) {
      let month = todayDate.getMonth() + 1;
      let year = todayDate.getFullYear();
      for (let i = 0; i < 31; i++) {
        for (let j = 0; j < test_days.length; j++) {
          if (
            year == test_days[j][0].split("/")[0] &&
            month == test_days[j][0].split("/")[1] &&
            i + 1 == test_days[j][0].split("/")[2]
          ) {
            if (test_days[j][1] == "pending") {
              notificationThisMonth += 1;
            }
          }
        }
      }
    }
    props.setNotificationsThisMonth(notificationThisMonth);
  }, [todayDate]);

  function adjust_notification_position(e) {
    let calendar_item = e.target.closest(".calendar-day");
    let item = calendar_item.querySelector("#notification");
    if (!item) {
      return;
    }
    let item_width = item.offsetWidth;
    let item_left = e.target.getBoundingClientRect().left;
    let item_right = e.target.getBoundingClientRect().right;
    let item_top = e.target.getBoundingClientRect().top;
    let window_width = window.innerWidth;
    if (window_width > 400) {
      if (window_width - item_right < 400 && item_left - 400 < 0) {
        if (item_left > window_width - item_right) {
          item.style.right = "0px";
          item.style.transform = "translateX(0%)";
          item.style.left = "unset";
        } else {
          item.style.left = "0px";
          item.style.transform = "translateX(0%)";
          item.style.right = "unset";
        }
      } else if (item_left - 400 < 0) {
        item.style.left = "0px";
        item.style.right = "";
        item.style.transform = "translateX(0%)";
      } else if (window_width - item_right < 400) {
        item.style.left = "";
        item.style.right = "0px";
        item.style.transform = "translateX(-0%)";
      } else {
        item.style.left = "50%";
        item.style.right = "";
        item.style.transform = "translateX(-50%)";
      }
      if (item_top - 50 < 0) {
        item.style.top = "100%";
        item.style.bottom = "";
      } else {
        item.style.top = "";
        item.style.bottom = "100%";
      }
    } else {
      if (item_left > window_width - item_right) {
        item.style.right = "0%";
        item.style.transform = "translateX(0%)";
        item.style.left = "unset";
      } else {
        item.style.left = "0%";
        item.style.transform = "translateX(0%)";
        item.style.right = "unset";
      }
      item.style.bottom = "100%";
      setTimeout(() => {
        if (item.getBoundingClientRect().left <= 0) {
          item.style.transform =
            "translateX(-" + item.getBoundingClientRect().left + "px)";
        } else {
          if (window_width - item.getBoundingClientRect().right <= 20) {
            item.style.transform =
              "translateX(" +
              (window_width - item.getBoundingClientRect().right - 20) +
              "px)";
          }
        }
      }, 300);
    }
  }

  return (
    <div className={props.className + " w-full font-oskari"}>
      <div className="flex mb-2 lg:mb-4 items-center justify-center lg:justify-start">
        <div className="w-32 lg:w-36">
          <p className="text-primary-500 text-center text-lg lg:text-xl">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center">
          <div>
            <button
              onClick={move_to_previous_month}
              className="bg-darkgray-400 hover:bg-darkgray-600 text-darkgray-200 transition-colors font-oskari text-lg font-medium rtl:mr-1 rtl:lg:mr-2 ltr:ml-1 ltr:lg:ml-2 p-1 lg:p-2 rounded-sm uppercase rtl:transform rtl:rotate-180"
            >
              <BiCaretLeft />
            </button>
          </div>
          <div>
            <button
              onClick={move_to_next_month}
              className="bg-darkgray-400 hover:bg-darkgray-600 text-darkgray-200 transition-colors font-oskari text-lg font-medium rtl:mr-1 rtl:lg:mr-2 ltr:ml-1 ltr:lg:ml-2 p-1 lg:p-2 rounded-sm uppercase rtl:transform rtl:rotate-180"
            >
              <BiCaretRight />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2 lg:mb-4 border-b lg:border-b-2 border-darkgray-100 ">
        {[...Array(7)].map((e, i) => (
          <div
            className=" text-darkgray-100 lg:ltr:text-left rtl:text-right text-center font-medium font-oskari text-lg pb-1 lg:pb-2"
            key={i}
          >
            <span>
              {new Date(0, 0, i)
                .toLocaleDateString("en-US", { weekday: "long" })
                .slice(0, 2)}
            </span>
            <span className="hidden lg:inline">
              {new Date(0, 0, i)
                .toLocaleDateString("en-US", { weekday: "long" })
                .slice(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 gap-1 lg:gap-2">
        {/* Display days in week starting from Sunday */}
        {days.map((e, i) => {
          let today = false;
          let completed = false;
          let tasks = false;
          let descriptions = [];
          let task_count = 0;
          let e_date = new Date(e[3], e[2], e[1]);

          for (let j = 0; j < test_days.length; j++) {
            let test_date = new Date(test_days[j][0]);
            if (test_date.getTime() === e_date.getTime()) {
              if (test_days[j][1] === "completed") {
                completed = true;
              } else if (test_days[j][2] !== null) {
                tasks = true;
                task_count++; // Increment task count
              }
              descriptions.push(test_days[j][2]);
              console.log("Des",descriptions);
            }
          }

          if (
            todayDate.toLocaleString("default", { day: "numeric" }) == e[1] &&
            e[2] == todayDate.getMonth() &&
            e[3] == todayDate.getFullYear()
          ) {
            today = true;
          }

          return (
            <div
              key={i}
              onMouseEnter={adjust_notification_position}
              className={
                (completed
                  ? " bg-success-800 hover:border-success-500"
                  : tasks
                  ? " bg-warn-800 hover:border-warn-500"
                  : today
                  ? " bg-primary-500 bg-opacity-25 "
                  : " bg-darkgray-400 ") +
                (today ? " border-primary-500 " : " border-transparent ") +
                (e[0] === 0
                  ? " text-black " +
                    (!today ? "bg-opacity-70" : " bg-opacity-30")
                  : "") +
                " calendar-day border-2 w-full p-2 xl:p-4 group rounded-xl text-2xl lg:text-4xl h-16 lg:h-28 flex flex-col justify-center items-center lg:items-start lg:justify-between relative transition-colors"
              }
            >
              <p className="font-bold">{e[1]}</p>
              <div className="hidden lg:block">
                {completed ? (
                  <p className="text-lg rtl:pl-16 ltr:pr-16 font-medium leading-tight text-success-500">
                    Completed tasks
                  </p>
                ) : (
                  ""
                )}
                {tasks ? (
                  <p className="text-lg rtl:pl-16 ltr:pr-16 font-medium leading-tight text-warn-500">
                    {task_count} Tasks
                  </p>
                ) : (
                  ""
                )}
              </div>

              {(completed || tasks) && (
                <div
                  id="notification"
                  className="overflow-hidden lg:flex-nowrap flex-wrap z-50 opacity-0 group-hover:opacity-100 group-hover:py-4 group-hover:max-h-96 max-h-0 py-0 transition-all delay-200 absolute transform -translate-x-1/2"
                >
                  <div
                    className={
                      (completed
                        ? " bg-success-800 text-success-500"
                        : tasks
                        ? " bg-warn-800 text-warn-500"
                        : today
                        ? " bg-primary-500 bg-opacity-25 "
                        : " bg-darkgray-400 ") +
                      " opacity-0 max-w-xs lg:max-w-md group-hover:opacity-100 ease-linear transition-all text-lg px-4 py-4 rounded-xl flex w-max items-center"
                    }
                  >
                    <ul>
                      {descriptions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>{" "}
                    {completed ? (
                      <button className="rounded-full py-1 px-4 uppercase text-success-500 rtl:mr-4 ltr:ml-4 whitespace-nowrap">
                        Good Job!
                      </button>
                    ) : (
                      <button className="rounded-full py-1 px-4 uppercase bg-warn-500 text-black rtl:mr-4 ltr:ml-4 whitespace-nowrap">
                        Take Action
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
