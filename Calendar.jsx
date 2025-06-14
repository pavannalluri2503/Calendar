import React, { useState } from 'react';
import dayjs from 'dayjs';

const events = [
  { id: 1, title: "Team Meeting", date: "2025-06-13", time: "10:00", duration: "1h" },
  { id: 2, title: "Client Meeting", date: "2025-06-13", time: "12:00", duration: "30m" },
  { id: 3, title: "Workout", date: "2025-06-15", time: "07:00", duration: "1h" },
  { id: 4, title: "Project Deadline", date: "2025-06-27", time: "All Day", duration: "1d" },
  { id: 5, title: "Client Meeting", date: "2025-06-27", time: "12:00", duration: "30m" }
];

const colors = [
  "bg-red-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-orange-200",
  "bg-teal-200"
];

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startDay = currentMonth.startOf("month").startOf("week");
  const endDay = currentMonth.endOf("month").endOf("week");

  const calendarDays = [];
  let day = startDay.clone();
  while (day.isBefore(endDay, 'day')) {
    calendarDays.push(day.clone());
    day = day.add(1, 'day');
  }

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date.format("YYYY-MM-DD"));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>←</button>
        <h2 className="text-xl font-bold">{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>→</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 text-sm">
        {calendarDays.map((date, idx) => {
          const isToday = date.isSame(dayjs(), 'day');
          const dayEvents = getEventsForDate(date);
          return (
            <div key={idx} className={`p-2 border rounded-md h-24 overflow-auto ${isToday ? "bg-blue-100" : "bg-gray-50"}`}>
              <div className="font-bold">{date.date()}</div>
              {dayEvents.map((event, i) => (
                <div
                  key={event.id}
                  className={`mt-1 text-xs p-1 rounded ${colors[i % colors.length]}`}
                >
                  {event.title} ({event.time})
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;