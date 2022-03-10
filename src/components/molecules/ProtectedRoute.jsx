/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../others/store';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const verify = authenticate();
  if (!verify) {
    console.log('<== illegal route ==>');
    return navigate('/');
  }
  console.log('<== verified route ==>');

  return children;
}

export default ProtectedRoute;
