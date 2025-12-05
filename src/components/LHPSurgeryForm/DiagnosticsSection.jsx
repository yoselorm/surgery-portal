import React from 'react';
import { FileText } from 'lucide-react';

const DiagnosticsSection = ({ formData, setFormData }) => {
  const diagnosticItems = [
    { key: 'fissure', label: 'Fissure' },
    { key: 'skinTags', label: 'Skin Tags' },
    { key: 'leftoverHematoma', label: 'Leftover/Perianal Hematoma' },
    { key: 'fistula', label: 'Fistula' },
    { key: 'cryptitis', label: 'Cryptitis' },
    { key: 'analRectumProlapse', label: 'Anal/Rectum Prolapse' },
    { key: 'analStenosis', label: 'Anal Stenosis' },
    { key: 'analEczema', label: 'Anal Eczema' },
    { key: 'analVeinThrombosis', label: 'Anal Vein Thrombosis' }
  ];

  const handleDiagnosticChange = (diagnostic, field, value) => {
    setFormData(prev => ({
      ...prev,
      diagnostics: {
        ...prev.diagnostics,
        [diagnostic]: {
          ...prev.diagnostics[diagnostic],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <FileText className="w-6 h-6 text-cyan-600" />
        <span>Additional Differential Diagnostics</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Condition
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                Observed
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                Treated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {diagnosticItems.map((item) => (
              <tr key={item.key} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{item.label}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={formData.diagnostics[item.key].observed}
                    onChange={(e) => handleDiagnosticChange(item.key, 'observed', e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={formData.diagnostics[item.key].treated}
                    onChange={(e) => handleDiagnosticChange(item.key, 'treated', e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                </td>
              </tr>
            ))}
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={formData.diagnostics.others.description}
                  onChange={(e) => handleDiagnosticChange('others', 'description', e.target.value)}
                  className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500"
                  placeholder="Others (specify)"
                />
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={formData.diagnostics.others.observed}
                  onChange={(e) => handleDiagnosticChange('others', 'observed', e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={formData.diagnostics.others.treated}
                  onChange={(e) => handleDiagnosticChange('others', 'treated', e.target.checked)}
                  className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticsSection;