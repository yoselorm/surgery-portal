import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  FileText,
  Heart,
  Brain,
  Stethoscope
} from 'lucide-react';

const OverviewPage = () => {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    {
      title: 'Total Surgeries',
      value: '248',
      change: '+12.5%',
      trend: 'up',
      icon: Activity,
      color: 'cyan',
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-600'
    },
    {
      title: 'Scheduled Today',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Patients',
      value: '186',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Success Rate',
      value: '98.4%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  const recentSurgeries = [
    {
      id: 'SRG-2847',
      patient: 'Sarah Johnson',
      procedure: 'Cardiac Bypass',
      doctor: 'Dr. John Doe',
      status: 'Completed',
      time: '2 hours ago',
      statusColor: 'green'
    },
    {
      id: 'SRG-2846',
      patient: 'Michael Chen',
      procedure: 'Knee Replacement',
      doctor: 'Dr. Emily Smith',
      status: 'In Progress',
      time: 'Now',
      statusColor: 'blue'
    },
    {
      id: 'SRG-2845',
      patient: 'Jessica Williams',
      procedure: 'Appendectomy',
      doctor: 'Dr. Robert Brown',
      status: 'Completed',
      time: '5 hours ago',
      statusColor: 'green'
    },
    {
      id: 'SRG-2844',
      patient: 'David Martinez',
      procedure: 'Cataract Surgery',
      doctor: 'Dr. Lisa Anderson',
      status: 'Scheduled',
      time: 'Tomorrow, 9:00 AM',
      statusColor: 'yellow'
    },
    {
      id: 'SRG-2843',
      patient: 'Emma Thompson',
      procedure: 'Hip Replacement',
      doctor: 'Dr. John Doe',
      status: 'Completed',
      time: '1 day ago',
      statusColor: 'green'
    }
  ];

  const upcomingSchedule = [
    {
      time: '09:00 AM',
      patient: 'Robert Taylor',
      procedure: 'Spinal Fusion',
      room: 'OR-3',
      duration: '4 hours'
    },
    {
      time: '11:30 AM',
      patient: 'Maria Garcia',
      procedure: 'Gallbladder Removal',
      room: 'OR-1',
      duration: '2 hours'
    },
    {
      time: '02:00 PM',
      patient: 'James Wilson',
      procedure: 'Hernia Repair',
      room: 'OR-2',
      duration: '1.5 hours'
    },
    {
      time: '04:30 PM',
      patient: 'Linda Brown',
      procedure: 'Thyroid Surgery',
      room: 'OR-4',
      duration: '3 hours'
    }
  ];

  const departmentStats = [
    { name: 'Cardiology', count: 45, icon: Heart, color: 'text-red-600' },
    { name: 'Orthopedics', count: 38, icon: Activity, color: 'text-blue-600' },
    { name: 'Neurology', count: 32, icon: Brain, color: 'text-purple-600' },
    { name: 'General', count: 28, icon: Stethoscope, color: 'text-green-600' }
  ];

  const getStatusBadge = (status, color) => {
    const colors = {
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      red: 'bg-red-100 text-red-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back, Dr. John Doe</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs last {timeRange}</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Surgeries */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Surgeries</h2>
              <button className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentSurgeries.map((surgery, index) => (
              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-gray-900">{surgery.patient}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{surgery.id}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{surgery.procedure}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{surgery.doctor}</span>
                      <span>•</span>
                      <span>{surgery.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(surgery.status, surgery.statusColor)}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <p className="text-sm text-gray-500 mt-1">{upcomingSchedule.length} procedures scheduled</p>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {upcomingSchedule.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-cyan-600 bg-cyan-50 p-4 rounded-r-lg hover:bg-cyan-100 transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-bold text-cyan-700">{item.time}</span>
                  <span className="text-xs bg-cyan-200 text-cyan-800 px-2 py-1 rounded">
                    {item.room}
                  </span>
                </div>
                <p className="font-semibold text-gray-900">{item.patient}</p>
                <p className="text-sm text-gray-600 mt-1">{item.procedure}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Surgery by Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentStats.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-shrink-0">
                  <Icon className={`w-8 h-8 ${dept.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{dept.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{dept.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left">
          <FileText className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">New Surgery Record</h3>
          <p className="text-cyan-100 text-sm mt-1">Create a new surgical procedure record</p>
        </button>

        <button className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left">
          <Calendar className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">Schedule Surgery</h3>
          <p className="text-blue-100 text-sm mt-1">Add a new procedure to the calendar</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left">
          <Users className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">Patient Records</h3>
          <p className="text-purple-100 text-sm mt-1">View and manage patient information</p>
        </button>
      </div>
    </div>
  );
};

export default OverviewPage;