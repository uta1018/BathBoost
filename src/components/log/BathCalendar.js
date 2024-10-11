import React, { useState } from "react";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "../css/log/BathCalendar.css";

const BathCalendar = ({ bathDayList }) => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

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

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate);
  };

  const isNextMonthDisabled = () => {
    const today = new Date();
    return (
      activeStartDate.getFullYear() === today.getFullYear() &&
      activeStartDate.getMonth() === today.getMonth()
    );
  };

  return (
    <>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={achievementStamps}
        // 今日の日付を強調
        tileClassName={({ date, view }) =>
          view === "month" && isSameDay(date, new Date()) ? "today" : null
        }
        formatDay={(locale, date) => date.getDate()}
        calendarType="gregory"
        minDetail="month"
        maxDate={new Date()} 
        next2Label={null}
        prev2Label={null}
        nextLabel={isNextMonthDisabled() ? "" : "＞"}
        prevLabel="＜"
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </>
  );
};

export default BathCalendar;
