/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../others/store';

function ProtectedRoute({ children }) {
  // const { dispatch } = useMedicalContext();
  const navigate = useNavigate();
  authenticate().then(
    (res) => {
      console.log('<== verified route ==>', res);
    },
  ).catch((err) => {
    console.log('<== illegal route ==>', err);
    return navigate('/auth');
  });

  return children;
}

export default ProtectedRoute;
