/* eslint-disable react/prop-types */
/*
 * ========================================================
 * ========================================================
 *
 *                        Imports
 *
 * ========================================================
 * ========================================================
 */
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../others/store';

/*
 * ========================================================
 * ========================================================
 *
 *              ProtectedRoute Component
 *
 * ========================================================
 * ========================================================
 */
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const verify = authenticate();
  if (!verify) {
    console.log('<== illegal route ==>');
    return navigate('/');
  }
  console.log('<== verified route ==>');

  return children;
}
