import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit, Save, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
// import SurgeryHeader from '../components/SurgeryDetails/SurgeryHeader';
// import SurgeryBasicInfo from '../components/SurgeryDetails/SurgeryBasicInfo';
// import LaserSurgeryDetails from '../components/SurgeryDetails/LaserSurgeryDetails';
import { generateSurgeryPDF } from '../utils/pdfGenerator';
import LaserSurgeryDetails from '../../components/LHPSections/LaserSurgeryDetails';

const SurgeryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { surgeries } = useSelector((state) => state.surgeries);
  const surgeryRecord = surgeries?.find((item) => String(item._id) === String(id));

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(surgeryRecord);

  useEffect(() => {
    if (surgeryRecord) {
      setEditedData(surgeryRecord);
    }
  }, [surgeryRecord]);

  if (!surgeryRecord) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Surgery Record Not Found</h2>
          <button
            onClick={() => navigate('/surgeries')}
            className="text-cyan-600 hover:text-cyan-700"
          >
            Return to Surgery Records
          </button>
        </div>
      </div>
    );
  }

  // Check if surgery is completed (uneditable)
  const isCompleted = surgeryRecord.status?.toLowerCase() === 'completed' || 
                      surgeryRecord.status?.toLowerCase() === 'complete';

  // Handle field updates
  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormDataChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value }
    }));
  };

  const handleNestedChange = (path, value) => {
    setEditedData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Save edited data
  const handleSave = () => {
    dispatch({
      type: 'surgeries/updateSurgery',
      payload: editedData
    });
    setIsEditMode(false);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditedData(surgeryRecord);
    setIsEditMode(false);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    generateSurgeryPDF(surgeryRecord);
  };

  // Render surgery type specific details
  const renderSurgerySpecificDetails = () => {
    const currentData = isEditMode ? editedData : surgeryRecord;
    
    if (currentData.surgeryType === 'Laser Surgery') {
      return (
        <LaserSurgeryDetails
          formData={currentData.formData}
          isEditMode={isEditMode && !isCompleted}
          onFieldChange={handleFormDataChange}
          onNestedChange={handleNestedChange}
        />
      );
    }
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Surgery Details</h2>
        <p className="text-gray-600">Additional surgery information would appear here.</p>
      </div>
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
        <SurgeryHeader
          surgeryData={currentData}
          isEditMode={isEditMode}
          isCompleted={isCompleted}
          onEdit={() => setIsEditMode(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onDownload={handleDownloadPDF}
        />

        {/* Basic Info */}
        <SurgeryBasicInfo
          surgeryData={currentData}
          isEditMode={isEditMode && !isCompleted}
          onFieldChange={handleFieldChange}
        />

        {/* Surgery Type Specific Details */}
        {renderSurgerySpecificDetails()}
      </div>
    </div>
  );
};

export default SurgeryDetailsPage;