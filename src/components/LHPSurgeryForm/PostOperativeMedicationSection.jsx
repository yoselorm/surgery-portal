import React from 'react';

const PostOperativeMedicationSection = ({ formData, onInputChange,disabled }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Postoperative Medication</h2>
      <textarea
        value={formData.postoperativeMedication}
        name='postoperativeMedication'
        onChange={onInputChange}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        rows="4"
        placeholder="Enter postoperative medication details and instructions..."
      />
    </div>
  );
};

export default PostOperativeMedicationSection;