import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const IntraOperativeSection = ({ formData, setFormData,disabled }) => {
  const addIntraOperativeEntry = () => {
    setFormData(prev => ({
      ...prev,
      intraOperativeData: [...prev.intraOperativeData, {
        position: '',
        grade: '',
        energy: ''
      }]
    }));
  };

  const removeIntraOperativeEntry = (index) => {
    setFormData(prev => ({
      ...prev,
      intraOperativeData: prev.intraOperativeData.filter((_, i) => i !== index)
    }));
  };

  const handleIntraOperativeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      intraOperativeData: prev.intraOperativeData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateTotalEnergy = () => {
    return formData.intraOperativeData.reduce((total, item) => {
      return total + (parseFloat(item.energy) || 0);
    }, 0);
  };

  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Intra Operative Data</h2>
        <button
          type="button"
          onClick={addIntraOperativeEntry}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add More</span>
        </button>
      </div>

      {formData.intraOperativeData.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">No intra operative data yet. Click "Add More" to begin.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.intraOperativeData.map((item, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Entry #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeIntraOperativeEntry(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Position of Haemorrhoid (Clock)
                  </label>
                  <select
                    value={item.position}
                    onChange={(e) => handleIntraOperativeChange(index, 'position', e.target.value)}
                    disabled={disabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select position</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} o'clock</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Haemorrhoidal Grade
                  </label>
                  <select
                    value={item.grade}
                    onChange={(e) => handleIntraOperativeChange(index, 'grade', e.target.value)}
                    disabled={disabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select grade</option>
                    <option value="I">Grade I</option>
                    <option value="II">Grade II</option>
                    <option value="III">Grade III</option>
                    <option value="IV">Grade IV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Energy Applied (Joules)
                  </label>
                  <input
                    type="number"
                    value={item.energy}
                    onChange={(e) => handleIntraOperativeChange(index, 'energy', e.target.value)}
                    disabled={disabled}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter joules"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Total Energy Display */}
          <div className="p-4 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total Energy Applied:</span>
              <span className="text-2xl font-bold text-cyan-600">{calculateTotalEnergy()} J</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntraOperativeSection;
