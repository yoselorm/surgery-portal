import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase,
  Edit3,
  X,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { updateDoctor } from '../redux/ProfileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const { loading, error } = useSelector((state) => state.profile);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: user?.city || '',
    specialty: user?.specialty || ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateDoctor({ 
        id: user._id, 
        data: formData 
      })).unwrap();
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditMode(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullname: user?.fullname || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      city: user?.city || '',
      specialty: user?.specialty || ''
    });
    setIsEditMode(false);
    setSuccessMessage('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-gray-600">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-cyan-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={formData.fullname}
                        onChange={(e) => handleInputChange('fullname', e.target.value)}
                        className="bg-white/20 border border-white/40 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                        placeholder="Full Name"
                      />
                    ) : (
                      user.fullname
                    )}
                  </h1>
                  <p className="text-cyan-100 mt-1">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={formData.specialty}
                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                        className="bg-white/20 border border-white/40 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
                        placeholder="Specialty"
                      />
                    ) : (
                      user.specialty || 'Specialty not set'
                    )}
                  </p>
                </div>
              </div>

              {/* Edit/Save/Cancel Buttons */}
              {!isEditMode ? (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-2 bg-white text-cyan-600 rounded-lg hover:bg-cyan-50 transition flex items-center space-x-2 font-semibold"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-white text-cyan-600 rounded-lg hover:bg-cyan-50 transition flex items-center space-x-2 font-semibold disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="px-4 py-2 bg-white/20 border border-white/40 text-white rounded-lg hover:bg-white/30 transition flex items-center space-x-2 font-semibold"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Mail className="w-5 h-5 text-cyan-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  {isEditMode ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                      placeholder="Email"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Phone className="w-5 h-5 text-cyan-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  {isEditMode ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                      placeholder="Phone"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{user.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Globe className="w-5 h-5 text-cyan-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Country</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                      placeholder="Country"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{user.country || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* City */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <MapPin className="w-5 h-5 text-cyan-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">City</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                      placeholder="City"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{user.city || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Specialty */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 md:col-span-2">
                <Briefcase className="w-5 h-5 text-cyan-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Medical Specialty</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => handleInputChange('specialty', e.target.value)}
                      className="w-full font-semibold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                      placeholder="Specialty"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{user.specialty || 'Not provided'}</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Account Status */}
          <div className="px-8 pb-8">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {user.status || 'Active'}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;