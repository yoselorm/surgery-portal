import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LHPSurgeryDetails from './LHPSurgeryDetails';
import { clearCurrentSurgery, fetchSurgeryById } from '../redux/SurgerySlice';

const SurgeryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentSurgery, loading} = useSelector(
    (state) => state.surgeries
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSurgeryById(id));
    }

    // Cleanup function
    return () => {
      dispatch(clearCurrentSurgery());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading doctors...</p>
      </div>
    );
  }

  if (!currentSurgery) {
    return <div>No surgery record found.</div>;
  }

  // 🔑 Decide which surgery UI to render
  const renderSurgerySpecificDetails = () => {
    switch (currentSurgery.surgeryType) {
      case 'Laser Surgery':
        return <LHPSurgeryDetails currentSurgery={currentSurgery} loading={loading}/>;
      default:
        return <div>Unsupported surgery type</div>;
    }
  };

  return (
    <div className="p-6">
      {renderSurgerySpecificDetails()}
    </div>
  );
};

export default SurgeryDetailsPage;