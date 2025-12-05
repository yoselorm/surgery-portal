import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText,
  Activity,
  Download,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';

const SurgeryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const records = useSelector((state) => state.surgeries.list);
  const surgeryRecord = records.find((item) => String(item.id) === String(id));

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(surgeryRecord);

  // Handle field updates
  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormDataChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  };

  const handleIntraOpDataChange = (index, field, value) => {
    setEditedData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        intraOperativeData: prev.formData.intraOperativeData.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleDiagnosticChange = (diagnostic, field, value) => {
    setEditedData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        diagnostics: {
          ...prev.formData.diagnostics,
          [diagnostic]: {
            ...prev.formData.diagnostics[diagnostic],
            [field]: value
          }
        }
      }
    }));
  };
  const handleFollowUpChange = (period, field, value) => {
    setEditedData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        followUp: {
          ...prev.formData.followUp,
          [period]: {
            ...prev.formData.followUp[period],
            [field]: value
          }
        }
      }
    }));
  };

  // Save edited data
  const handleSave = () => {
    // Dispatch action to update surgery record in Redux
    dispatch({
      type: 'UPDATE_SURGERY',
      payload: editedData
    });
    setIsEditMode(false);
    alert('Surgery record updated successfully!');
  };

  // Cancel edit
  const handleCancel = () => {
    setEditedData(surgeryRecord);
    setIsEditMode(false);
  };

  // Download PDF Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 20;

    // Helper function to add text with auto-wrap
    const addText = (text, x, y, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.5) + 5;
    };

    // Helper to check page break
    const checkPageBreak = (requiredSpace = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Add section header
    const addSectionHeader = (title) => {
      checkPageBreak(20);
      doc.setFillColor(6, 182, 212);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(title, margin + 5, yPosition + 7);
      doc.setTextColor(0, 0, 0);
      yPosition += 15;
    };

    // Title Header
    doc.setFillColor(6, 182, 212);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('SURGERY RECORD', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(surgeryRecord.procedure, pageWidth / 2, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Record ID: ${surgeryRecord.id}`, pageWidth / 2, 33, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    yPosition = 50;

    // Basic Information
    addSectionHeader('PATIENT & SURGERY INFORMATION');
    yPosition = addText(`Patient Name: ${surgeryRecord.patientName}`, margin, yPosition, 10, true);
    yPosition = addText(`Age: ${surgeryRecord.patientAge} years  |  Gender: ${surgeryRecord.gender}`, margin, yPosition);
    yPosition = addText(`Surgery Type: ${surgeryRecord.type}`, margin, yPosition, 10, true);
    yPosition = addText(`Procedure: ${surgeryRecord.procedure}`, margin, yPosition);
    yPosition = addText(`Surgeon: ${surgeryRecord.doctor}`, margin, yPosition, 10, true);
    yPosition = addText(`Date: ${surgeryRecord.date}  |  Time: ${surgeryRecord.time}`, margin, yPosition);
    yPosition = addText(`Duration: ${surgeryRecord.duration}  |  Status: ${surgeryRecord.status}`, margin, yPosition);
    yPosition += 5;

    if (surgeryRecord.formData.vasScore !== undefined) {
      addSectionHeader('VAS SCORE (PAIN ASSESSMENT)');
      yPosition = addText(`Visual Analog Scale: ${surgeryRecord.formData.vasScore}/10`, margin, yPosition, 10, true);
      let painLevel = 'No Pain';
      if (surgeryRecord.formData.vasScore >= 7) painLevel = 'Severe Pain';
      else if (surgeryRecord.formData.vasScore >= 4) painLevel = 'Moderate Pain';
      else if (surgeryRecord.formData.vasScore >= 1) painLevel = 'Mild Pain';
      yPosition = addText(`Pain Level: ${painLevel}`, margin, yPosition);
      yPosition += 5;
    }

    // Follow-Up Schedule
    if (surgeryRecord.formData.followUp) {
      addSectionHeader('FOLLOW-UP SCHEDULE');
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

      followUpPeriods.forEach(period => {
        const followUp = surgeryRecord.formData.followUp[period.key];
        if (followUp && followUp.completed) {
          checkPageBreak();
          yPosition = addText(`${period.label} Follow-Up:`, margin, yPosition, 10, true);
          yPosition = addText(`  Date: ${followUp.date || 'Not recorded'}`, margin, yPosition);
          if (followUp.notes) {
            yPosition = addText(`  Notes: ${followUp.notes}`, margin, yPosition);
          }
          yPosition += 3;
        }
      });

      const completedCount = followUpPeriods.filter(p =>
        surgeryRecord.formData.followUp[p.key]?.completed
      ).length;
      yPosition = addText(`Follow-Up Progress: ${completedCount}/${followUpPeriods.length} completed`, margin, yPosition, 10, true);
    }
    // Laser Settings (if Laser Surgery)
    if (surgeryRecord.type === 'Laser Surgery') {
      addSectionHeader('LASER SETTINGS');
      yPosition = addText(`Wavelength: ${surgeryRecord.formData.laserWavelength}`, margin, yPosition);
      yPosition = addText(`Power: ${surgeryRecord.formData.laserPower}`, margin, yPosition);
      yPosition = addText(`Pulse Mode: ${surgeryRecord.formData.laserPulseMode}`, margin, yPosition);
      yPosition = addText(`Total Applied Energy: ${surgeryRecord.formData.totalAppliedEnergy} J`, margin, yPosition, 10, true);
      yPosition = addText(`Pre-op Medication: ${surgeryRecord.formData.medication}`, margin, yPosition);
      yPosition += 5;

      // Diagnostics
      addSectionHeader('DIFFERENTIAL DIAGNOSTICS');
      Object.entries(surgeryRecord.formData.diagnostics).forEach(([key, value]) => {
        if (value.observed || value.treated) {
          const diagName = key.replace(/([A-Z])/g, ' $1').trim();
          const status = `${value.observed ? 'Observed' : 'Not Observed'} | ${value.treated ? 'Treated' : 'Not Treated'}`;
          yPosition = addText(`${diagName}: ${status}`, margin, yPosition);
        }
      });
      yPosition += 5;

      // Anaesthesia
      addSectionHeader('ANAESTHESIA DETAILS');
      yPosition = addText(`General: ${surgeryRecord.formData.generalAnaesthesia}`, margin, yPosition);
      yPosition = addText(`Regional: ${surgeryRecord.formData.regionalAnaesthesia}`, margin, yPosition);
      yPosition = addText(`Local: ${surgeryRecord.formData.localAnaesthesia}`, margin, yPosition);
      yPosition += 5;

      // Intra Operative Data
      addSectionHeader('INTRA OPERATIVE DATA');
      surgeryRecord.formData.intraOperativeData.forEach((item, index) => {
        checkPageBreak();
        yPosition = addText(`Position ${item.position} o'clock - Grade ${item.grade} - Energy: ${item.energy} J`, margin, yPosition);
      });
      const totalEnergy = surgeryRecord.formData.intraOperativeData.reduce((sum, item) => sum + parseFloat(item.energy), 0);
      yPosition = addText(`Total Energy Applied: ${totalEnergy} J`, margin, yPosition, 10, true);
      yPosition += 5;

      // Clinical Presentation
      addSectionHeader('CLINICAL PRESENTATION');
      const formatSymptom = (val) => {
        const mapping = {
          'never': 'Never',
          'less_than_once_month': 'Less than once a month',
          'less_than_once_week': 'Less than once a week',
          '1_6_days_per_week': '1-6 days per week',
          'every_day': 'Every day'
        };
        return mapping[val] || 'Not recorded';
      };
      yPosition = addText(`Pain: ${formatSymptom(surgeryRecord.formData.pain)}`, margin, yPosition);
      yPosition = addText(`Itching: ${formatSymptom(surgeryRecord.formData.itching)}`, margin, yPosition);
      yPosition = addText(`Bleeding: ${formatSymptom(surgeryRecord.formData.bleeding)}`, margin, yPosition);
      yPosition = addText(`Soiling: ${formatSymptom(surgeryRecord.formData.soiling)}`, margin, yPosition);
      yPosition = addText(`Prolapsing: ${formatSymptom(surgeryRecord.formData.prolapsing)}`, margin, yPosition);
      yPosition += 5;

      // Postoperative Medication
      addSectionHeader('POSTOPERATIVE MEDICATION');
      yPosition = addText(surgeryRecord.formData.postoperativeMedication, margin, yPosition);
      yPosition += 5;

      // Complications
      if (surgeryRecord.formData.hasComplications === 'yes') {
        addSectionHeader('COMPLICATIONS');
        yPosition = addText(surgeryRecord.formData.complications || 'None recorded', margin, yPosition);
      }
    }

    // Footer
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on: ${timestamp}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save PDF
    doc.save(`Surgery_Record_${surgeryRecord.id}_${surgeryRecord.patientName.replace(/\s+/g, '_')}.pdf`);
  };

  // Render fields based on surgery type
  const renderSurgerySpecificDetails = () => {
    const { type, formData } = isEditMode ? editedData : surgeryRecord;

    if (type === 'Laser Surgery') {
      return <LaserSurgeryDetails
        formData={formData}
        isEditMode={isEditMode}
        onFieldChange={handleFormDataChange}
        onIntraOpChange={handleIntraOpDataChange}
        onDiagnosticChange={handleDiagnosticChange}
        onFollowUpChange={handleFollowUpChange}

      />;
    } else if (type === 'Cardiac Surgery') {
      return <CardiacSurgeryDetails formData={formData} />;
    } else if (type === 'Orthopedic Surgery') {
      return <OrthopedicSurgeryDetails formData={formData} />;
    } else {
      return <GenericSurgeryDetails formData={formData} />;
    }
  };

  const getStatusBadge = (status, color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200'
    };

    return (
      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${colors[color]}`}>
        {status}
      </span>
    );
  };

  const currentData = isEditMode ? editedData : surgeryRecord;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Surgery Records</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{currentData.procedure}</h1>
                {getStatusBadge(currentData.status, currentData.statusColor)}
              </div>
              <p className="text-gray-600">Record ID: <span className="font-semibold text-cyan-600">{currentData.id}</span></p>
            </div>

            <div className="flex space-x-2">
              {!isEditMode ? (
                <>
                  <button
                    onClick={handleDownloadPDF}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="p-3 border border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  {/* <button 
                    className="p-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition" 
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button> */}
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center space-x-2"
                    title="Save"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    title="Cancel"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <User className="w-10 h-10 text-cyan-600 p-2 bg-cyan-50 rounded-lg" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Patient</p>
                {isEditMode ? (
                  <input
                    type="text"
                    value={currentData.patientName}
                    onChange={(e) => handleFieldChange('patientName', e.target.value)}
                    className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <>
                    <p className="font-semibold text-gray-900">{currentData.patientName}</p>
                    <p className="text-xs text-gray-500">{currentData.patientAge} years, {currentData.gender}</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileText className="w-10 h-10 text-blue-600 p-2 bg-blue-50 rounded-lg" />
              <div>
                <p className="text-sm text-gray-500">Surgery Type</p>
                <p className="font-semibold text-gray-900">{currentData.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-10 h-10 text-green-600 p-2 bg-green-50 rounded-lg" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                {isEditMode ? (
                  <input
                    type="date"
                    value={currentData.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                    className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <>
                    <p className="font-semibold text-gray-900">{currentData.date}</p>
                    <p className="text-xs text-gray-500">{currentData.time}</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-10 h-10 text-amber-600 p-2 bg-amber-50 rounded-lg" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">{currentData.duration}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-cyan-600" />
              <div>
                <p className="text-sm text-gray-500">Surgeon</p>
                <p className="font-semibold text-gray-900">{currentData.doctor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Surgery-Specific Details */}
        {renderSurgerySpecificDetails()}

      </div>
    </div>
  );
};

// ============================================
// Surgery Type Specific Components
// ============================================

// Laser Surgery Details Component
const LaserSurgeryDetails = ({ formData, isEditMode, onFieldChange, onIntraOpChange, onDiagnosticChange, onFollowUpChange
}) => {
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
    <div className="space-y-6">
      {/* VAS Score Section - Add after Laser Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-cyan-600" />
          <span>VAS Score (Pain Assessment)</span>
        </h2>
        <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 p-6 rounded-xl border-2 border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Visual Analog Scale (0-10)
            </label>
            {isEditMode ? (
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.vasScore || 0}
                  onChange={(e) => onFieldChange('vasScore', e.target.value)}
                  className="flex-1 h-3 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.vasScore || 0}
                  onChange={(e) => onFieldChange('vasScore', e.target.value)}
                  className="w-20 text-center text-2xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg px-2 py-1"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-cyan-600 rounded-full shadow-lg"
                    style={{ left: `${(formData.vasScore || 0) * 10}%`, transform: 'translate(-50%, -50%)' }}
                  ></div>
                </div>
                <div className="w-20 text-center">
                  <span className="text-3xl font-bold text-gray-900">{formData.vasScore || 0}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span className="font-semibold text-green-600">0 - No Pain</span>
            <span className="font-semibold text-yellow-600">5 - Moderate</span>
            <span className="font-semibold text-red-600">10 - Worst Pain</span>
          </div>
        </div>
      </div>

      {/* ... existing sections (Laser Settings, Diagnostics, etc.) ... */}

      {/* Follow-Up Schedule Section - Add at the end */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-cyan-600" />
          <span>Follow-Up Schedule</span>
        </h2>
        <div className="space-y-4">
          {followUpPeriods.map((period) => {
            const followUpData = formData?.followUp?.[period.key] || { completed: false, date: '', notes: '' };

            return (
              <div
                key={period.key}
                className={`p-5 rounded-lg border-2 transition ${followUpData.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {isEditMode ? (
                      <input
                        type="checkbox"
                        checked={followUpData.completed}
                        onChange={(e) => onFollowUpChange(period.key, 'completed', e.target.checked)}
                        className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                      />
                    ) : (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${followUpData.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                        {followUpData.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                    <label className="text-lg font-semibold text-gray-900">
                      {period.label} Follow-Up
                    </label>
                  </div>
                  {followUpData.completed && !isEditMode && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                </div>

                {followUpData.completed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Follow-Up Date
                      </label>
                      {isEditMode ? (
                        <input
                          type="date"
                          value={followUpData.date || ''}
                          onChange={(e) => onFollowUpChange(period.key, 'date', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {followUpData.date ? new Date(followUpData.date).toLocaleDateString() : 'Not set'}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Notes
                      </label>
                      {isEditMode ? (
                        <textarea
                          value={followUpData.notes || ''}
                          onChange={(e) => onFollowUpChange(period.key, 'notes', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                          rows="2"
                          placeholder="Enter follow-up notes or observations"
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed">
                          {followUpData.notes || 'No notes recorded'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Follow-Up Summary */}
        <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Follow-Up Progress:</span>
            <span className="text-lg font-bold text-cyan-600">
              {followUpPeriods.filter(p => formData.followUp?.[p.key]?.completed).length} / {followUpPeriods.length} Completed
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(followUpPeriods.filter(p => formData.followUp?.[p.key]?.completed).length / followUpPeriods.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>


      {/* Laser Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-cyan-600" />
          <span>Laser Settings</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EditableDetailItem
            label="Laser Wavelength"
            value={formData.laserWavelength}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('laserWavelength', val)}
          />
          <EditableDetailItem
            label="Laser Power"
            value={formData.laserPower}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('laserPower', val)}
          />
          <EditableDetailItem
            label="Pulse Mode"
            value={formData.laserPulseMode}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('laserPulseMode', val)}
          />
          <EditableDetailItem
            label="Total Energy Applied"
            value={`${formData.totalAppliedEnergy}`}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('totalAppliedEnergy', val.replace(' J', ''))}
            suffix=" J"
          />
        </div>
        <div className="mt-6">
          <EditableDetailItem
            label="Medication"
            value={formData.medication}
            fullWidth
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('medication', val)}
            textarea
          />
        </div>
      </div>

      {/* Diagnostics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Differential Diagnostics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData.diagnostics).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 capitalize mb-3">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              {isEditMode ? (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value.observed}
                      onChange={(e) => onDiagnosticChange(key, 'observed', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Observed</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value.treated}
                      onChange={(e) => onDiagnosticChange(key, 'treated', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Treated</span>
                  </label>
                </div>
              ) : (
                <div className="flex space-x-4 text-sm">
                  <span className={value.observed ? 'text-green-600' : 'text-gray-400'}>
                    {value.observed ? '✓ Observed' : '✗ Not Observed'}
                  </span>
                  <span className={value.treated ? 'text-blue-600' : 'text-gray-400'}>
                    {value.treated ? '✓ Treated' : '✗ Not Treated'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>



      {/* Anaesthesia */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Anaesthesia Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditableAnaesthesiaItem
            label="General"
            value={formData.generalAnaesthesia}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('generalAnaesthesia', val)}
          />
          <EditableAnaesthesiaItem
            label="Regional"
            value={formData.regionalAnaesthesia}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('regionalAnaesthesia', val)}
          />
          <EditableAnaesthesiaItem
            label="Local"
            value={formData.localAnaesthesia}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('localAnaesthesia', val)}
          />
        </div>
      </div>

      {/* Intra Operative Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Intra Operative Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Position (Clock)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Energy (J)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {formData.intraOperativeData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.position}
                        onChange={(e) => onIntraOpChange(index, 'position', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-20"
                      />
                    ) : (
                      `${item.position} o'clock`
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.grade}
                        onChange={(e) => onIntraOpChange(index, 'grade', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-20"
                      />
                    ) : (
                      `Grade ${item.grade}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-cyan-600">
                    {isEditMode ? (
                      <input
                        type="number"
                        value={item.energy}
                        onChange={(e) => onIntraOpChange(index, 'energy', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                      />
                    ) : (
                      `${item.energy} J`
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-cyan-50 font-semibold">
                <td className="px-4 py-3 text-sm text-gray-900" colSpan="2">Total Energy Applied</td>
                <td className="px-4 py-3 text-sm text-cyan-700">
                  {formData.intraOperativeData.reduce((sum, item) => sum + parseFloat(item.energy), 0)} J
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Presentation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Clinical Presentation - Need for Surgery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EditableSymptomItem
            label="Pain"
            value={formData.pain}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('pain', val)}
          />
          <EditableSymptomItem
            label="Itching"
            value={formData.itching}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('itching', val)}
          />
          <EditableSymptomItem
            label="Bleeding"
            value={formData.bleeding}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('bleeding', val)}
          />
          <EditableSymptomItem
            label="Soiling"
            value={formData.soiling}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('soiling', val)}
          />
          <EditableSymptomItem
            label="Prolapsing"
            value={formData.prolapsing}
            isEditMode={isEditMode}
            onChange={(val) => onFieldChange('prolapsing', val)}
          />
        </div>
      </div>

      {/* Postoperative Medication */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Postoperative Medication</h2>
        {isEditMode ? (
          <textarea
            value={formData.postoperativeMedication}
            onChange={(e) => onFieldChange('postoperativeMedication', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 leading-relaxed"
            rows="4"
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{formData.postoperativeMedication}</p>
        )}
      </div>

    </div>
  );
};

// Cardiac Surgery Details Component (Example)
const CardiacSurgeryDetails = ({ formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Cardiac Surgery Details</h2>
      <p className="text-gray-600">Cardiac-specific fields would go here...</p>
    </div>
  );
};

// Orthopedic Surgery Details Component (Example)
const OrthopedicSurgeryDetails = ({ formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Orthopedic Surgery Details</h2>
      <p className="text-gray-600">Orthopedic-specific fields would go here...</p>
    </div>
  );
};

// Generic Surgery Details (Fallback)
const GenericSurgeryDetails = ({ formData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Surgery Details</h2>
      <p className="text-gray-600">General surgery information...</p>
    </div>
  );
};

// ============================================
// Editable Helper Components
// ============================================

const EditableDetailItem = ({ label, value, fullWidth, isEditMode, onChange, textarea, suffix = '' }) => (
  <div className={fullWidth ? 'col-span-full' : ''}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    {isEditMode ? (
      textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
          rows="2"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
        />
      )
    ) : (
      <p className="font-semibold text-gray-900">{value || 'N/A'}{suffix}</p>
    )}
  </div>
);

const EditableAnaesthesiaItem = ({ label, value, isEditMode, onChange }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className={`w-3 h-3 rounded-full ${value === 'yes' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label} Anaesthesia</p>
      {isEditMode ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full mt-1"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      ) : (
        <p className="font-semibold text-gray-900">{value === 'yes' ? 'Yes' : 'No'}</p>
      )}
    </div>
  </div>
);

const EditableSymptomItem = ({ label, value, isEditMode, onChange }) => {
  const formatValue = (val) => {
    const mapping = {
      'never': 'Never',
      'less_than_once_month': 'Less than once a month',
      'less_than_once_week': 'Less than once a week',
      '1_6_days_per_week': '1-6 days per week',
      'every_day': 'Every day (always)'
    };
    return mapping[val] || 'Not recorded';
  };

  const getColor = (val) => {
    if (val === 'never') return 'text-green-600 bg-green-50';
    if (val === 'every_day') return 'text-red-600 bg-red-50';
    return 'text-amber-600 bg-amber-50';
  };

  return (
    <div className={`p-4 rounded-lg border ${getColor(value)}`}>
      <p className="text-sm font-semibold mb-1">{label}</p>
      {isEditMode ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1 w-full mt-1 bg-white"
        >
          <option value="never">Never</option>
          <option value="less_than_once_month">Less than once a month</option>
          <option value="less_than_once_week">Less than once a week</option>
          <option value="1_6_days_per_week">1-6 days per week</option>
          <option value="every_day">Every day (always)</option>
        </select>
      ) : (
        <p className="text-sm">{formatValue(value)}</p>
      )}
    </div>
  );
};




export default SurgeryDetailsPage;