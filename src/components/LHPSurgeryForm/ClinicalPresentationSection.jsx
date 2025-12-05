import React from 'react';
import { FileText } from 'lucide-react';

const ClinicalPresentationSection = ({ formData, onInputChange }) => {
  const symptoms = [
    { key: 'pain', label: 'PAIN' },
    { key: 'itching', label: 'ITCHING' },
    { key: 'bleeding', label: 'BLEEDING' },
    { key: 'soiling', label: 'SOILING' },
    { key: 'prolapsing', label: 'PROLAPSING' }
  ];

  const frequencies = [
    { value: 'never', label: 'Never' },
    { value: 'less_than_once_month', label: 'Less than once a month' },
    { value: 'less_than_once_week', label: 'Less than once a week' },
    { value: '1_6_days_per_week', label: '1-6 days per week' },
    { value: 'every_day', label: 'Every day (always)' }
  ];

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <FileText className="w-6 h-6 text-cyan-600" />
        <span>Clinical Presentation: Need for Surgery</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-r">
                Symptom
              </th>
              {frequencies.map((freq) => (
                <th key={freq.value} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-r">
                  {freq.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {symptoms.map((symptom) => (
              <tr key={symptom.key} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r">
                  {symptom.label}
                </td>
                {frequencies.map((freq) => (
                  <td key={freq.value} className="px-4 py-3 text-center border-r">
                    <input
                      type="radio"
                      name={symptom.key}
                      value={freq.value}
                      checked={formData[symptom.key] === freq.value}
                      onChange={(e) => onInputChange(symptom.key, e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicalPresentationSection;
