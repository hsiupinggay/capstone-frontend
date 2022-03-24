/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

// Global variables to help print  Calendar
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
/*
 * ========================================================
 * ========================================================
 *
 *           AppointmentCalendar Component
 *
 * ========================================================
 * ========================================================
 */
export default function AppointmentCalendar({ displayDataArray, setOpenApptModal, setApptModalType }) {
  // Get today's date
  const stateDate = new Date();
  // Set state to toggle between month views
  const [month, setMonth] = useState(stateDate.getMonth());
  const [year] = useState(stateDate.getFullYear());
  const [numOfDays, setNumOfDays] = useState([]);
  const [emptyDays, setEmptyDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setPopoverText] = useState('');

  // Popover Handlers
  const handleOpen = (event, eventText) => {
    setAnchorEl(event.currentTarget);
    setPopoverText(eventText);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Function to check for "today"
  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
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

  // useEffect to console.log and check if calendar is on correct month
  useEffect(() => {
    getNoOfDays();
  }, [month]);

  // useEffect waiting on displayData from axios call
  // maps data to events and display accordingly
  useEffect(() => {
    if (!displayDataArray) return; // handles error if axios call still not done
    let updatedEvents = []
    
    // after there is userDataArray... map to events
    displayDataArray.forEach(patient => {
      const { identity, appointments } = patient
      const displayName = `${identity.name.first} ${identity.name.last}`;
      const displayArray = [];
      appointments.forEach(appointment => {
        // operate on appointment.date -> string 'DD-MMM-YYYY'
        const appointmentDate = appointment.date.split('-');
        const appointmentDay = Number(appointmentDate[0]);
        const appointmentMonth = Number(monthNames.findIndex(month => month === appointmentDate[1]));
        const appointmentYear = Number(appointmentDate[2]);

        const appointmentObject = {
          date: `${appointment.date} | ${appointment.time}`,
          event_date: new Date(appointmentYear, appointmentMonth, appointmentDay),
          event_title: `${appointment.time}: ${displayName} @ ${appointment.hospital.name}, ${appointment.hospital.department}`,
          event_theme: 'blue', // blue red yellow green purple
          id: appointment._id,
        };
        displayArray.push(appointmentObject);
      });
      updatedEvents = [...updatedEvents, ...displayArray];
    });
    setEvents(updatedEvents);
  }, [displayDataArray]);
  
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

  // tailwind CSS classNames for color swapping
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

  // handle onClick on events to display full details

  return (
    <>
      {/* calendar body */}
      <div className="container mx-0 py-4 px-6">
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
                  <div className="text-gray-600 text-[8px] sm:text-sm uppercase tracking-wide font-bold text-center">{day}</div>
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
                <div key={date} className="px-4 pt-6 border-r border-b relative h-32 w-[14.28%]">
                  <div className={classNames(isToday(date) ? 'text-[8px] sm:text-sm bg-blue-500 text-white' : 'text-[8px] sm:text-sm text-gray-700 hover:bg-blue-200', 
                  'inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100')}>
                    {date}
                  </div>
                  {/* Within non-empty days, check for event and print event */}
                  <div className="overflow-y-auto mt-1 h-16">
                    {events.filter((e) => new Date(e.event_date).toDateString()
                    === new Date(year, month, date).toDateString()).map((e) => (
                      <div key={e.id} className={classNames(eventClass(e.event_theme), 'px-2 py-1 rounded-lg mt-1 overflow-hidden border')} onClick={(event) => handleOpen(event, e.event_title)}>
                        <Typography><p className="text-[8px] sm:text-sm truncate leading-tight">{e.event_title}</p></Typography>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>{popoverText}</Typography>
                <Button onClick={(e) => {setOpenApptModal(true); setApptModalType('edit')}}>Edit</Button>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
