import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from "../utils/fetchAPI";
import './css/Account.css';

const Account = ({ user, setUser }) => {
  const navigate = useNavigate();

  // On load, check if logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetchAPI('logout', 'POST', "");
    setUser(null)
    navigate('/');
  }

  return (
    <div className='full-height'>
    {user 
      ? <div>
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>

          <div>
            <h3>Your Collection:</h3>
          </div>

          <div>
            <p onClick={handleLogout}>Log OUt</p>
          </div>
        </div>
      : <></>
    }
    
    </div>
  )
}

export default Account