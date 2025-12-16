import React from 'react';
import { Activity } from 'lucide-react';

const VASScoreSection = ({ vasScore, isEditMode, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Activity className="w-6 h-6 text-cyan-600" />
        <span>VAS Score (Pain Assessment)</span>
      </h2>
      <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-6 rounded-xl border-2 border-gray-200">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Visual Analog Scale (0-10)
          </label>
          {isEditMode ? (
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="10"
                value={vasScore || 0}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 h-3 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="10"
                value={vasScore || 0}
                onChange={(e) => onChange(e.target.value)}
                className="w-20 text-center text-2xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg px-2 py-1"
              />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-cyan-600 rounded-full shadow-lg"
                  style={{ left: `${(vasScore || 0) * 10}%`, transform: 'translate(-50%, -50%)' }}
                ></div>
              </div>
              <div className="w-20 text-center">
                <span className="text-3xl font-bold text-gray-900">{vasScore || 0}</span>
              </div>
            </div>
          )}
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

export default VASScoreSection;