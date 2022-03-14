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
