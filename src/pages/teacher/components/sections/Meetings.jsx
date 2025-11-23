// pages/Meeting.jsx
import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, Users, Copy, Check } from 'lucide-react';

const Meeting = () => {
  const [showMeetingForm, setShowMeetingForm] = useState(true);
  const [showJitsiMeet, setShowJitsiMeet] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    description: '',
    hostName: '',
    date: '',
    time: '',
    duration: '60',
    participants: '',
    roomName: ''
  });

  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  // Load Jitsi Meet API script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateRoomName = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${meetingDetails.title.replace(/\s+/g, '-').toLowerCase()}-${randomString}`;
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    
    const roomName = generateRoomName();
    const meetingLink = `https://meet.jit.si/${roomName}`;
    
    const newMeeting = {
      ...meetingDetails,
      roomName,
      meetingLink,
      id: Date.now(),
      status: 'Scheduled'
    };

    setScheduledMeetings(prev => [...prev, newMeeting]);
    
    // Reset form
    setMeetingDetails({
      title: '',
      description: '',
      hostName: '',
      date: '',
      time: '',
      duration: '60',
      participants: '',
      roomName: ''
    });

    alert('Meeting scheduled successfully!');
  };

  const startMeeting = (meeting) => {
    setMeetingDetails(meeting);
    setShowJitsiMeet(true);
    setShowMeetingForm(false);
  };

  const copyMeetingLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const JitsiMeetComponent = ({ roomName, displayName }) => {
    useEffect(() => {
      if (window.JitsiMeetExternalAPI && roomName) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: roomName,
          width: '100%',
          height: 600,
          parentNode: document.querySelector('#jitsi-container'),
          userInfo: {
            displayName: displayName
          },
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: false,
            disableModeratorIndicator: false,
            enableWelcomePage: false
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 
              'fullscreen', 'fodeviceselection', 'hangup', 'profile',
              'chat', 'recording', 'livestreaming', 'etherpad', 
              'sharedvideo', 'settings', 'raisehand', 'videoquality',
              'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ]
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListener('videoConferenceJoined', () => {
          console.log('User joined the meeting');
        });

        api.addEventListener('videoConferenceLeft', () => {
          console.log('User left the meeting');
        });

        return () => {
          api.dispose();
        };
      }
    }, [roomName, displayName]);

    return <div id="jitsi-container" className="rounded-lg overflow-hidden shadow-lg"></div>;
  };

  return (
    <div className="max-w-8xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Video className="text-[#2F69FF]" size={36} />
          Jitsi Meetings
        </h1>
        <p className="text-gray-600 mt-2">Schedule and join video meetings with Jitsi Meet</p>
      </div>

      {showMeetingForm && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Meeting Form */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Calendar size={24} className="text-[#2F69FF]" />
              Schedule New Meeting
            </h2>
            
            <form onSubmit={handleScheduleMeeting} className="space-y-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 ">
                  Meeting Title 
                </label>
                <input
                  type="text"
                  name="title"
                  value={meetingDetails.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Math Class - Grade 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Name 
                </label>
                <input
                  type="text"
                  name="hostName"
                  value={meetingDetails.hostName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={meetingDetails.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Meeting agenda or description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date 
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={meetingDetails.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time 
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={meetingDetails.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) 
                </label>
                <select
                  name="duration"
                  value={meetingDetails.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none transition"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              
                
            
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] text-white py-3 rounded-3xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Schedule Meeting
              </button>
            </form>
          </div>

          {/* Scheduled Meetings List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Clock size={24} className="text-[#2F69FF]" />
              Scheduled Meetings ({scheduledMeetings.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {scheduledMeetings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Calendar size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No meetings scheduled yet</p>
                </div>
              ) : (
                scheduledMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">{meeting.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p className="flex items-center gap-2">
                        <Users size={16} />
                        Host: {meeting.hostName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={16} />
                        {meeting.date} at {meeting.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={16} />
                        Duration: {meeting.duration} minutes
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={meeting.meetingLink}
                        readOnly
                        className="flex-1 px-3 py-1 bg-gray-50 border border-gray-300 rounded text-xs"
                      />
                      <button
                        onClick={() => copyMeetingLink(meeting.meetingLink)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded transition"
                        title="Copy link"
                      >
                        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                      </button>
                    </div>

                    <button
                      onClick={() => startMeeting(meeting)}
                      className="w-full bg-[#2F69FF] text-white py-2 rounded-lg font-medium hover:bg-[#1e4fd9] transition"
                    >
                      Join Meeting
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Jitsi Meet Video Conference */}
      {showJitsiMeet && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{meetingDetails.title}</h2>
            <button
              onClick={() => {
                setShowJitsiMeet(false);
                setShowMeetingForm(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Leave Meeting
            </button>
          </div>
          
          <JitsiMeetComponent 
            roomName={meetingDetails.roomName} 
            displayName={meetingDetails.hostName}
          />
        </div>
      )}
    </div>
  );
};

export default Meeting;
