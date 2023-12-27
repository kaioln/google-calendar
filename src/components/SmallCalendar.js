import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx((prev) => prev - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx((prev) => prev + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (slcDay && currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {daySelected
            ? daySelected.format("MMMM YYYY")
            : currentMonth[0][0].format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.flat().map((day, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSmallCalendarMonth(day.month());
              setDaySelected(day);
            }}
            className={`py-1 w-full ${getDayClass(day)}`}
          >
            <span className="text-sm">{day.format("D")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
