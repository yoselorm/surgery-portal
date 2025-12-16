import React from 'react';

const TreatmentMethodsSection = ({ formData, setFormData,disabled }) => {
  const treatmentMethods = [
    { key: 'medication', label: 'Medication' },
    { key: 'sclerosation', label: 'Sclerosation' },
    { key: 'infraredCoagulation', label: 'Infrared Coagulation' },
    { key: 'rubberBandLigation', label: 'Rubber Band Ligation' },
    { key: 'halDghal', label: 'HAL/dgHAL' },
    { key: 'surgery', label: 'Surgery' },
    { key: 'longo', label: 'Longo (Hemorrhoidopexy)' },
    { key: 'radioFrequencyAblation', label: 'Radiofrequency Ablation' }
  ];

  const handleTreatmentMethodChange = (method, value) => {
    setFormData(prev => ({
      ...prev,
      treatmentMethods: {
        ...prev.treatmentMethods,
        [method]: value
      }
    }));
  };

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Previous Treatment Methods</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {treatmentMethods.map((method) => (
          <label 
            key={method.key} 
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={formData.treatmentMethods[method.key]}
              onChange={(e) => handleTreatmentMethodChange(method.key, e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm font-medium text-gray-700">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TreatmentMethodsSection;