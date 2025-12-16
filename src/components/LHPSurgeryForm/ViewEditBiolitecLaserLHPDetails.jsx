import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BiolitecLaserLHPForm from "./BiolitecLaserLHPForm";
import { updateSurgery } from "../../redux/SurgerySlice";

export const ViewEditBiolitecLaserLHP = ({ surgery, isEditing }) => {
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
  
      await dispatch(updateSurgery({
        id: surgery._id,
        data: {
          patientName: formData.patientName,
          patientAge: Number(formData.patientAge),
          gender: formData.gender,
          date: formData.date,
          formData: surgery.formData,
        },
      }));
    };
  
    return (
      <BiolitecLaserLHPForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
        loading={loading}
        submitLabel="Update Record"
        showDraft={false}
        disabled={!isEditing} // 👈 key
      />
    );
  };
  