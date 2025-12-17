import React from 'react';
import {
  Home,
  FileText,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/AuthSlice';
import toast from './Toast';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { user,loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

const handleLogout = (e) => {
  e.preventDefault();

  dispatch(logoutUser())
    .unwrap()
    .then(() => {
      navigate('/signin');
      toast.success('Logged out successfully!');
    });
};
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Surgery Records', path: '/dashboard/records' },
  ];

  return (
    <div
      className={`${collapsed ? 'w-20' : 'w-64'
        } bg-gradient-to-b from-cyan-700 to-blue-800 text-white transition-all duration-300 flex flex-col h-screen relative`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-cyan-600">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg">
            <Activity className="w-6 h-6 text-cyan-700" />
          </div>
          {!collapsed && <span className="text-2xl font-bold">Isolp</span>}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white text-cyan-700 rounded-full p-1 shadow-lg hover:bg-cyan-50 transition z-10"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition group ${isActive
                  ? 'bg-white text-cyan-700 shadow-md'
                  : 'text-cyan-100 hover:bg-cyan-600'
                }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyan-700' : ''}`} />

              {!collapsed && (
                <span className={`font-medium ${isActive ? 'text-cyan-700' : ''}`}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-cyan-600">
        {!collapsed ? (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center font-bold">
            {user?.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user?.doctorId}</p>
              <p className="text-xs text-cyan-200">{user?.specialty}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center font-bold text-sm">
              {user?.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        )}

        <button
        type='submit'
            onClick={handleLogout}
            disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition">
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="text-sm font-medium">{loading ? "Logging out...":"Logout"}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
