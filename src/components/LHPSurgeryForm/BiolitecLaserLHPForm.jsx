import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Activity, Save, Send } from 'lucide-react';
import { createSurgery, updateSurgery } from '../../redux/SurgerySlice';

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
import ConfirmationModal from '../ConfirmationModal';
import toast from '../Toast';

const BiolitecLaserLHPForm = ({
  formData: externalFormData,
  setFormData: externalSetFormData,
  onSubmit: externalOnSubmit,
  loading: externalLoading,
  submitLabel = 'Submit Record',
  showDraft = true,
  disabled = false,
  showBackButton = true,
  surgeryStatus = null, // New prop to track status
  onSaveFollowUps = null, // New prop for follow-up save handler
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: reduxLoading, currentSurgery } = useSelector((state) => state.surgeries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const { id } = useParams();

  const isEditMode = !!externalFormData;
  const loading = isEditMode ? externalLoading : reduxLoading;
  
  // Get current status (from prop or currentSurgery)
  const currentStatus = surgeryStatus || currentSurgery?.status;

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

  const formData = isEditMode ? externalFormData : internalFormData;
  const setFormData = isEditMode ? externalSetFormData : setInternalFormData;

  const handleSubmit = async () => {
    if (isEditMode && externalOnSubmit) {
      await externalOnSubmit();
      showBadge('success', 'Surgery record updated successfully');
      return;
    }

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
      status: 'follow-ups',
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

  const handleSaveAsDraft = async () => {
    const {
      patientName,
      patientAge,
      gender,
      date,
      ...clinicalFormData
    } = formData;
  
    const payload = {
      patientName,
      patientAge: patientAge ? Number(patientAge) : null,
      gender,
      date,
      procedure: 'Biolitec Laser LHP',
      surgeryType: 'Laser Surgery',
      status: 'draft',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      formData: clinicalFormData,
    };
  
    try {
      if (id) {
        await dispatch(updateSurgery({ id, data: payload })).unwrap();
      } else {
        await dispatch(createSurgery(payload)).unwrap();
      }
    
      toast.success('Surgery record saved as draft successfully');
      navigate(-1)
    } catch (err) {
      toast.error(
        err?.data?.message ||
        err?.message ||
        'Failed to save surgery record'
      );
    }
    
  };
  

  const handleSaveAsCompleted = async () => {
    if (currentStatus === 'complete') {
      showBadge('error', 'Already completed');
      return;
    }
    
    try {
      const {
        patientName,
        patientAge,
        gender,
        date,
        ...clinicalFormData
      } = formData;

      await dispatch(
        updateSurgery({
          id: id,
          data: {
            patientName,
            patientAge: Number(patientAge),
            gender,
            date,
            procedure: 'Biolitec Laser LHP',
            surgeryType: 'Laser Surgery',
            status: 'complete',
            formData: clinicalFormData,
          },
        })
      ).unwrap();

      showBadge('success', 'Record marked as completed');
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      showBadge('error', 'Failed to save record');
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

      temp[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
      return updated;
    });
  };

  // Determine which buttons to show based on status
  const shouldShowDraftButton = !isEditMode || currentStatus === 'draft';
  const shouldShowCompleteButton = isEditMode && (currentStatus === 'draft' || currentStatus === 'follow-ups');
  const shouldShowSubmitButton = !isEditMode || currentStatus === 'draft';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
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
          {/* Status indicator for edit mode */}
          {isEditMode && currentStatus && (
            <div className={`p-4 rounded-lg border ${
              currentStatus === 'complete' ? 'bg-red-50 border-red-200' :
              currentStatus === 'follow-ups' ? 'bg-blue-50 border-blue-200' :
              'bg-yellow-50 border-yellow-200'
            }`}>
              <p className="text-sm font-semibold">
                {currentStatus === 'complete' && '🔒 This record is completed. No edits allowed.'}
                {currentStatus === 'follow-ups' && '📅 Only follow-up section can be edited.'}
                {currentStatus === 'draft' && '✏️ Draft mode - All fields can be edited.'}
              </p>
            </div>
          )}

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

          {/* Save as Draft button - only for create mode or draft status */}
          {shouldShowDraftButton && (
            <button
              type="button"
              onClick={() => setIsDraftModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              <Save className="w-5 h-5" />
              <span>Save as Draft</span>
            </button>
          )}

          <FollowUpSection
            formData={formData}
            setFormData={setFormData}
            disabled={disabled}
            surgeryStatus={currentStatus}
            onSaveFollowUps={onSaveFollowUps}
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
            {/* Save as Completed button - only for draft or follow-ups status */}
            {shouldShowCompleteButton && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition font-semibold"
              >
                <Save className="w-5 h-5" />
                <span>Mark as Completed</span>
              </button>
            )}

            {/* Submit/Update button - only for create mode or draft status */}
            {shouldShowSubmitButton && (
              <button
                type="submit"
                onClick={() => setIsSubmitModalOpen(true)}
                className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${!shouldShowCompleteButton ? 'ml-auto' : ''}`}
              >
                <Send className="w-5 h-5" />
                <span>{loading ? 'Saving...' : submitLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveAsCompleted}
        loading={loading}
        title="Complete Surgery Record"
        message="This action will mark this record as completed and no further edits can be made. This cannot be undone."
        confirmText="Yes, Mark as Completed"
        cancelText="Cancel"
        type="warning"
      />
      <ConfirmationModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        onConfirm={handleSaveAsDraft}
        loading={loading}
        title="Save As Draft"
        message="This action will save this record as draft and can be edited afterwards."
        confirmText="Yes, Save Draft"
        cancelText="Cancel"
        type="info"
      />
      <ConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleSubmit}
        loading={loading}
        title="Submit Surgery Record"
        message="This action will save this record and only follow-ups can be edited afterwards. Ensure all data is correct."
        confirmText="Yes, Submit"
        cancelText="Cancel"
        type="warning"
      />
    </div>
  );
};

export default BiolitecLaserLHPForm;
