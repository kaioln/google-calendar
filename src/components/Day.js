import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [selectedHour, setSelectedHour] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const {
    daySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    setDaySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getDayClass() {
    if (daySelected) {
      return day.format("DD-MM-YY") === daySelected.format("DD-MM-YY")
        ? "day-selected"
        : "hidden";
    }
    return "";
  }

  function getHourClass(hour) {
    return `hour-container cursor-pointer ${
      selectedHour === hour ? "selected-hour" : ""
    }`;
  }

  function handleHourClick(hour) {
    if (selectedHour === hour) {
      setSelectedHour(null);
    } else {
      setSelectedHour(hour);
    }
  }

  function handleEventClick(evt) {
    setSelectedEvent(evt);
  }

  function handleAddEventClick(hour) {
    setDaySelected(day.set("hour", hour));
    setShowEventModal(true);
  }

  return (
    <div className={`border border-gray-200 flex flex-grow ${getDayClass()}`}>
      <div className={`grid grid-rows-25 gap-2 p-2 border-r`}>
        {Array.from({ length: 24 }, (_, hour) => (
          <div
            key={hour}
            className={`w-full h-full ${getHourClass(hour)} flex flex-col items-center justify-center border-b`}
            onClick={() => handleHourClick(hour)}
          >
            <div className="hour-header text-base mb-1">
              {`${String(hour).padStart(2, "0")}:00`}
            </div>
          </div>
        ))}
      </div>
      <div className={`grid grid-cols-7 gap-2 p-2 flex-grow border-t`}>
        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((weekday) => (
          <div key={weekday} className="w-full text-sm text-center font-bold border-r">
            {weekday}
          </div>
        ))}
        {Array.from({ length: 7 }, (_, dayIdx) => (
          Array.from({ length: 24 }, (hour) => {
            const evt = dayEvents.find(
              (event) =>
                dayjs(event.day).hour() === hour &&
                dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
            );

            return (
              <div
                key={`${dayIdx}-${hour}`}
                className={`w-full h-full ${getHourClass(hour)} flex flex-col items-center justify-center border-b border-r`}
                onClick={() => handleHourClick(hour)}
              >
                {evt && (
                  <div
                    onClick={() => handleEventClick(evt)}
                    className={`bg-${evt.label}-200 p-2 text-gray-600 text-sm rounded mb-1 truncate`}
                  >
                    {evt.title}
                  </div>
                )}
                {selectedHour === hour && !evt && (
                  <div
                    className="event-placeholder"
                    onClick={() => handleAddEventClick(hour)}
                  >
                    + Adicionar evento
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}
