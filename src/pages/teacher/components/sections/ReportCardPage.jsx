// ReportCard Page component 
import React, { useState } from 'react';
import { MOCK_REPORT_CARD } from '../../data/mockData';

const ReportCardPage = () => {
  const [report, setReport] = useState(null);

  const generateReport = (e) => {
    e.preventDefault();
    // Simulate generation
    setReport(MOCK_REPORT_CARD);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Generate Report Card</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={generateReport}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Class 9</option>
              <option>Class 8</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Mathematics</option>
              <option>Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>
          <div className="self-end">
            <button type="submit" className="w-full py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </form>
      </div>

      {report && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Yearly Report Card - {report.className} ({report.year})
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment 1 (20%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mid-Term (30%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Marks (50%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.asm1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.midterm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.final}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{student.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
              Finalize & Publish
            </button>
            <button className="py-2 px-5 bg-white text-gray-700 font-medium rounded-lg shadow-md border border-gray-300 hover:bg-gray-50">
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCardPage;
