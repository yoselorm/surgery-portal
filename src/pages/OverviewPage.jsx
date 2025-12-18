import React, { useState, useEffect } from 'react';
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
  Stethoscope,
  Award
} from 'lucide-react';
import axios from 'axios';
import { api_url_v1 } from '../utils/config';
import api from '../utils/api';

const OverviewPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [quickStats, setQuickStats] = useState(null);
  const [recentSurgeries, setRecentSurgeries] = useState([]);
  const [breakdown, setBreakdown] = useState(null);

  // Fetch all data on mount and when timeRange changes
  useEffect(() => {
    fetchAllData();
  }, [timeRange]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
    

      const [dashResponse, quickResponse, surgeryResponse, breakdownResponse] = await Promise.all([
        api.get(`${api_url_v1}/dashboard?timeRange=${timeRange}`),
        api.get(`${api_url_v1}/quick-stats`),
        api.get(`${api_url_v1}/recent-surgeries?limit=5`),
        api.get(`${api_url_v1}/breakdown`,)
      ]);

      setDashboardData(dashResponse.data.data);
      setQuickStats(quickResponse.data.data);
      setRecentSurgeries(surgeryResponse.data.data);
      setBreakdown(breakdownResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      complete: { label: 'Complete', color: 'bg-green-100 text-green-700' },
      incomplete: { label: 'Incomplete', color: 'bg-yellow-100 text-yellow-700' }
    };

    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-700' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  // Build stats array from actual data
  const stats = [
    {
      title: 'Total Surgeries',
      value: dashboardData?.summary?.totalSurgeriesInRange || 0,
      icon: Activity,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      trend: 'up',
      change: dashboardData?.summary?.completionRateInRange || '0%'
    },
    {
      title: 'Completed',
      value: dashboardData?.summary?.completedSurgeries || 0,
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      trend: 'up',
      change: dashboardData?.summary?.completionRateInRange || '0%'
    },
    {
      title: 'Incomplete',
      value: dashboardData?.summary?.incompleteSurgeries || 0,
      icon: Clock,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      trend: 'down',
      change: `${dashboardData?.summary?.incompleteSurgeries || 0} pending`
    },
    {
      title: 'This Week',
      value: quickStats?.thisWeekSurgeries || 0,
      icon: Calendar,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      trend: 'up',
      change: `${quickStats?.todaySurgeries || 0} today`
    }
  ];

  // Department stats from breakdown
  const departmentStats = breakdown?.surgeryTypeBreakdown?.slice(0, 4).map(type => ({
    name: type.surgeryType,
    count: type.total,
    icon: Stethoscope,
    color: 'text-cyan-600'
  })) || [];

  // If no surgery types, show procedure breakdown
  const procedureStats = breakdown?.procedureBreakdown?.slice(0, 4).map(proc => ({
    name: proc.procedure,
    count: proc.total,
    icon: FileText,
    color: 'text-blue-600'
  })) || [];

  const displayStats = departmentStats.length > 0 ? departmentStats : procedureStats;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back, Doctor</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button 
            onClick={fetchAllData}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium"
          >
            Refresh Data
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
                      <ArrowDown className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className={`text-sm font-semibold ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">completion rate</span>
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
              <button 
                onClick={() => window.location.href = '/dashboard/records'}
                className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold"
              >
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentSurgeries.length > 0 ? (
              recentSurgeries.map((surgery, index) => (
                <div
                  key={surgery._id || index}
                  className="p-6 hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-bold text-gray-900">{surgery.procedure}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{surgery.surgeryId}</span>
                      </div>
                      {surgery.surgeryType && (
                        <p className="text-gray-700 text-sm font-medium">{surgery.surgeryType}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{formatDate(surgery.date)}</span>
                        <span>•</span>
                        <span>Created {formatDate(surgery.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(surgery.status)}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No recent surgeries found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Quick Stats</h2>
            <p className="text-sm text-gray-500 mt-1">Your performance overview</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="border-l-4 border-cyan-600 bg-cyan-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-cyan-700">Today's Surgeries</span>
                <span className="text-2xl font-bold text-cyan-700">{quickStats?.todaySurgeries || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Scheduled for today</p>
            </div>

            <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-blue-700">This Week</span>
                <span className="text-2xl font-bold text-blue-700">{quickStats?.thisWeekSurgeries || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Weekly procedures</p>
            </div>

            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-yellow-700">Incomplete</span>
                <span className="text-2xl font-bold text-yellow-700">{quickStats?.incompleteSurgeries || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Pending completion</p>
            </div>

            <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-green-700">Total Surgeries</span>
                <span className="text-2xl font-bold text-green-700">{quickStats?.totalSurgeries || 0}</span>
              </div>
              <p className="text-xs text-gray-600">Career milestone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Surgery Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {departmentStats.length > 0 ? 'Top Surgery Types' : 'Top Procedures'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-shrink-0">
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 truncate">{item.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                </div>
              </div>
            );
          })}
        </div>
        {displayStats.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No surgery data available</p>
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData?.summary?.completionRateInRange || '0%'}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">In selected time range</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">All Time Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData?.summary?.completionRateAllTime || '0%'}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Career performance</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Recently Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {quickStats?.recentlyCompleted || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Completed this week</p>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => window.location.href = '/new-surgery'}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left"
        >
          <FileText className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">New Surgery Record</h3>
          <p className="text-cyan-100 text-sm mt-1">Create a new surgical procedure record</p>
        </button>

        <button 
          onClick={() => window.location.href = '/analytics'}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left"
        >
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">View Analytics</h3>
          <p className="text-blue-100 text-sm mt-1">Detailed performance and trends</p>
        </button>

        <button 
          onClick={() => window.location.href = '/surgeries'}
          className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-6 rounded-xl hover:shadow-xl transition transform hover:-translate-y-1 text-left"
        >
          <Activity className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold">All Surgeries</h3>
          <p className="text-purple-100 text-sm mt-1">View and manage all surgical records</p>
        </button>
      </div> */}
    </div>
  );
};

export default OverviewPage;