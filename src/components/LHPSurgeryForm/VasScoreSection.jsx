import React from 'react';
import { Activity } from 'lucide-react';

const VasScoreSection = ({ formData, onInputChange,disabled }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Activity className="w-6 h-6 text-cyan-600" />
        <span>VAS Score (Pain Assessment)</span>
      </h2>
      <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-6 rounded-xl border-2 border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Visual Analog Scale (0-10)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="vasScore"
              min="0"
              max="10"
              value={formData.vasScore}
              onChange={onInputChange}
              disabled={disabled}
              className="flex-1 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="w-20 text-center">
              <span className="text-3xl font-bold text-gray-900">{formData.vasScore || 0}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span className="font-semibold text-green-600">0 - No Pain</span>
          <span className="font-semibold text-yellow-600">5 - Moderate</span>
          <span className="font-semibold text-red-600">10 - Worst Pain</span>
        </div>
      </div>
    </div>
  );
};

export default VasScoreSection;