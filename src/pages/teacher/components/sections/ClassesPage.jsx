// Classes Page component 
import React, { useState } from 'react';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS_FOR_CLASS } from '../../data/mockData';

const ClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_CLASSES.slice(0, 3).map((cls) => (
          <div key={cls.id} className="p-5 bg-white rounded-3xl shadow-sm">
            <h3 className="font-semibold text-lg">{cls.name}</h3>
            <p className="text-gray-500">{cls.students} Students</p>
            <button
              onClick={() => setSelectedClass(cls)}
              className="mt-4 w-full text-center py-2 px-4 rounded-3xl bg-[#2F69FF] text-white font-medium hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
        {/* Stat Card */}
        <div className="p-5 bg-white rounded-3xl shadow-sm flex flex-col justify-center">
          <h4 className="text-sm font-medium text-gray-500 uppercase">Total Assignments</h4>
          <span className="text-3xl font-bold text-gray-800">18</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {MOCK_CLASSES.slice(3).map((cls) => (
              <div key={cls.id} className="p-5 bg-white rounded-3xl shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-md">{cls.name}</h3>
                  <p className="text-gray-500">{cls.students} Students</p>
                  <p className="text-blue-800 text-sm">{cls.pending} Pending</p>
                </div>
                <button
                  onClick={() => setSelectedClass(cls)}
                  className="py-2 px-4 rounded-3xl bg-blue-100 text-[#2F69FF] font-medium hover:bg-blue-200"
                >
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Selected Class Details */}
          {selectedClass && (
            <div className="p-6 bg-white rounded-3xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Selected Class: {selectedClass.name}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Today</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_STUDENTS_FOR_CLASS.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActive}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.attendance === 'Present' ? 'bg-blue-100 text-blue-700' : 'bg-blue-200 text-blue-900'}`}>
                            {student.attendance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendance Summary */}
              <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-semibold mb-3">Attendance Summary</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Users className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Overall Rate</span>
                      <p className="font-semibold text-lg">93%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-100">
                      <CheckCircle className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Today: Present</span>
                      <p className="font-semibold text-lg">28</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-100">
                      <AlertCircle className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Absent</span>
                      <p className="font-semibold text-lg">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-white bg-[#2F69FF] -mx-6 -mt-6 rounded-t-lg px-6 py-3">Announcements</h3>
            <div className="space-y-3 pt-4">
              <p className="text-sm text-gray-500">No new announcements for this class.</p>
            </div>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Daily Attendance Log</h3>
            {/* Simple Calendar Placeholder */}
            <div className="text-center font-medium mb-2">November 2025</div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              <span className="text-blue-500">Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span className="text-blue-500">Sa</span>
              {/* Dummy days */}
              <span className="text-gray-300">26</span><span className="text-gray-300">27</span><span className="text-gray-300">28</span><span className="text-gray-300">29</span><span className="text-gray-300">30</span><span className="text-gray-300">31</span><span>1</span>
              <span>2</span><span>3</span><span>4</span><span>5</span><span className="bg-blue-100 text-blue-800 rounded-full">6</span><span>7</span><span>8</span>
              <span className="bg-blue-100 text-blue-800 rounded-full">9</span><span>10</span><span>11</span><span className="bg-blue-100 text-blue-800 rounded-full">12</span><span>13</span><span>14</span><span>15</span>
              <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
              <span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span>
              <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
