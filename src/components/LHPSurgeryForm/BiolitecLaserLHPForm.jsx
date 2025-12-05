import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft, Activity, Save, Send } from 'lucide-react';
import { addSurgery } from '../../redux/SurgerySlice';

import FormHeader from './FormHeader';
import DoctorInfoSection from './DoctorInfoSection';
import PatientInfoSection from './PatientInfoSection';
import ClinicalPresentationSection from './ClinicalPresentationSection';
import VasScoreSection from './VasScoreSection';
import FollowUpSection from './FollowUpSection';
import DiagnosticsSection from './DiagnosticsSection';
import TreatmentMethodsSection from './TreatmentMethodsSection';
import AnaesthesiaSection from './AnaesthesiaSection';
import LaserSettingsSection from './LaserSettingsSection';
import IntraOperativeSection from './IntraOperativeSection';
import PostOperativeMedicationSection from './PostOperativeMedicationSection';

const BiolitecLaserLHPForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // doctorName: '',
    // location: '',
    // city: '',
    date: '',
    patientInitials: '',
    patientAge: '',
    gender: '',
    laserWavelength: '1470nm',
    laserPower: '8W',
    laserPulseMode: '3.0s',
    medication: '',
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
    treatmentMethods: {
      medication: false,
      sclerosation: false,
      infraredCoagulation: false,
      rubberBandLigation: false,
      halDghal: false,
      surgery: false,
      longo: false,
      radioFrequencyAblation: false
    },
    spinalAnaesthesia: 'no',
    saddleBlock:'no',
    pudendusBlock:'no',
    generalAnaesthesia: 'no',
    regionalAnaesthesia: 'no',
    localAnaesthesia: 'no',
    previousOperation: '',
    hasPreviousOp: 'no',
    postoperativeMedication: '',
    intraOperativeData: [],
    pain: '',
    itching: '',
    bleeding: '',
    soiling: '',
    prolapsing: '',
    vasScore: '',
    followUp: {
      twoWeeks: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      sixWeeks: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      threeMonths: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      sixMonths: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      twelveMonths: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      twoYears: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      threeYears: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, },
      fiveYears: { completed: false, date: '', vasScore: '', notes: '',symptoms: {
        pain: '',
        itching: '',
        bleeding: '',
        soiling: '',
        prolapsing: ''
      }, }
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Surgery Records</span>
        </button>

        <FormHeader />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          <DoctorInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <PatientInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <ClinicalPresentationSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <VasScoreSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <DiagnosticsSection
            formData={formData}
            setFormData={setFormData}
          />

          <TreatmentMethodsSection
            formData={formData}
            setFormData={setFormData}
          />

          <AnaesthesiaSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <LaserSettingsSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <IntraOperativeSection
            formData={formData}
            setFormData={setFormData}
          />

          <PostOperativeMedicationSection
            formData={formData}
            onInputChange={handleInputChange}
          />
          <FollowUpSection
            formData={formData}
            setFormData={setFormData}
          />

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