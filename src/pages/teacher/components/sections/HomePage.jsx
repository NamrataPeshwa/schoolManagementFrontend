// Home Page component 
import React, { useState, useEffect } from 'react';
import { Users, ClipboardCheck, BarChart3, Star } from 'lucide-react';
import StatCard from '../common/StatCard';
import { MOCK_STATS, MOCK_RECENT_ACTIVITY } from '../../data/mockData';
import SubjectPage from './SubjectPage'; // Import Classes component

const HomePage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, Teacher!</h2>
          <p className="text-gray-600">Let's make today awesome. A step towards a bright future....</p>
        </div>
        <img
          src=""
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Classes"
          value={stats ? stats.activeClasses : "..."}
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Pending Assignments"
          value={stats ? stats.pendingAssignments : "..."}
          icon={ClipboardCheck}
          color="text-yellow-500"
        />
        <StatCard
          title="Class Attendance"
          value={stats ? `${stats.classAttendance}%` : "..."}
          icon={BarChart3}
          color="text-green-500"
        />
        <StatCard
          title="Average Class GPA"
          value={stats ? stats.averageGpa : "..."}
          icon={Star}
          color="text-indigo-500"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activity Feed</h3>
          <div className="space-y-4">
            {MOCK_RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => e.target.src = `https://placehold.co/100x100/E8F0FE/505050?text=U`}
                  />
                  <div>
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-500"> {activity.action} </span>
                    <span className="font-medium text-[#2F69FF]">{activity.subject}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">...</button>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements & Quick Links */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-white bg-[#2F69FF] -mx-6 -mt-6 rounded-t-lg px-6 py-3">Announcements</h3>
            <div className="space-y-3 pt-4">
              <p className="text-gray-600">No new announcements.</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button className="flex-1 text-white bg-[#2F69FF] hover:bg-blue-700 py-2 px-4 rounded-lg font-medium">
                Add Notes
              </button>
              <button className="flex-1 text-[#2F69FF] bg-white border border-[#2F69FF] hover:bg-blue-50 py-2 px-4 rounded-lg font-medium">
                Upload Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Section */}
      <SubjectPage />
    </div>
  );
};

export default HomePage;
