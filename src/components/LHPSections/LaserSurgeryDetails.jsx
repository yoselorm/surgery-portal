import React from 'react';
import { Activity, Calendar } from 'lucide-react';
import VASScoreSection from './sections/VASScoreSection';
import LaserSettingsSection from './sections/LaserSettingsSection';
import DiagnosticsSection from './sections/DiagnosticsSection';
import AnaesthesiaSection from './sections/AnaesthesiaSection';
import IntraOperativeSection from './sections/IntraOperativeSection';
import ClinicalPresentationSection from './sections/ClinicalPresentationSection';
import PostoperativeMedicationSection from './sections/PostoperativeMedicationSection';
import FollowUpSection from './sections/FollowUpSection';

const LaserSurgeryDetails = ({ formData, isEditMode, onFieldChange, onNestedChange }) => {
  const handleIntraOpChange = (index, field, value) => {
    const newData = [...formData.intraOperativeData];
    newData[index] = { ...newData[index], [field]: value };
    onFieldChange('intraOperativeData', newData);
  };

  const handleDiagnosticChange = (diagnostic, field, value) => {
    onNestedChange(`formData.diagnostics.${diagnostic}.${field}`, value);
  };

  const handleFollowUpChange = (period, field, value) => {
    onNestedChange(`formData.followUp.${period}.${field}`, value);
  };

  const handleSymptomChange = (field, value) => {
    onNestedChange(`formData.symptoms.${field}`, value);
  };

  return (
    <div className="space-y-6">
      {/* VAS Score */}
      <VASScoreSection
        vasScore={formData.vasScore}
        isEditMode={isEditMode}
        onChange={(value) => onFieldChange('vasScore', value)}
      />

      {/* Laser Settings */}
      <LaserSettingsSection
        formData={formData}
        isEditMode={isEditMode}
        onChange={onFieldChange}
      />

      {/* Diagnostics */}
      <DiagnosticsSection
        diagnostics={formData.diagnostics}
        isEditMode={isEditMode}
        onChange={handleDiagnosticChange}
      />

      {/* Anaesthesia */}
      <AnaesthesiaSection
        formData={formData}
        isEditMode={isEditMode}
        onChange={onFieldChange}
      />

      {/* Intra Operative Data */}
      <IntraOperativeSection
        intraOperativeData={formData.intraOperativeData}
        isEditMode={isEditMode}
        onChange={handleIntraOpChange}
      />

      {/* Clinical Presentation */}
      <ClinicalPresentationSection
        symptoms={formData.symptoms}
        isEditMode={isEditMode}
        onChange={handleSymptomChange}
      />

      {/* Postoperative Medication */}
      <PostoperativeMedicationSection
        medication={formData.postoperativeMedication}
        isEditMode={isEditMode}
        onChange={(value) => onFieldChange('postoperativeMedication', value)}
      />

      {/* Follow-Up Schedule */}
      <FollowUpSection
        followUp={formData.followUp}
        isEditMode={isEditMode}
        onChange={handleFollowUpChange}
      />
    </div>
  );
};

export default LaserSurgeryDetails;