// Notes Page component 
import React, { useState } from 'react';
import { Upload, Edit, Trash } from 'lucide-react';
import { MOCK_NOTES } from '../../data/mockData';

const NotesPage = () => {
  const [view, setView] = useState("view"); // "view" or "upload"

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setView("upload")}
          className="py-2 px-5 bg-[#2F69FF] text-white font-medium rounded-3xl shadow-md hover:bg-blue-700"
        >
          Upload New Note
        </button>
        <button
          onClick={() => setView("view")}
          className="py-2 px-5 bg-white text-gray-700 font-medium rounded-3xl shadow-md border border-gray-300 hover:bg-gray-50"
        >
          View Previously Added Notes
        </button>
      </div>

      {/* Upload View */}
      {view === "upload" && (
        <div className="p-6 bg-white rounded-3xl shadow-sm max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Upload New Note</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Algebra Basics" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class/Subject</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Select Class</option>
                <option>Class 5 Math</option>
                <option>Class 6 Science</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-3xl" rows="3" placeholder="Add a short description..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-3xl">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">Drag and drop or <span className="text-[#2F69FF] font-medium">browse</span></p>
                  <p className="text-xs text-gray-500">PDF, DOCX, PPTX</p>
                </div>
              </div>
            </div>
            <button type="submit" className="py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-lg shadow-md hover:bg-blue-700">
              Upload Note
            </button>
          </form>
        </div>
      )}

      {/* View Notes View */}
      {view === "view" && (
        <div className="p-6 bg-white rounded-lg shadow-sm  ">
          <h3 className="text-lg font-semibold mb-4">Previously Added Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_NOTES.map((subject) => (
              <div key={subject.id} className="p-5 rounded-3xl shadow-sm bg-blue-50">
                <h4 className="font-semibold text-lg mb-3">{subject.subject}</h4>
                <div className="space-y-2">
                  {subject.topics.map((topic) => (
                    <div key={topic} className="flex items-center justify-between p-3 bg-white rounded-3xl">
                      <span className="text-sm font-medium text-gray-700">{topic}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                        <button className="text-blue-500 hover:text-blue-700"><Trash size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
