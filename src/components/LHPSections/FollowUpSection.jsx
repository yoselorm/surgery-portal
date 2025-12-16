import React from 'react';
import { Calendar } from 'lucide-react';

const FollowUpSection = ({ followUp, isEditMode, onChange }) => {
  const followUpPeriods = [
    { key: 'twoWeeks', label: '2 Weeks' },
    { key: 'sixWeeks', label: '6 Weeks' },
    { key: 'threeMonths', label: '3 Months' },
    { key: 'sixMonths', label: '6 Months' },
    { key: 'twelveMonths', label: '12 Months' },
    { key: 'twoYears', label: '2 Years' },
    { key: 'threeYears', label: '3 Years' },
    { key: 'fiveYears', label: '5 Years' }
  ];

  const completedCount = followUpPeriods.filter(
    p => followUp?.[p.key]?.completed
  ).length;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Calendar className="w-6 h-6 text-cyan-600" />
        <span>Follow-Up Schedule</span>
      </h2>
      
      <div className="space-y-4">
        {followUpPeriods.map((period) => {
          const followUpData = followUp?.[period.key] || { 
            completed: false, 
            date: '', 
            notes: '' 
          };

          return (
            <div
              key={period.key}
              className={`p-5 rounded-lg border-2 transition ${
                followUpData.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      checked={followUpData.completed}
                      onChange={(e) => onChange(period.key, 'completed', e.target.checked)}
                      className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                    />
                  ) : (
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        followUpData.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {followUpData.completed && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  <label className="text-lg font-semibold text-gray-900">
                    {period.label} Follow-Up
                  </label>
                </div>
                {followUpData.completed && !isEditMode && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Completed
                  </span>
                )}
              </div>

              {followUpData.completed && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Follow-Up Date
                    </label>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={followUpData.date || ''}
                        onChange={(e) => onChange(period.key, 'date', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {formatDate(followUpData.date)}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes
                    </label>
                    {isEditMode ? (
                      <textarea
                        value={followUpData.notes || ''}
                        onChange={(e) => onChange(period.key, 'notes', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        rows="2"
                        placeholder="Enter follow-up notes or observations"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {followUpData.notes || 'No notes recorded'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Follow-Up Summary */}
      <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Follow-Up Progress:</span>
          <span className="text-lg font-bold text-cyan-600">
            {completedCount} / {followUpPeriods.length} Completed
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedCount / followUpPeriods.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpSection;