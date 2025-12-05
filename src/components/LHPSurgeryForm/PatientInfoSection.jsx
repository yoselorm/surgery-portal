import React from 'react';
import { User } from 'lucide-react';

const PatientInfoSection = ({ formData, onInputChange }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <User className="w-6 h-6 text-cyan-600" />
        <span>Patient Information</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Patient Initials
          </label>
          <input
            type="text"
            value={formData.patientInitials}
            onChange={(e) => onInputChange('patientInitials', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g., J.D."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Patient Age
          </label>
          <input
            type="number"
            value={formData.patientAge}
            onChange={(e) => onInputChange('patientAge', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => onInputChange('gender', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoSection;
