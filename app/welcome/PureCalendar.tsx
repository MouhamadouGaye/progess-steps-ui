import React, { useState, useEffect } from "react";

export default function PureCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Build calendar matrix (weeks × days)
  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    console.log(year, month, day);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay(); // 0 (Sun) → 6 (Sat)
    const daysInMonth = lastDayOfMonth.getDate();
    console.log({ firstDayOfMonth, lastDayOfMonth, startDay, daysInMonth });

    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    // Fill empty cells before first day
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(year, month, day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Fill empty cells at the end
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }

    return weeks;
  };

  const weeks = generateCalendar(currentDate);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newDate = new Date(selectedDate);
      if (e.key === "ArrowLeft") newDate.setDate(selectedDate.getDate() - 1);
      if (e.key === "ArrowRight") newDate.setDate(selectedDate.getDate() + 1);
      if (e.key === "ArrowUp") newDate.setDate(selectedDate.getDate() - 7);
      if (e.key === "ArrowDown") newDate.setDate(selectedDate.getDate() + 7);

      if (e.key === "e") newDate = new Date(10 - 2); // Today shortcut
      console.log("New Date:", newDate, "SelectedDate: ", selectedDate);
      if (newDate.getTime() !== selectedDate.getTime()) {
        setSelectedDate(newDate);
        setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDate]);

  // Year range (1900–2100)
  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-2xl rounded-3xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🗓 Modern Calendar
      </h2>

      {/* Header with Selects */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-gray-700"
        >
          ❮
        </button>

        <div className="flex gap-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="p-2 rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="p-2 rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition text-gray-700"
        >
          ❯
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1 space-x-2">
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-cols-7 gap-2">
            {week.map((day, j) => {
              const isToday =
                day && day.toDateString() === new Date().toDateString();
              const isSelected =
                day && day.toDateString() === selectedDate.toDateString();
              return (
                <div
                  key={j}
                  onClick={() => day && handleDayClick(day)}
                  className={`p-2 text-center rounded-lg cursor-pointer transition
                    ${
                      !day
                        ? "bg-transparent"
                        : isSelected
                          ? "bg-blue-500 text-white shadow-md"
                          : isToday
                            ? "bg-blue-100 text-blue-700 font-bold"
                            : "bg-gray-50 hover:bg-gray-200 text-gray-800"
                    }`}
                >
                  {day ? day.getDate() : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected Date */}
      <p className="mt-4 text-gray-700 font-medium">
        Selected Date:{" "}
        {selectedDate
          ? selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "None"}
      </p>
    </div>
  );
}
