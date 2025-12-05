import React from 'react';
import { useParams } from 'react-router-dom';
import BiolitecLaserLHPForm from '../components/LHPSurgeryForm/BiolitecLaserLHPForm';
// import BiolitecLaserLHPForm from '../components/BiolitecLaserLHPForm';

const FillSurgeryForm = () => {
  const { surgeryType } = useParams();


  console.log(surgeryType)
  // Render the appropriate form based on surgery type
  const renderForm = () => {
    switch(surgeryType) {
      case 'biolitec-lhp':
        return <BiolitecLaserLHPForm />;
      case 'cardiac':
        return <div className="p-6">Cardiac Surgery Form - Coming Soon</div>;
      case 'neurosurgery':
        return <div className="p-6">Neurosurgery Form - Coming Soon</div>;
      case 'orthopedic':
        return <div className="p-6">Orthopedic Surgery Form - Coming Soon</div>;
      case 'general':
        return <div className="p-6">General Surgery Form - Coming Soon</div>;
      case 'ent':
        return <div className="p-6">ENT Surgery Form - Coming Soon</div>;
      default:
        return <div className="p-6">Form not found</div>;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};

export default FillSurgeryForm;