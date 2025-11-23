// TimeTable Page component 
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Clock, Edit, Trash2 } from 'lucide-react';

const TimeTablePage = () => {
  const [currentMonth, setCurrentMonth] = useState(10); // November (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ setSelectedDay] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    color: 'bg-blue-100 text-blue-700'
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-700', label: 'Blue' },
    { value: 'bg-green-100 text-green-700', label: 'Green' },
    { value: 'bg-purple-100 text-purple-700', label: 'Purple' },
    { value: 'bg-red-100 text-red-700', label: 'Red' },
    { value: 'bg-yellow-100 text-yellow-700', label: 'Yellow' },
    { value: 'bg-pink-100 text-pink-700', label: 'Pink' }
  ];

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('timetableEvents');
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        setEvents(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length >= 0) {
      localStorage.setItem('timetableEvents', JSON.stringify(events));
    }
  }, [events]);

  // Get number of days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 7, so Monday becomes 1
    return firstDay === 0 ? 7 : firstDay;
  };

  // Generate calendar days with proper date handling
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    const calendarDays = [];
    
    // Previous month days
    for (let i = firstDay - 1; i > 0; i--) {
      const day = daysInPrevMonth - i + 1;
      calendarDays.push({ 
        day, 
        currentMonth: false, 
        events: [],
        isPrevMonth: true
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      // Filter all events for this specific day
      const dayEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === currentMonth && 
               eventDate.getFullYear() === currentYear;
      }).sort((a, b) => {
        // Sort events by start time
        return a.startTime.localeCompare(b.startTime);
      });
      
      calendarDays.push({ 
        day, 
        currentMonth: true, 
        events: dayEvents,
        isPrevMonth: false,
        isNextMonth: false
      });
    }
    
    // Next month days to fill the grid
    const remainingCells = 35 - calendarDays.length;
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({ 
        day, 
        currentMonth: false, 
        events: [],
        isNextMonth: true
      });
    }
    
    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const openAddEventModal = (day) => {
    if (day.currentMonth) {
      const selectedDate = new Date(currentYear, currentMonth, day.day);
      const dateString = selectedDate.toISOString().split('T')[0];
      
      setSelectedDay(day.day);
      setEditingEvent(null);
      setEventForm({
        title: '',
        subject: '',
        date: dateString,
        startTime: '',
        endTime: '',
        color: 'bg-blue-100 text-blue-700'
      });
      setShowModal(true);
    }
  };

  const openEditEventModal = (event, e) => {
    e.stopPropagation();
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      subject: event.subject,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event - keep all other events, just update the specific one
      setEvents(prev => prev.map(evt => 
        evt.id === editingEvent.id 
          ? { ...evt, ...eventForm }
          : evt
      ));
    } else {
      // Create new event - add to the array without removing existing events
      const newEvent = {
        id: Date.now(), // Unique ID based on timestamp
        ...eventForm
      };
      setEvents(prev => [...prev, newEvent]);
    }
    
    // Reset form and close modal
    setEventForm({
      title: '',
      subject: '',
      date: '',
      startTime: '',
      endTime: '',
      color: 'bg-blue-100 text-blue-700'
    });
    setShowModal(false);
    setSelectedDay(null);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(evt => evt.id !== eventId));
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() === dateB.getTime()) {
          // If same date, sort by start time
          return a.startTime.localeCompare(b.startTime);
        }
        return dateA - dateB;
      })
      .slice(0, 5);
  };

  // Get event count for a specific day
  const getEventCountForDay = (day) => {
    if (!day.currentMonth) return 0;
    return events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getDate() === day.day && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getFullYear() === currentYear;
    }).length;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2 p-6 bg-white rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const eventCount = getEventCountForDay(day);
            
            return (
              <div
                key={index}
                onClick={() => openAddEventModal(day)}
                className={`h-32 p-2 border border-gray-100 cursor-pointer transition hover:bg-gray-50 flex flex-col ${
                  day.currentMonth ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1 flex-shrink-0">
                  <span className={`text-sm font-medium ${
                    day.currentMonth ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {day.day}
                  </span>
                  {eventCount > 0 && day.currentMonth && (
                    <span className="text-[10px] bg-[#2F69FF] text-white rounded-full px-1.5 py-0.5 font-semibold">
                      {eventCount}
                    </span>
                  )}
                </div>
                
                {/* Scrollable events container */}
                <div 
                  className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  {day.events && day.events.map(event => (
                    <div
                      key={event.id}
                      className={`group relative p-1.5 rounded-md text-xs font-medium ${event.color} hover:shadow-md transition cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditEventModal(event, e);
                      }}
                      title={`${event.subject} - ${formatTime(event.startTime)} to ${formatTime(event.endTime)}`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{event.subject}</div>
                          <div className="text-[10px] opacity-80 truncate">
                            {formatTime(event.startTime)}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id, e);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500 hover:text-white rounded transition flex-shrink-0"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-6">
        <button 
          onClick={() => {
            const today = new Date();
            const dateString = today.toISOString().split('T')[0];
            setEventForm({
              title: '',
              subject: '',
              date: dateString,
              startTime: '',
              endTime: '',
              color: 'bg-blue-100 text-blue-700'
            });
            setEditingEvent(null);
            setShowModal(true);
          }}
          className="w-full py-3 px-6 bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Add New Event
        </button>

        <div className="p-6 bg-white rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon size={20} className="text-[#2F69FF]" />
            Upcoming Events
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            {getUpcomingEvents().length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No upcoming events</p>
            ) : (
              getUpcomingEvents().map(event => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 group hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm">{event.subject}</p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditEventModal(event, e);
                        }}
                        className="p-1 hover:bg-blue-100 rounded transition"
                        title="Edit"
                      >
                        <Edit size={14} className="text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteEvent(event.id, e)}
                        className="p-1 hover:bg-red-100 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={12} />
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedDay(null);
                    setEditingEvent(null);
                    setEventForm({
                      title: '',
                      subject: '',
                      date: '',
                      startTime: '',
                      endTime: '',
                      color: 'bg-blue-100 text-blue-700'
                    });
                  }}
                  className="hover:bg-white/20 p-1 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date 
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventForm.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title 
                </label>
                <input
                  type="text"
                  name="title"
                  value={eventForm.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Weekly Math Class"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject 
                </label>
                <input
                  type="text"
                  name="subject"
                  value={eventForm.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Mathematics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time 
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={eventForm.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time 
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={eventForm.endTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Tag
                </label>
                <select
                  name="color"
                  value={eventForm.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedDay(null);
                    setEditingEvent(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] text-white rounded-lg hover:shadow-lg transition font-semibold"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTablePage;
