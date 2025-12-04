import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Mail, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'New surgery scheduled for tomorrow', time: '5 min ago', unread: true },
    { id: 2, text: 'Patient record updated successfully', time: '1 hour ago', unread: true },
    { id: 3, text: 'Monthly report is ready', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, records, procedures..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 ml-6">
        {/* Quick Actions */}
        {/* <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition">
          <span className="font-medium text-sm">New Record</span>
        </button> */}

        {/* Messages */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Mail className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                  <span className="text-xs text-cyan-600 font-semibold cursor-pointer hover:text-cyan-700">
                    Mark all as read
                  </span>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? 'bg-cyan-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-cyan-600' : 'bg-gray-300'}`}></div>
                      <div className="flex-1">
                        <p className={`text-sm ${notification.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200">
                <a href="/notifications" className="text-sm text-cyan-600 font-semibold hover:text-cyan-700">
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="hidden lg:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              DJ
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">Dr. John Doe</p>
              <p className="text-xs text-gray-500">Cardiac Surgeon</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    DJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@hospital.com</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <a
                  href="/profile"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">My Profile</span>
                </a>
                <a
                  href="/settings"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Settings</span>
                </a>
                <a
                  href="/help"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Help & Support</span>
                </a>
              </div>

              <div className="border-t border-gray-200 py-2">
                <button className="flex items-center space-x-3 px-4 py-3 w-full hover:bg-gray-50 transition text-left">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;