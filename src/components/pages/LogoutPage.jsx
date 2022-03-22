import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedicalContext, logout } from '../others/store';

function LogoutPage() {
  const navigate = useNavigate();
  const { dispatch } = useMedicalContext();
  logout(dispatch);
  navigate('/');
  return (
    <div />
  );
}

export default LogoutPage;
