// TimeTable Page component 
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_TIMETABLE_EVENTS } from "../../data/mockData";

const TimeTablePage = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Simple array to represent days in a month grid. 35 cells for a 5-week view.
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 4; // Start from -4 to get last month's days
    if (day > 0 && day <= 30) {
      return { day, currentMonth: true, event: MOCK_TIMETABLE_EVENTS.find(e => e.day === day) };
    }
    return { day: day > 0 ? day : 27 + i, currentMonth: false };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">November 2025</h3>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`h-24 p-2 border border-gray-100 ${day.currentMonth ? 'bg-white' : 'bg-gray-50'}`}
            >
              <span className={`text-sm ${day.currentMonth ? 'text-gray-700' : 'text-gray-400'}`}>
                {day.day}
              </span>
              {day.event && (
                <div className={`mt-1 p-1 rounded-md text-xs font-medium ${day.event.color}`}>
                  {day.event.title}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        <button className="w-full py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
          Add New Event
        </button>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Faculty Meeting</p>
              <p className="text-sm text-gray-500">Nov 12, 2025</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Parent-Teacher Conference</p>
              <p className="text-sm text-gray-500">Nov 12, 2025</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Hours Summary</h3>
          {/* Simple bar chart placeholder */}
          <div className="flex justify-between items-end h-24">
            {[12, 22, 0, 18, 20].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-3/4 bg-blue-100 rounded-t-lg" style={{ height: `${h * 4}%` }}></div>
                <span className="text-xs text-gray-500 mt-1">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;
