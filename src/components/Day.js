import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className={`border border-gray-300 flex flex-grow ${getCurrentDayClass()}`}>
      <div className="grid grid-rows-25 gap-10 p-3 border-r border-b border-gray-300">
        <div className="w-1 h-14"></div>
        {[...Array(24).keys()].map((hour) => (
          <div
            key={hour}
            className={`w-full h-14 cursor-pointer border-b border-gray-300`}
            onClick={() => {
              setDaySelected(day.set("hour", hour));
              setShowEventModal(true);
            }}
          >
            <div className="hour-header text-xs mt-2 text-gray-500">
              {`${String(hour).padStart(2, "0")}:00`}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 p-2 flex-grow border-t border-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (weekday, index) => (
            <div
              key={index}
              className="w-full text-xs text-center font-semibold border-r"
            >
              {weekday}
            </div>
          )
        )}
        {[...Array(7).keys()].map((dayIdx) =>
          [...Array(24).keys()].map((hour) => {
            const evt = dayEvents.find(
              (event) => dayjs(event.day).hour() === hour
            );

            return (
              <div
                key={`${dayIdx}-${hour}`}
                className={`w-full h-14 cursor-pointer border-b border-r border-gray-300`}
                onClick={() => {
                  setDaySelected(day.set("hour", hour));
                  setShowEventModal(true);
                }}
              >
                {evt && (
                  <div
                    onClick={() => setSelectedEvent(evt)}
                    className={`bg-${evt.label}-100 p-1 text-gray-600 text-xs rounded mb-1 truncate cursor-pointer`}
                  >
                    {evt.title}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
