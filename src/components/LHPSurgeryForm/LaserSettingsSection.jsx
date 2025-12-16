import React from 'react';
import { Activity } from 'lucide-react';

const LaserSettingsSection = ({ formData, onInputChange,disabled }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Activity className="w-6 h-6 text-cyan-600" />
        <span>Laser Settings</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Laser Wavelength
          </label>
          <select
            value={formData.laserWavelength}
            name='laserWavelength'
            onChange={onInputChange}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="1470nm">1470nm</option>
            <option value="1-2">1-2</option>
            <option value="2-3">2-3</option>
            <option value="3">3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Laser Power
          </label>
          <input
            type="text"
            value={formData.laserPower}
            name='laserPower'
            onChange={onInputChange}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g., 8W"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Laser Pulse Mode (Ontime)
          </label>
          <input
            type="text"
            value={formData.laserPulseMode}
            name='laserPulseMode'
            onChange={onInputChange}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g., 3.0s"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Medication (Aspirin, etc.)
        </label>
        <textarea
          value={formData.medication}
          name='medication'
          onChange={onInputChange}
          disabled={disabled}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          rows="2"
          placeholder="Enter medication details"
        />
      </div>
    </div>
  );
};

export default LaserSettingsSection;
