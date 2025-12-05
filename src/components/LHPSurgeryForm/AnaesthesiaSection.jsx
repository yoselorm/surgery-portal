import React from 'react';

const AnaesthesiaSection = ({ formData, onInputChange }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Anaesthesia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Anaesthesia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            General Anaesthesia
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.generalAnaesthesia === 'yes'}
                onChange={(e) => onInputChange('generalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.generalAnaesthesia === 'no'}
                onChange={(e) => onInputChange('generalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Regional Anaesthesia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Regional Anaesthesia
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.regionalAnaesthesia === 'yes'}
                onChange={(e) => onInputChange('regionalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.regionalAnaesthesia === 'no'}
                onChange={(e) => onInputChange('regionalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Local Anaesthesia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Local Anaesthesia
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.localAnaesthesia === 'yes'}
                onChange={(e) => onInputChange('localAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.localAnaesthesia === 'no'}
                onChange={(e) => onInputChange('localAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Spinal Anaesthesia
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.spinalAnaesthesia === 'yes'}
                onChange={(e) => onInputChange('spinalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.localAnaesthesia === 'no'}
                onChange={(e) => onInputChange('spinalAnaesthesia', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Saddle Block
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.saddleBlock === 'yes'}
                onChange={(e) => onInputChange('saddleBlock', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.localAnaesthesia === 'no'}
                onChange={(e) => onInputChange('saddleBlock', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pudendus Block
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.pudendusBlock === 'yes'}
                onChange={(e) => onInputChange('pudendusBlock', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={formData.localAnaesthesia === 'no'}
                onChange={(e) => onInputChange('pudendusBlock', e.target.value)}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

               
      </div>
    </div>
  );
};

export default AnaesthesiaSection;
