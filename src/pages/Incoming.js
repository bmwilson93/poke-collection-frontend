import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';

import Loading from '../components/Loading';

const Incoming = () => {
  const { user, setUser, checkingUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>Incoming</div>
  )
}

export default Incoming