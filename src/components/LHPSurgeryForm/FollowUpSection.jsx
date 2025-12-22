import React, { useState } from 'react';
import { Calendar, Edit2, Save, X } from 'lucide-react';

const FollowUpSection = ({ formData, setFormData, disabled, surgeryStatus, onSaveFollowUps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const toggleEdit = async () => {
    if (isEditing) {
      // Save to backend when toggling off
      if (onSaveFollowUps) {
        setIsSaving(true);
        try {
          await onSaveFollowUps();
          setIsEditing(false);
        } catch (error) {
          console.error('Failed to save follow-ups:', error);
        } finally {
          setIsSaving(false);
        }
      } else {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  // Determine if fields should be disabled based on status
  const getFollowUpDisabled = () => {
    // If status is 'complete', always disabled
    if (surgeryStatus === 'complete') return true;
    
    // If status is 'follow-ups', check editing state
    if (surgeryStatus === 'follow-ups') return !isEditing;
    
    // If status is 'draft', use the disabled prop
    if (surgeryStatus === 'draft') return disabled;
    
    // For create mode (no status), use disabled prop
    return disabled && !isEditing;
  };

  const isDisabled = getFollowUpDisabled();

  // Show edit button only for 'follow-ups' or 'complete' status
  const showEditButton = surgeryStatus === 'follow-ups' || surgeryStatus === 'complete';

  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-cyan-600" />
          <span>Follow-Up Schedule</span>
        </h2>
        
        {/* Edit/Save Button - only show for follow-ups status */}
        {showEditButton && surgeryStatus !== 'complete' && (
          <button
            type="button"
            onClick={toggleEdit}
            disabled={isSaving}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isEditing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-cyan-600 text-white hover:bg-cyan-700'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                <span>Edit Follow-Ups</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Show editing indicator */}
      {isEditing && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">
              Edit mode enabled - You can now modify follow-up records
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-yellow-600 hover:text-yellow-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Locked indicator for completed status */}
      {surgeryStatus === 'complete' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <span className="text-sm font-semibold text-red-800">
            🔒 This record is completed. Follow-ups cannot be edited.
          </span>
        </div>
      )}

      <div className="space-y-4">
        {followUpPeriods.map((period) => (
          <div key={period.key} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.followUp[period.key].completed}
                  onChange={(e) => handleFollowUpChange(period.key, 'completed', e.target.checked)}
                  disabled={isDisabled}
                  className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={formData.followUp[period.key].date}
                    onChange={(e) => handleFollowUpChange(period.key, 'date', e.target.value)}
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

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
                        disabled={isDisabled}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
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
                                disabled={isDisabled}
                                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                disabled={isDisabled}
                                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                              <span className="text-sm text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.followUp[period.key].notes}
                    onChange={(e) => handleFollowUpChange(period.key, 'notes', e.target.value)}
                    disabled={isDisabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
