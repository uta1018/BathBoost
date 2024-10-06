import React from "react";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "../css/log/BathCalendar.css";

const BathCalendar = ({ bathDayList }) => {
  const achievementStamps = ({ date, view }) => {
    if (view === "month") {
      const hasAchievement = bathDayList.some((achievedDate) =>
        isSameDay(achievedDate.toDate(), date)
      );
      return hasAchievement ? (
        <FontAwesomeIcon icon={faPaw} className="stamp-image" />
      ) : null;
    }
    return null;
  };

  return (
    <div>
      <Calendar
        tileContent={achievementStamps}
        // 今日の日付を強調
        tileClassName={({ date, view }) =>
          view === "month" && isSameDay(date, new Date()) ? "today" : null
        }
        calendarType="gregory"
      />
    </div>
  );
};

export default BathCalendar;
