import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BiolitecLaserLHPForm from "./BiolitecLaserLHPForm";
import { updateSurgery } from "../../redux/SurgerySlice";
import toast from "../Toast";

export const ViewEditBiolitecLaserLHP = ({ surgery, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.surgeries);
  
  const [formData, setFormData] = useState(() => ({
    date: surgery.date,
    patientName: surgery.patientName,
    patientAge: surgery.patientAge,
    gender: surgery.gender,
    ...surgery.formData,
  }));

  const handleUpdate = async () => {
    if (!isEditing) return;
    if (surgery.status === 'complete') {
      toast.error('Cannot update completed records');
      return;
    }
  
    try {
      const { patientName, patientAge, gender, date, ...clinicalFormData } = formData;
      
      await dispatch(updateSurgery({
        id: surgery._id,
        data: {
          patientName,
          patientAge: Number(patientAge),
          gender,
          date,
          status: surgery.status, // Keep the same status
          formData: clinicalFormData,
        },
      })).unwrap(); 
      
      setIsEditing(false);
      toast.success('Surgery record updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update surgery record');
    }
  };

  // Handler specifically for follow-up updates
  const handleFollowUpUpdate = async () => {
    if (surgery.status === 'complete') {
      toast.error('Cannot update completed records');
      return;
    }
    
    try {
      const { patientName, patientAge, gender, date, ...clinicalFormData } = formData;
      
      await dispatch(updateSurgery({
        id: surgery._id,
        data: {
          patientName,
          patientAge: Number(patientAge),
          gender,
          date,
          status: 'follow-ups', // Maintain follow-ups status
          formData: clinicalFormData,
        },
      })).unwrap();
      
      toast.success('Follow-up data updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update follow-up data');
      throw error; // Re-throw to let FollowUpSection handle the error
    }
  };

  // Determine disabled state based on status
  const getDisabledState = () => {
    if (surgery.status === 'complete') return true; // Nothing editable
    if (surgery.status === 'draft') return !isEditing; // Everything editable when editing
    if (surgery.status === 'follow-ups') return true; // Only follow-ups editable (handled separately)
    return !isEditing;
  };

  return (
    <BiolitecLaserLHPForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleUpdate}
      loading={loading}
      submitLabel="Update Record"
      showDraft={false}
      disabled={getDisabledState()}
      surgeryStatus={surgery.status} // Pass status to form
      showBackButton={false}
      onSaveFollowUps={handleFollowUpUpdate} // Pass follow-up save handler
    />
  );
};
