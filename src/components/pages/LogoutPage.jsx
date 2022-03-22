import { useMedicalContext, logout } from '../others/store';

function LogoutPage() {
  const { dispatch } = useMedicalContext();

  return logout(dispatch);
}

export default LogoutPage;
