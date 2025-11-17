// Assignments Page component 
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { MOCK_ASSIGNMENTS } from '../../data/mockData';

const AssignmentsPage = () => {
  const [view, setView] = useState("view"); // "view" or "upload"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setView("upload")}
          className="py-2 px-5 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
        >
          Upload New Assignments
        </button>
        <button
          onClick={() => setView("view")}
          className="py-2 px-5 bg-white text-gray-700 font-medium rounded-lg shadow-md border border-gray-300 hover:bg-gray-50"
        >
          View Submitted Assignments
        </button>
      </div>

      {/* Upload View */}
      {view === "upload" && (
        <div className="p-6 bg-white rounded-lg shadow-sm max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Upload New Assignment</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Algebra Homework" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class/Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Select Class</option>
                  <option>Class 5 Math</option>
                  <option>Class 6 Science</option>
                  <option>Class 8 History</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3" placeholder="Add a description..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach File (Max 10MB)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#2F69FF] hover:text-blue-700">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">ZIP, PDF, DOCX up to 10MB</p>
                </div>
              </div>
            </div>
            <button type="submit" className="py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
              Upload
            </button>
          </form>
        </div>
      )}

      {/* View Submissions View */}
      {view === "view" && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Submitted Assignments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class/Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_ASSIGNMENTS.map((asm) => (
                  <tr key={asm.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asm.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asm.className}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asm.submittedOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${asm.status === 'Pending Review' ? 'bg-blue-100 text-blue-800' : asm.status.startsWith('Reviewed') ? 'bg-blue-100 text-blue-800' : 'bg-blue-100 text-blue-800'}`}>
                        {asm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(asm)}
                        className="text-[#2F69FF] hover:text-blue-700"
                      >
                        {asm.status === 'Pending Review' ? 'Grade' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {isModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Grade Assignment</h3>
            <img
              src="https://placehold.co/100x100/E8F0FE/333333?text=File+Icon"
              alt="File"
              className="w-24 h-24 mx-auto mb-4 rounded-lg"
              onError={(e) => e.target.style.display = 'none'}
            />
            <div className="text-center mb-4">
              <p className="font-medium">{selectedAssignment.studentName}</p>
              <p className="text-sm text-gray-500">{selectedAssignment.className}</p>
              <a href="#" className="text-sm text-[#2F69FF] hover:underline">{selectedAssignment.file}</a>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks (0/100)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter marks" />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={closeModal}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-900"
              >
                Accept & Grade
              </button>
              <button
                onClick={closeModal}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-900"
              >
                Reject & Ask for Resubmission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
