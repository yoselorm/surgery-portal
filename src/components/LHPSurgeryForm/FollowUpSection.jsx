import React from 'react';
import { Calendar } from 'lucide-react';

const FollowUpSection = ({ formData, setFormData,disabled }) => {
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

  const symptoms = [
    { key: 'pain', label: 'Pain' },
    { key: 'itching', label: 'Itching' },
    { key: 'bleeding', label: 'Bleeding' },
    { key: 'soiling', label: 'Soiling' },
    { key: 'prolapsing', label: 'Prolapsing' }
  ];

  const handleFollowUpChange = (period, field, value) => {
    setFormData(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        [period]: {
          ...prev.followUp[period],
          [field]: value
        }
      }
    }));
  };

  const handleSymptomChange = (period, symptom, value) => {
    setFormData(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        [period]: {
          ...prev.followUp[period],
          symptoms: {
            ...prev.followUp[period].symptoms,
            [symptom]: value
          }
        }
      }
    }));
  };

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Calendar className="w-6 h-6 text-cyan-600" />
        <span>Follow-Up Schedule</span>
      </h2>
      <div className="space-y-4">
        {followUpPeriods.map((period) => (
          <div key={period.key} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.followUp[period.key].completed}
                  onChange={(e) => handleFollowUpChange(period.key, 'completed', e.target.checked)}
                  disabled={disabled}
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                />
                <label className="text-sm font-semibold text-gray-900">
                  {period.label} Follow-Up
                </label>
              </div>
              {formData.followUp[period.key].completed && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Completed
                </span>
              )}
            </div>

            {formData.followUp[period.key].completed && (
              <div className="space-y-4 mt-4">
                {/* Follow-Up Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={formData.followUp[period.key].date}
                    onChange={(e) => handleFollowUpChange(period.key, 'date', e.target.value)}
                    disabled={disabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                {/* VAS Score */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    VAS Score (Pain Assessment)
                  </label>
                  <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={formData.followUp[period.key].vasScore || 0}
                        onChange={(e) => handleFollowUpChange(period.key, 'vasScore', e.target.value)}
                        disabled={disabled}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: 'linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)'
                        }}
                      />
                      <div className="w-16 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {formData.followUp[period.key].vasScore || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span className="font-semibold text-green-600">0 - No Pain</span>
                      <span className="font-semibold text-yellow-600">5 - Moderate</span>
                      <span className="font-semibold text-red-600">10 - Worst</span>
                    </div>
                  </div>
                </div>

                {/* Symptoms Assessment (Yes/No) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Symptoms Present
                  </label>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {symptoms.map((symptom) => (
                        <div key={symptom.key} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                          <span className="text-sm font-medium text-gray-700">{symptom.label}</span>
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`${period.key}_${symptom.key}`}
                                value="yes"
                                checked={formData.followUp[period.key].symptoms?.[symptom.key] === 'yes'}
                                onChange={(e) => handleSymptomChange(period.key, symptom.key, e.target.value)}
                                disabled={disabled}
                                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                              />
                              <span className="text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`${period.key}_${symptom.key}`}
                                value="no"
                                checked={formData.followUp[period.key].symptoms?.[symptom.key] === 'no'}
                                onChange={(e) => handleSymptomChange(period.key, symptom.key, e.target.value)}
                                disabled={disabled}
                                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                              />
                              <span className="text-sm text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.followUp[period.key].notes}
                    onChange={(e) => handleFollowUpChange(period.key, 'notes', e.target.value)}
                    disabled={disabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows="3"
                    placeholder="Enter follow-up notes or observations"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpSection;