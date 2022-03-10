import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

// Global variables to help print  Calendar
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function AppointmentCalendar() {
  // Get today's date
  const stateDate = new Date();
  // Set state to toggle between month views
  const [month, setMonth] = useState(stateDate.getMonth());
  const [year] = useState(stateDate.getFullYear());
  const [numOfDays, setNumOfDays] = useState([]);
  const [emptyDays, setEmptyDays] = useState([]);

  // Function to check for "today"
  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    console.log('today', today);
    console.log('d', d);
    return today.toDateString() === d.toDateString();
  };

  // Function: define daysInMonth & check emptyDays at start of month
  const getNoOfDays = () => {
    let i;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(year, month).getDay();
    const emptyDaysArray = [];
    for (i = 1; i <= dayOfWeek; i += 1) {
      emptyDaysArray.push(i);
    }

    const daysArray = [];
    for (i = 1; i <= daysInMonth; i += 1) {
      daysArray.push(i);
    }

    setEmptyDays(emptyDaysArray);
    setNumOfDays(daysArray);
  };

  useEffect(() => {
    getNoOfDays();
    console.log(month, year);
  }, [month]);

  // Placeholder for appointments
  const events = [
    {
      event_date: new Date(2022, 8, 1),
      event_title: 'My Birthday :)',
      event_theme: 'red',
    },

    {
      event_date: new Date(20212, 11, 25),
      event_title: 'Xmas Day',
      event_theme: 'green',
    },
    {
      event_date: new Date(2022, 9, 31),
      event_title: 'Halloween',
      event_theme: 'yellow',
    },
    {
      event_date: new Date(2021, 11, 31),
      event_title: 'New Years Eve',
      event_theme: 'yellow',
    },
  ];

  // const themes = [
  //   {
  //     value: 'blue',
  //     label: 'Blue Theme',
  //   },
  //   {
  //     value: 'red',
  //     label: 'Red Theme',
  //   },
  //   {
  //     value: 'yellow',
  //     label: 'Yellow Theme',
  //   },
  //   {
  //     value: 'green',
  //     label: 'Green Theme',
  //   },
  //   {
  //     value: 'purple',
  //     label: 'Purple Theme',
  //   },
  // ];

  // Arrow button classNames
  const btnClass = (limit) => classNames(
    month === limit ? 'cursor-not-allowed opacity-25' : '',
    'leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none',
  );

  // Function for right arrow
  const nextMonth = () => {
    setMonth(month + 1);
    getNoOfDays();
  };
  // Function for left arrow
  const prevMonth = () => {
    setMonth(month - 1);
    getNoOfDays();
  };

  const eventClass = (t) => {
    switch (t) {
      case 'blue':
        return 'border-blue-200 text-blue-800 bg-blue-100';
      case 'red':
        return 'border-red-200 text-red-800 bg-red-100';
      case 'yellow':
        return 'border-yellow-200 text-yellow-800 bg-yellow-1000';
      case 'green':
        return 'border-green-200 text-green-800 bg-green-100';
      default:
        return 'border-purple-200 text-purple-800 bg-purple-100';
    }
  };

  return (
    <>
      {/* calendar body */}
      <div className="container mx-auto py-4 px-6">
        {/* calendar outer frame */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* top row: display month, year; display nav arrows */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            {/* div: month and year */}
            <div>
              <span className="text-lg font-bold text-gray-800">{monthNames[month]}</span>
              <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
            </div>
            {/* div: nav arrow buttons */}
            <div className="border rounded-lg px-1 pt-1">
              {/* Previous Month Button */}
              <button type="button" onClick={() => prevMonth()} disabled={month === 0} className={btnClass(0)}>
                <ArrowLeftIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
              </button>
              <div className="border-r inline-flex h-6" />
              {/* Next Month Button */}
              <button type="button" onClick={() => nextMonth()} disabled={month === 11} className={btnClass(11)}>
                <ArrowRightIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
              </button>
            </div>
          </div>
          {/* Calendar Body */}
          <div className="-mx-1 -mb-1">
            {/* Div: Print Day Row */}
            <div className="flex flex-wrap -mb-8" style={{ marginBottom: '-30px' }}>
              {days.map((day) => (
                <div key={day} className="px-2 py-2 w-[14.28%]">
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{day}</div>
                </div>
              ))}
            </div>
            {/* Div: Print Dates */ }
            <div className="flex flex-wrap">
              {/* IF empty day, print box without {date} */}
              {emptyDays.map((emptyDay) => (
                <div key={emptyDay} className="border-r border-b px-4 pt-2 h-32 w-[14.28%]" />
              ))}
              {/* Print {date} and conditionally format - can add onClick here to open modal */}
              {numOfDays.map((date) => (
                <div key={date} className="px-4 pt-2 border-r border-b relative h-32 w-[14.28%]">
                  <div className={classNames(isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200', 'inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100')}>
                    {date}
                  </div>
                  {/* Within non-empty days, check for event and print event */}
                  <div className="overflow-y-auto mt-1 h-20">
                    {events.filter((e) => new Date(e.event_date).toDateString()
                    === new Date(year, month, date).toDateString()).map((e) => (
                      <div key={e.event_title} className={classNames(eventClass(e.event_theme), 'px-2 py-1 rounded-lg mt-1 overflow-hidden border')}>
                        <p className="text-sm truncate leading-tight">{e.event_title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentCalendar;
