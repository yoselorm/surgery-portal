import React from 'react';
import { User } from 'lucide-react';

const DoctorInfoSection = ({ formData, onInputChange, disabled }) => {
  return (
    <div>
      {/* <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <User className="w-6 h-6 text-cyan-600" />
        <span>Doctor Information</span>
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Doctor Name
          </label>
          <input
            type="text"
            value={formData.doctorName}
            onChange={(e) => onInputChange('doctorName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter doctor name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter location"
          />
        </div>*/}

{/* 
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onInputChange}
            disabled={disabled}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div> */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Surgery
          </label>
          <input
            type="date"
            name='date'
            value={formData.date ? formData.date.split('T')[0] : ''}
            onChange={onInputChange}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoSection;