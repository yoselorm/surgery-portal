import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Activity, Save, Send } from 'lucide-react';
import { createSurgery } from '../../redux/SurgerySlice';

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

const BiolitecLaserLHPForm = ({
  // Props for edit mode
  formData: externalFormData,
  setFormData: externalSetFormData,
  onSubmit: externalOnSubmit,
  loading: externalLoading,
  submitLabel = 'Submit Record',
  showDraft = true,
  disabled = false,
  showBackButton = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: reduxLoading } = useSelector((state) => state.surgeries);

  // Determine if we're in edit mode or create mode
  const isEditMode = !!externalFormData;
  const loading = isEditMode ? externalLoading : reduxLoading;

  const [badge, setBadge] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const showBadge = (type, message, timeout = 3000) => {
    setBadge({ show: true, type, message });

    setTimeout(() => {
      setBadge({ show: false, type, message: '' });
    }, timeout);
  };

  // Internal form state (only used in create mode)
  const [internalFormData, setInternalFormData] = useState({
    date: '',
    patientName: '',
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
    saddleBlock: 'no',
    pudendusBlock: 'no',
    generalAnaesthesia: 'no',
    regionalAnaesthesia: 'no',
    localAnaesthesia: 'no',
    previousOperation: '',
    hasPreviousOp: 'no',
    postoperativeMedication: '',
    intraOperativeData: [],
    symptoms: {
      pain: '',
      itching: '',
      bleeding: '',
      soiling: '',
      prolapsing: '',
    },
    vasScore: '',
    followUp: {
      twoWeeks: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      sixWeeks: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      threeMonths: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      sixMonths: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      twelveMonths: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      twoYears: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      threeYears: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      },
      fiveYears: {
        completed: false, date: '', vasScore: '', notes: '', symptoms: {
          pain: '', itching: '', bleeding: '', soiling: '', prolapsing: ''
        },
      }
    }
  });

  // Use external or internal state
  const formData = isEditMode ? externalFormData : internalFormData;
  const setFormData = isEditMode ? externalSetFormData : setInternalFormData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If in edit mode, use external submit handler
    if (isEditMode && externalOnSubmit) {
      await externalOnSubmit();
      showBadge('success', 'Surgery record updated successfully');
      return;
    }

    // Create mode logic
    const {
      patientName,
      patientAge,
      gender,
      date,
      ...clinicalFormData
    } = formData;

    const payload = {
      patientName,
      patientAge: Number(patientAge),
      gender,
      date,
      procedure: 'Biolitec Laser LHP',
      surgeryType: 'Laser Surgery',
      status: 'incomplete',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      formData: clinicalFormData,
    };

    try {
      await dispatch(createSurgery(payload)).unwrap();
      showBadge('success', 'Surgery record saved successfully');
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      showBadge('error', err?.message || 'Failed to save surgery record');
    }
  };

  const handleSaveDraft = async () => {
    try {
      const {
        patientName,
        patientAge,
        gender,
        date,
        ...clinicalFormData
      } = formData;

      await dispatch(
        createSurgery({
          patientName,
          patientAge: Number(patientAge),
          gender,
          date,
          procedure: 'Biolitec Laser LHP',
          surgeryType: 'Laser Surgery',
          status: 'incomplete',
          formData: clinicalFormData,
        })
      ).unwrap();

      showBadge('info', 'Draft saved');
    } catch (err) {
      showBadge('error', 'Failed to save draft');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const keys = name.split('.');
      let updated = { ...prev };
      let temp = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] =
        type === 'checkbox' ? checked : value;

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button - only show in create mode */}
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-cyan-600 transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Surgery Records</span>
          </button>
        )}

        <FormHeader />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          <DoctorInfoSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <PatientInfoSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <ClinicalPresentationSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <VasScoreSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <DiagnosticsSection
            formData={formData}
            setFormData={setFormData}
            disabled={disabled}
          />

          <TreatmentMethodsSection
            formData={formData}
            setFormData={setFormData}
            disabled={disabled}
          />

          <AnaesthesiaSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <LaserSettingsSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <IntraOperativeSection
            formData={formData}
            setFormData={setFormData}
            disabled={disabled}
          />

          <PostOperativeMedicationSection
            formData={formData}
            onInputChange={handleInputChange}
            disabled={disabled}
          />

          <FollowUpSection
            formData={formData}
            setFormData={setFormData}
            disabled={disabled}
          />

          {badge.show && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm font-semibold flex items-center gap-2
                ${badge.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : badge.type === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}
            >
              <Activity className="w-4 h-4" />
              {badge.message}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            {showDraft && (
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={disabled}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>Save as Draft</span>
              </button>
            )}

            <button
              type="submit"
              disabled={loading || disabled}
              onClick={handleSubmit}
              className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${!showDraft ? 'ml-auto' : ''}`}
            >
              <Send className="w-5 h-5" />
              <span>{loading ? 'Saving...' : submitLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiolitecLaserLHPForm;