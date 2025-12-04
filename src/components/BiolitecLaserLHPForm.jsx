import React, { useState } from 'react';
import {
  Save,
  Send,
  ArrowLeft,
  User,
  Activity,
  FileText,
  Plus,
  Trash2,
  Calendar

} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addSurgery } from '../redux/SurgerySlice';
import { useDispatch } from 'react-redux';

const BiolitecLaserLHPForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    // Doctor Info
    doctorName: '',
    location: '',
    city: '',
    date: '',

    // Patient Info
    patientInitials: '',
    patientAge: '',
    gender: '',

    // Laser Settings
    laserWavelength: '1470nm',
    laserPower: '8W',
    laserPulseMode: '3.0s',
    medication: '',

    // Differential Diagnostics
    diagnostics: {
      fissure: { observed: false, treated: false },
      skinTags: { observed: false, treated: false },
      leftoverHematoma: { observed: false, treated: false },
      fistula: { observed: false, treated: false },
      cryptitis: { observed: false, treated: false },
      analRectumProlapse: { observed: false, treated: false },
      analStenosis: { observed: false, treated: false },
      analEczema: { observed: false, treated: false },
      analVeinThrombosis: { observed: false, treated: false },
      others: { observed: false, treated: false, description: '' }
    },

    // Treatment Methods
    treatmentMethods: {
      medication: false,
      sclerosation: false,
      infraredCoagulation: false,
      rubberBandLigation: false,
      halDghal: false,
      surgery: false
    },

    // Anaesthesia & Complications
    complications: '',
    hasComplications: 'no',
    generalAnaesthesia: 'no',
    regionalAnaesthesia: 'no',
    localAnaesthesia: 'no',
    previousOperation: '',
    hasPreviousOp: 'no',
    postoperativeMedication: '',

    // Intra Operative Data (repeatable)
    intraOperativeData: [],
    pain: '',
    itching: '',
    bleeding: '',
    soiling: '',
    prolapsing: '',

    vasScore: '',
    followUp: {
      twoWeeks: { completed: false, date: '', notes: '' },
      sixWeeks: { completed: false, date: '', notes: '' },
      threeMonths: { completed: false, date: '', notes: '' },
      sixMonths: { completed: false, date: '', notes: '' },
      twelveMonths: { completed: false, date: '', notes: '' },
      twoYears: { completed: false, date: '', notes: '' },
      threeYears: { completed: false, date: '', notes: '' },
      fiveYears: { completed: false, date: '', notes: '' }
    }
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const handleTreatmentMethodChange = (method, value) => {
    setFormData(prev => ({
      ...prev,
      treatmentMethods: {
        ...prev.treatmentMethods,
        [method]: value
      }
    }));
  };

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

  const handleFollowUpChange = (period, field, value) => {
    setFormData(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        [period]: {
          ...prev.followUp[period],
          [field]: value
        }
      }
    }));
  };

  const calculateTotalEnergy = () => {
    return formData.intraOperativeData.reduce((total, item) => {
      return total + (parseFloat(item.energy) || 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create surgery record
    const newRecord = {
      id: `SRG-${Math.floor(Math.random() * 9000) + 1000}`,
      patientName: formData.patientInitials,
      patientAge: formData.patientAge,
      procedure: 'Biolitec Laser LHP',
      type: 'Laser Surgery',
      doctor: formData.doctorName,
      date: formData.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      duration: 'N/A',
      status: 'Completed',
      statusColor: 'green',
      formData: formData
    };

    dispatch(addSurgery(newRecord));
    alert('Surgery record submitted successfully!');
    navigate(-1);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    alert('Draft saved successfully!');
  };
  const followUpPeriods = [
    { key: 'twoWeeks', label: '2 Weeks' },
    { key: 'sixWeeks', label: '6 Weeks' },
    { key: 'threeMonths', label: '3 Months' },
    { key: 'sixMonths', label: '6 Months' },
    { key: 'twelveMonths', label: '12 Months' },
    { key: 'twoYears', label: '2 Years' },
    { key: 'threeYears', label: '3 Years' },
    { key: 'fiveYears', label: '5 Years' }
  ];



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Surgery Records</span>
          </button>
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Biolitec Laser LHP Treatment</h1>
            </div>
            <p className="text-cyan-100">Data Collection Form - Page 1/1</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Section 1: Doctor Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <User className="w-6 h-6 text-cyan-600" />
              <span>Doctor Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange('doctorName', e.target.value)}
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
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Surgery
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Patient Information */}
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
                  onChange={(e) => handleInputChange('patientInitials', e.target.value)}
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
                  onChange={(e) => handleInputChange('patientAge', e.target.value)}
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
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Clinical Presentation - Need for Surgery */}
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
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-r">
                      Never
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-r">
                      Less than once a month
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-r">
                      Less than once a week
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-r">
                      1-6 days per week
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                      Every day (always)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { key: 'pain', label: 'PAIN' },
                    { key: 'itching', label: 'ITCHING' },
                    { key: 'bleeding', label: 'BLEEDING' },
                    { key: 'soiling', label: 'SOILING' },
                    { key: 'prolapsing', label: 'PROLAPSING' }
                  ].map((symptom) => (
                    <tr key={symptom.key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r">
                        {symptom.label}
                      </td>
                      <td className="px-4 py-3 text-center border-r">
                        <input
                          type="radio"
                          name={symptom.key}
                          value="never"
                          checked={formData[symptom.key] === 'never'}
                          onChange={(e) => handleInputChange(symptom.key, e.target.value)}
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r">
                        <input
                          type="radio"
                          name={symptom.key}
                          value="less_than_once_month"
                          checked={formData[symptom.key] === 'less_than_once_month'}
                          onChange={(e) => handleInputChange(symptom.key, e.target.value)}
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r">
                        <input
                          type="radio"
                          name={symptom.key}
                          value="less_than_once_week"
                          checked={formData[symptom.key] === 'less_than_once_week'}
                          onChange={(e) => handleInputChange(symptom.key, e.target.value)}
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center border-r">
                        <input
                          type="radio"
                          name={symptom.key}
                          value="1_6_days_per_week"
                          checked={formData[symptom.key] === '1_6_days_per_week'}
                          onChange={(e) => handleInputChange(symptom.key, e.target.value)}
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="radio"
                          name={symptom.key}
                          value="every_day"
                          checked={formData[symptom.key] === 'every_day'}
                          onChange={(e) => handleInputChange(symptom.key, e.target.value)}
                          className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Section 3: VAS Score */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-cyan-600" />
              <span>VAS Score (Pain Assessment)</span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-6 rounded-xl border-2 border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Visual Analog Scale (0-10)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.vasScore}
                    onChange={(e) => handleInputChange('vasScore', e.target.value)}
                    className="flex-1 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #fbbf24 50%, #ef4444 100%)`
                    }}
                  />
                  <div className="w-20 text-center">
                    <span className="text-3xl font-bold text-gray-900">{formData.vasScore || 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span className="font-semibold text-green-600">0 - No Pain</span>
                <span className="font-semibold text-yellow-600">5 - Moderate</span>
                <span className="font-semibold text-red-600">10 - Worst Pain</span>
              </div>
            </div>
          </div>
          {/* Section 10: Follow-Up Schedule */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-cyan-600" />
              <span>Follow-Up </span>
            </h2>
            <div className="space-y-4">
              {followUpPeriods.map((period) => (
                <div key={period.key} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.followUp[period.key].completed}
                        onChange={(e) => handleFollowUpChange(period.key, 'completed', e.target.checked)}
                        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                      <label className="text-sm font-semibold text-gray-900">
                        {period.label} Follow-Up
                      </label>
                    </div>
                    {formData.followUp[period.key].completed && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  {formData.followUp[period.key].completed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Follow-Up Date
                        </label>
                        <input
                          type="date"
                          value={formData.followUp[period.key].date}
                          onChange={(e) => handleFollowUpChange(period.key, 'date', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          value={formData.followUp[period.key].notes}
                          onChange={(e) => handleFollowUpChange(period.key, 'notes', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          rows="2"
                          placeholder="Enter follow-up notes or observations"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* Section 4: Additional Differential Diagnostics */}
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
                  {[
                    { key: 'fissure', label: 'Fissure' },
                    { key: 'skinTags', label: 'Skin Tags' },
                    { key: 'leftoverHematoma', label: 'Leftover/Perianal Hematoma' },
                    { key: 'fistula', label: 'Fistula' },
                    { key: 'cryptitis', label: 'Cryptitis' },
                    { key: 'analRectumProlapse', label: 'Anal/Rectum Prolapse' },
                    { key: 'analStenosis', label: 'Anal Stenosis' },
                    { key: 'analEczema', label: 'Anal Eczema' },
                    { key: 'analVeinThrombosis', label: 'Anal Vein Thrombosis' }
                  ].map((item) => (
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

          {/* Section 5: Treatment Methods */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Previous Treatment Methods</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'medication', label: 'Medication' },
                { key: 'sclerosation', label: 'Sclerosation' },
                { key: 'infraredCoagulation', label: 'Infrared Coagulation' },
                { key: 'rubberBandLigation', label: 'Rubber Band Ligation' },
                { key: 'halDghal', label: 'HAL/dgHAL' },
                { key: 'surgery', label: 'Surgery' }
              ].map((method) => (
                <label key={method.key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.treatmentMethods[method.key]}
                    onChange={(e) => handleTreatmentMethodChange(method.key, e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 6: Anaesthesia & Complications */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Anaesthesia & Complications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onChange={(e) => handleInputChange('generalAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.generalAnaesthesia === 'no'}
                      onChange={(e) => handleInputChange('generalAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

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
                      onChange={(e) => handleInputChange('regionalAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.regionalAnaesthesia === 'no'}
                      onChange={(e) => handleInputChange('regionalAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

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
                      onChange={(e) => handleInputChange('localAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.localAnaesthesia === 'no'}
                      onChange={(e) => handleInputChange('localAnaesthesia', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Complications (if any)
                </label>
                <div className="flex space-x-4 mb-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="yes"
                      checked={formData.hasComplications === 'yes'}
                      onChange={(e) => handleInputChange('hasComplications', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.hasComplications === 'no'}
                      onChange={(e) => handleInputChange('hasComplications', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
                {formData.hasComplications === 'yes' && (
                  <textarea
                    value={formData.complications}
                    onChange={(e) => handleInputChange('complications', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe complications"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Previous Conservative or Semi-Surgical OP
                </label>
                <div className="flex space-x-4 mb-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="yes"
                      checked={formData.hasPreviousOp === 'yes'}
                      onChange={(e) => handleInputChange('hasPreviousOp', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="no"
                      checked={formData.hasPreviousOp === 'no'}
                      onChange={(e) => handleInputChange('hasPreviousOp', e.target.value)}
                      className="w-4 h-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
                {formData.hasPreviousOp === 'yes' && (
                  <textarea
                    value={formData.previousOperation}
                    onChange={(e) => handleInputChange('previousOperation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe previous operations"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 7: Laser Settings */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-cyan-600" />
              <span>Laser Settings</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Laser Wavelength
                </label>
                <select
                  value={formData.laserWavelength}
                  onChange={(e) => handleInputChange('laserWavelength', e.target.value)}
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
                  onChange={(e) => handleInputChange('laserPower', e.target.value)}
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
                  onChange={(e) => handleInputChange('laserPulseMode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="e.g., 3.0s"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Applied Energy (J)
                </label>
                <input
                  type="number"
                  value={formData.totalAppliedEnergy}
                  onChange={(e) => handleInputChange('totalAppliedEnergy', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter joules"
                />
              </div> */}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Medication (Aspirin, etc.)
              </label>
              <textarea
                value={formData.medication}
                onChange={(e) => handleInputChange('medication', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                rows="2"
                placeholder="Enter medication details"
              />
            </div>
          </div>


          {/* Section 8: Intra Operative Data */}
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">Select position</option>
                          <option value="1">1 o'clock</option>
                          <option value="2">2 o'clock</option>
                          <option value="3">3 o'clock</option>
                          <option value="4">4 o'clock</option>
                          <option value="5">5 o'clock</option>
                          <option value="6">6 o'clock</option>
                          <option value="7">7 o'clock</option>
                          <option value="8">8 o'clock</option>
                          <option value="9">9 o'clock</option>
                          <option value="10">10 o'clock</option>
                          <option value="11">11 o'clock</option>
                          <option value="12">12 o'clock</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Haemorrhoidal Grade
                        </label>
                        <select
                          value={item.grade}
                          onChange={(e) => handleIntraOperativeChange(index, 'grade', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                          <option value="">Select grade</option>
                          <option value="I">Grade I</option>
                          <option value="II">Grade II</option>
                          <option value="III">Grade III</option>
                          <option value="IV">Grade IV</option>
                          <option value="V">Grade V</option>
                          <option value="VI">Grade VI</option>
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

          {/* Section 9: Postoperative Medication */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Postoperative Medication</h2>
            <textarea
              value={formData.postoperativeMedication}
              onChange={(e) => handleInputChange('postoperativeMedication', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              rows="4"
              placeholder="Enter postoperative medication details and instructions..."
            />
          </div>



          {/* Action Buttons */}
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              <Save className="w-5 h-5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition font-semibold shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span>Submit Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiolitecLaserLHPForm;