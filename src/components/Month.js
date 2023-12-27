import React from "react";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-1 grid-rows-1">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
