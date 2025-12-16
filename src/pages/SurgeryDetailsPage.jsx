import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LHPSurgeryDetails from './LHPSurgeryDetails';
import { clearCurrentSurgery, fetchSurgeryById } from '../redux/SurgerySlice';

const SurgeryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentSurgery, loading } = useSelector(
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
    return <div>Loading surgery record...</div>;
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