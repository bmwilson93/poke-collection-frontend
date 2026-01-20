import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

import Loading from '../components/Loading';

const Incoming = () => {
  const { user, setUser, checkingUser } = useContext(UserContext);

  return (
    <div>Incoming</div>
  )
}

export default Incoming