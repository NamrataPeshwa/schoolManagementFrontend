import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash, Users, FileText, Clock, TrendingUp } from 'lucide-react';

const MOCK_SUBJECTS = [
  { 
    id: 1, 
    name: "Mathematics", 
    grade: "Grade 9-10",
    students: 85,
    topics: 12,
    nextClass: "Today, 2:00 PM",
    completion: 65,
    color: "bg-blue-100 text-blue-800"
  },
  { 
    id: 2, 
    name: "Physics", 
    grade: "Grade 11-12",
    students: 62,
    topics: 10,
    nextClass: "Tomorrow, 10:00 AM",
    completion: 45,
    color: "bg-blue-100 text-blue-800"
  },
  { 
    id: 3, 
    name: "Chemistry", 
    grade: "Grade 11",
    students: 54,
    topics: 8,
    nextClass: "Friday, 11:00 AM",
    completion: 38,
    color: "bg-blue-100 text-blue-800"
  },
  { 
    id: 4, 
    name: "Biology", 
    grade: "Grade 10",
    students: 72,
    topics: 15,
    nextClass: "Monday, 9:00 AM",
    completion: 52,
    color: "bg-blue-100 text-blue-800"
  },
];

const SubjectPage = () => {
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({
    name: '',
    grade: '',
    students: 0,
    topics: 0
  });

  const handleAddSubject = (e) => {
    e.preventDefault();
    const subject = {
      id: subjects.length + 1,
      ...newSubject,
      nextClass: "Not scheduled",
      completion: 0,
      color: "bg-blue-100 text-blue-800"
    };
    setSubjects([...subjects, subject]);
    setIsAddModalOpen(false);
    setNewSubject({ name: '', grade: '', students: 0, topics: 0 });
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Subjects</h2>
          <p className="text-gray-600">Manage your teaching subjects and curriculum</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 py-2 px-5 bg-[#2F69FF] text-white font-medium rounded-3xl shadow-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Add New Subject
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Subjects</p>
              <p className="text-3xl font-bold text-gray-800">{subjects.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Students</p>
              <p className="text-3xl font-bold text-gray-800">
                {subjects.reduce((sum, s) => sum + s.students, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Topics</p>
              <p className="text-3xl font-bold text-gray-800">
                {subjects.reduce((sum, s) => sum + s.topics, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="p-5 bg-white rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Avg Completion</p>
              <p className="text-3xl font-bold text-gray-800">
                {Math.round(subjects.reduce((sum, s) => sum + s.completion, 0) / subjects.length)}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subject) => (
          <div key={subject.id} className="p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full ${subject.color} font-medium text-sm`}>
                {subject.grade}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="p-2 text-blue-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <Users size={16} />
                  Students
                </span>
                <span className="font-semibold text-gray-800">{subject.students}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <FileText size={16} />
                  Topics Covered
                </span>
                <span className="font-semibold text-gray-800">{subject.topics}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <Clock size={16} />
                  Next Class
                </span>
                <span className="font-semibold text-gray-800">{subject.nextClass}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Curriculum Progress</span>
                <span className="font-semibold text-gray-800">{subject.completion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#2F69FF] h-2 rounded-full transition-all"
                  style={{ width: `${subject.completion}%` }}
                ></div>
              </div>
            </div>

            <button className="w-full py-2 px-4 bg-blue-50 text-[#2F69FF] font-medium rounded-3xl hover:bg-blue-100 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mathematics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Level</label>
                <input
                  type="text"
                  required
                  value={newSubject.grade}
                  onChange={(e) => setNewSubject({...newSubject, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Grade 9-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input
                    type="number"
                    required
                    value={newSubject.students}
                    onChange={(e) => setNewSubject({...newSubject, students: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                  <input
                    type="number"
                    required
                    value={newSubject.topics}
                    onChange={(e) => setNewSubject({...newSubject, topics: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
