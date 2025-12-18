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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/AuthSlice';
import toast from './Toast';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loading } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        setShowProfileMenu(false);
        navigate('/signin');
        toast.success('Logged out successfully!');
      });
  };


  const gotoProfile = () => {
    setShowProfileMenu(false)
    navigate('/dashboard/profile')
  }

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






        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">Dr. {user?.fullname}</p>
              <p className="text-xs text-gray-500">{user?.specialty}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.fullname
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.doctorId}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={gotoProfile}
                  className="flex items-center w-full space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">My Profile</span>
                </button>

              </div>

              <div className="border-t border-gray-200 py-2">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className={`flex items-center space-x-3 px-4 py-3 w-full transition text-left
      ${loading ? 'cursor-not-allowed opacity-70' : 'hover:bg-red-50'}`}
                >
                  {loading ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="w-4 h-4 animate-spin text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>

                      <span className="text-sm text-red-600 font-medium">
                        Logging out...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">Logout</span>
                    </>
                  )}
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