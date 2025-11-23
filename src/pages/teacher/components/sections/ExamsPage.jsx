// Exams Page component 
import React from 'react';
import { FileEdit, Edit } from 'lucide-react';
import { MOCK_EXAMS } from '../../data/mockData';

const ExamsPage = () => {
  return (
    <div className="space-y-6">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Schedule New Exam */}
        <div className="flex-1 p-6 bg-white rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Schedule New Exam</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Mid-Term Physics Exam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class/Subject</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-3xl">
                <option>Select Class</option>
                <option>Class 9 Physics</option>
                <option>Class 7 Biology</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-3xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-3xl" />
              </div>
            </div>
            <button type="submit" className="py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-3xl shadow-md hover:bg-blue-700">
              Schedule Exam
            </button>
          </form>
        </div>

        {/* Upcoming Exams */}
        <div className="flex-1 p-6 bg-white rounded-3xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Exams</h3>
          <div className="space-y-3">
            {MOCK_EXAMS.filter(e => e.type === 'upcoming').map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <FileEdit size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-gray-500">{exam.className} | {exam.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><Edit size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Exams */}
      <div className="p-6 bg-white rounded-3xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Past Exams - Enter Marks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_EXAMS.filter(e => e.type === 'past').map(exam => (
                <tr key={exam.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="py-1 px-4 bg-blue-100 text-[#2F69FF] font-medium rounded-lg hover:bg-blue-200">
                      Enter Marks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
