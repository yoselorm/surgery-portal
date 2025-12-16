import { useState } from 'react';
import { ViewEditBiolitecLaserLHP } from '../components/LHPSurgeryForm/ViewEditBiolitecLaserLHPDetails';
import { generateLHPSurgeryPDF } from '../utils/pdfGenerators';
import { Download, Edit2, X, Calendar, Clock, User, Hash } from 'lucide-react';

const LHPSurgeryDetails = ({ currentSurgery, loading }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (loading || !currentSurgery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading surgery record...</p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'complete':
        return {
          color: 'green',
          bgClass: 'bg-green-100',
          textClass: 'text-green-800',
          borderClass: 'border-green-300',
          label: 'Completed'
        };
      case 'in-progress':
      case 'in progress':
        return {
          color: 'blue',
          bgClass: 'bg-blue-100',
          textClass: 'text-blue-800',
          borderClass: 'border-blue-300',
          label: 'In Progress'
        };
      case 'scheduled':
        return {
          color: 'yellow',
          bgClass: 'bg-yellow-100',
          textClass: 'text-yellow-800',
          borderClass: 'border-yellow-300',
          label: 'Scheduled'
        };
      case 'incomplete':
        return {
          color: 'red',
          bgClass: 'bg-red-100',
          textClass: 'text-red-800',
          borderClass: 'border-red-300',
          label: 'Incomplete'
        };
      default:
        return {
          color: 'gray',
          bgClass: 'bg-gray-100',
          textClass: 'text-gray-800',
          borderClass: 'border-gray-300',
          label: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig(currentSurgery.status);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            {/* Left Section - Surgery Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentSurgery.procedure}
                </h1>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bgClass} ${statusConfig.textClass} ${statusConfig.borderClass}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Meta Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Record ID</p>
                    <p className="font-semibold text-cyan-600">{currentSurgery.surgeryId || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Patient</p>
                    <p className="font-semibold text-gray-900">{currentSurgery.patientName || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-500 text-xs">Surgery Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(currentSurgery.date)}</p>
                  </div>
                </div>

             
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => generateLHPSurgeryPDF(currentSurgery)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition group"
                title="Download PDF"
              >
                <Download className="w-5 h-5 text-gray-600 group-hover:text-cyan-600 transition" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-cyan-600 transition">
                  Download
                </span>
              </button>

              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                  isEditing
                    ? 'bg-red-50 text-red-600 border border-red-300 hover:bg-red-100'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm'
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-5 h-5" />
                    <span className="text-sm">Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    <span className="text-sm">Edit Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Surgery Type Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200">
            {currentSurgery.surgeryType || 'Laser Surgery'}
          </span>
        </div>

        {/* Edit Mode Indicator */}
        {isEditing && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Edit2 className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-900">
                Edit Mode Active
              </p>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Make your changes below and click "Update Record" to save.
            </p>
          </div>
        )}

        {/* Form Component */}
        <ViewEditBiolitecLaserLHP
          surgery={currentSurgery}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default LHPSurgeryDetails;